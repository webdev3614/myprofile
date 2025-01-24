import { Db, GridFSBucket, GridFSBucketWriteStream } from "mongodb";
import { Readable, Writable } from "stream";

class GridFS {
    public db: Db
    public bucketName: string
    constructor(db: Db, bucketName: string) {
        this.bucketName = bucketName
        this.db = db
    }
    write_file(file_name: string, buff: Buffer, callback: (error: Error | null | undefined) => void | boolean) {
        const bucket = new GridFSBucket(this.db, { bucketName: this.bucketName })
        const readable = Readable.from(buff);
        readable.pipe(bucket.openUploadStream(file_name)).on("finish", () => {
            callback(null)
        }).on("error", (err) => {
            callback(err)
        })
    }
    read_file(file_name: string, callback: (error: Error | null | undefined, info?: Buffer) => void | boolean) {
        let chunks: Uint8Array[] = []
        const bucket = new GridFSBucket(this.db, { bucketName: this.bucketName })
        const download_stream = bucket.openDownloadStreamByName(file_name)
        const writable = new Writable()
        writable._write = (chunk, enc, done) => {
            chunks.push(chunk)
            done()
        }
        download_stream.pipe(writable)
        download_stream.on("error", (err) => {
            callback(err)
        })
        download_stream.on("end", () => {
            callback(null, Buffer.concat(chunks))
        })
    }
}

export {
    GridFS
}