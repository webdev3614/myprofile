<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { profile, load_profile } from "../../../stores";

    let id = $page.params.id;
    onMount(() => {
        load_profile();
    });
</script>

<h1>My Profile {id}</h1>
<div class=".container">
    <div class="row">
        <div class="col"></div>
        <div class="col">
            <div class="row">
                <div class="col">Full name</div>
                <div class="col">
                    {`${$profile.first_name} ${$profile.last_name}`}
                </div>
            </div>
            <div class="row">
                <div class="col">Email</div>
                <div class="col">
                    {`${$profile.email}`}
                </div>
            </div>
        </div>
    </div>
</div>
