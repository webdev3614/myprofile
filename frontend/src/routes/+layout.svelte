<script lang="ts">
    import { Header, Body } from "../components";
    import { onMount } from "svelte";
    import { load_user } from "../stores";
    import "../app.css";

    onMount(() => {
        load_user();
    });

    let { children } = $props();
</script>

<div style="width: 100%">
    <Header />
</div>
<div class="container-fluid">
    <Body>
        {@render children()}
    </Body>
</div>
