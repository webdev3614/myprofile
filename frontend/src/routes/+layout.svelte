<script lang="ts">
    import { Header, Body } from "../lib";

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
