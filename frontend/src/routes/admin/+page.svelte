<script lang="ts">
    import { onMount } from "svelte";
    import { user } from "../../stores";
    import { goto } from "$app/navigation";
    onMount(() => {
        if (!$user?.is_admin) {
            goto("/");
        }
    });
</script>

<h1>admin</h1>
