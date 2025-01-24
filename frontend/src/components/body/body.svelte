<script lang="ts">
    import { Snackbar } from "../snackbar";
    import { snackbar, msg, status } from "../../stores";

    let { children } = $props();
</script>

<div class="flex flex-col justify-start items-start w-full h-full">
    {@render children()}
</div>
<Snackbar bind:snackbar={$snackbar} bind:msg={$msg} bind:status={$status} />
