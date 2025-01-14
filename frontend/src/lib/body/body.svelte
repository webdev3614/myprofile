<script lang="ts">
    import { Snackbar } from "../snackbar";
    import { snackbar, message, status } from "../../stores";

    let { children } = $props();
</script>
<div class="container-fluid">
    {@render children()}
</div>
<Snackbar
    bind:snackbar={$snackbar}
    bind:message={$message}
    bind:status={$status}
/>