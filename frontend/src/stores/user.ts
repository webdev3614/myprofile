import { writable, get } from "svelte/store";
import { ajax } from "../libs";
import { load_token } from "./token";
import { snackbar, status, msg } from "./msg";

const NONE_USER = {
    email: "",
    first_name: "",
    last_name: "",
    img: "",
    is_admin: false
}

const user = writable(NONE_USER)

const load_user = () => {
    const current_token = load_token()
    if (current_token) {
        ajax('get', '/user', {}, current_token)
            .then((result: any) => {
                if (result.status === 200) {
                    const user_info = result.data.info;
                    ajax(
                        "get",
                        `/user/${user_info.email}/img`,
                        null,
                        current_token,
                        "blob",
                    ).then((result: any) => {
                        if (result.status === 200) {
                            const file_reader = new FileReader()
                            file_reader.onload = (ev) => {
                                let target = ev.target;
                                if (target && target.result) {
                                    const img = target.result.toString()
                                    user.set({
                                        ...user_info,
                                        img
                                    })
                                }
                            };
                            file_reader.readAsDataURL(result.data);
                        }
                    });
                }
            })
    }
}


const del_user = () => {
    user.set(NONE_USER);
}

export {
    user,
    del_user,
    load_user
}