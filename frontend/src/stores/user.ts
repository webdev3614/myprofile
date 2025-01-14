import { writable, get } from "svelte/store";
import { ajax } from "../lib";
import { token } from "./token";
import { snackbar, status, message } from "./message";

const user = writable({
    email: "",
    first_name: "",
    last_name: "",
    is_admin: false
})

const load_user = () => {
    let currentToken = get(token);
    if (!currentToken) {
        currentToken = localStorage.getItem("token");
    }
    if (currentToken) {
        ajax('get', '/user', {}, currentToken)
            .then((result: any) => {
                switch (result.status) {
                    case 200:
                        user.set(result.data.message);
                        break;
                    case 401:
                    case 403:
                    case 409:
                    case 500:
                        status.set(result.status);
                        message.set(result.response.data.message);
                        if (get(snackbar)) {
                            get(snackbar).open();
                        }
                        break;
                    default:
                        break;
                }
            })
    }
}

export {
    user,
    load_user
}