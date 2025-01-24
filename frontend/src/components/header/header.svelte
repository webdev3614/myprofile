<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import { user } from "../../stores";
    import { goto } from "$app/navigation";
    import { Logo } from "./logo";
    import { lang } from "../../stores";
    import { text } from "../../assets";
</script>

<TopAppBar variant="static" color="primary">
    <Row>
        <Section>
            <IconButton
                class="material-icons"
                onclick={() => {
                    goto("/");
                }}
            >
                home
            </IconButton>
            <Title>
                {text("dream", $lang)}
            </Title>
        </Section>
        <Section align="end" toolbar>
            {#if $user && $user.email == ""}
                <IconButton
                    class="material-icons overflow-hidden"
                    aria-label="Login"
                    onclick={() => {
                        goto("/login");
                    }}
                >
                    vpn_key_rounded
                </IconButton>
                <IconButton
                    class="material-icons overflow-hidden"
                    aria-label="Signup"
                    onclick={() => {
                        goto("/signup");
                    }}
                >
                    person_add_rounded
                </IconButton>
            {:else}
                <Logo bind:user={$user} />
            {/if}
            <IconButton
                class="material-icons overflow-hidden"
                aria-label="Help"
                onclick={() => {
                    goto("/help");
                }}
            >
                help_rounded
            </IconButton>
        </Section>
    </Row>
</TopAppBar>
