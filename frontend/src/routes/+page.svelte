<script lang="ts">
    import { onMount } from "svelte";
    import { load_user } from "../stores";

    onMount(() => {
        load_user();
    });
</script>

<h1>Home</h1>
