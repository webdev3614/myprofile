import { writable, get } from "svelte/store";
import { ajax } from "../libs";
import { load_token } from "./token";
import { snackbar, status, msg } from "./msg";

const profile = writable({
    email: "",
    first_name: "",
    last_name: "",
    is_admin: false
})

const load_profile = () => {
    const currentToken: any = load_token()
    if (currentToken) {
        ajax('get', '/user', {}, currentToken)
            .then((result: any) => {
                if (result.status === 200) {
                    profile.set(result.data.info);
                }
            })
    }
}

export {
    profile,
    load_profile
}