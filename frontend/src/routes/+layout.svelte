<script lang="ts">
    import { Header } from "$lib";
    let { children } = $props();
</script>

<div style="width: 100%; overflow: hidden;">
    <Header />
</div>
<div class="container-fluid">
    {@render children()}
</div>
