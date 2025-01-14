
import { writable } from "svelte/store";

const snackbar = writable(null);
const status = writable(200);
const message = writable("");

export {
    snackbar,
    status,
    message
}