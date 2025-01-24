import axios, { } from "axios";
import { snackbar, status, msg } from "../../stores";
import { get } from "svelte/store";

const ajax = async (method: string, url: string, data?: any, token?: string | null, responseType?: any) => {
    try {
        const result: any = await axios.request({
            method,
            url: `https://localhost:8080/api${url}`,
            data,
            headers: {
                authorization: token
            },
            responseType
        })
        const snackbar_com: any = get(snackbar);
        switch (result.status) {
            case 200:
                if (snackbar_com && result.data.msg) {
                    status.set(result.status);
                    msg.set(result.data.msg);
                    snackbar_com.open();
                }
                break;
            case 400:
            case 401:
            case 409:
            case 500:
                if (snackbar_com && result.response.data.msg) {
                    status.set(result.status);
                    msg.set(result.response.data.msg);
                    snackbar_com.open();
                }
                break;
            default:
                break;
        }
        return result
    } catch (error) {
        return error
    }
}

export {
    ajax
}