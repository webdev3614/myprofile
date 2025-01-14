import axios,{  } from "axios";

const ajax = async ( method: string, url: string, data: any, token: string ) => {
    try {
        const result = await axios.request({
            method,
            url:`https://localhost:8080/api${url}`,
            data,
            headers:{
                authorization:token
            }
        })
        return result
    } catch (error) {
        return error
    }
}

export {
    ajax
}