<script lang="ts">
    import { onMount } from "svelte";
    import { load_user } from "../stores";

    onMount(() => {
        load_user();
    });
</script>

<h1 class="text-3xl font-bold underline">Home</h1>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
