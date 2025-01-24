
import { writable } from "svelte/store";

const snackbar = writable(null);
const status = writable(200);
const msg = writable("");

export {
    snackbar,
    status,
    msg
}