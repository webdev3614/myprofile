<script lang="ts">
    import Snackbar, { Label, Actions } from "@smui/snackbar";
    import IconButton from "@smui/icon-button";
    
    export let snackbar;
    export let message;
    export let status;
</script>

<Snackbar
    bind:this={snackbar}
    class={`demo-${
        status === 200
            ? "success"
            : status === 400 || status === 409
              ? "warning"
              : status === 500
                ? "error"
                : "default"
    }`}
>
    <Label>{message}</Label>
    <Actions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>
