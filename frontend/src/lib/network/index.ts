import axios,{  } from "axios";

const ajax = async (method:string,url:string,data:any) => {
    try {
        const result = await axios.request({
            method,
            url,
            data
        })
        return result
    } catch (error) {
        return error
    }
}

export {
    ajax
}