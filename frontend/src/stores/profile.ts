import { writable, get } from "svelte/store";
import { ajax } from "../lib";
import { token } from "./token";
import { snackbar, status, message } from "./message";

const profile = writable({
    email: "",
    first_name: "",
    last_name: "",
    is_admin: false
})

const load_profile = () => {
    let currentToken = get(token);
    if (!currentToken) {
        currentToken = localStorage.getItem("token");
    }
    if (currentToken) {
        ajax('get', '/user', {}, currentToken)
            .then((result: any) => {
                switch (result.status) {
                    case 200:
                        profile.set(result.data.message);
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
    profile,
    load_profile
}