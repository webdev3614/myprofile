import { load_token, del_token, token } from "./token";
import { user, load_user, del_user } from "./user";
import { profile, load_profile } from "./profile";
import { snackbar, status, msg } from "./msg";
import { lang } from "./lang";

const logout = () => {
    del_token()
    del_user()
}

export {
    token,
    load_token,
    user,
    load_user,
    logout,
    profile,
    load_profile,
    snackbar,
    status,
    msg,
    lang
}