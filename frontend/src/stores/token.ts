import { writable, get } from "svelte/store";

// Writable store for token management
const token = writable(null);


const load_token = (): any => {
    let currentToken: any = get(token);
    if (!currentToken) {
        currentToken = localStorage.getItem("token");
    }
    console.log(currentToken)
    return currentToken
}

const del_token = () => {
    token.set(null)
    localStorage.removeItem("token")
}

export {
    token,
    load_token,
    del_token
}