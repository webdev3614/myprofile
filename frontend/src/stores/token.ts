import { writable } from "svelte/store";

// Writable store for token management
const token = writable('');

export {
    token
}