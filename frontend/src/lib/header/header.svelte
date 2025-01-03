<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    export const onHref = (href: string) => {
        location.href = href;
    };
</script>

<TopAppBar variant="static" color="primary">
    <Row>
        <Section>
            <IconButton
                class="material-icons"
                onclick={() => {
                    onHref("/");
                }}>home</IconButton
            >
            <Title>Frank</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton
                class="material-icons"
                aria-label="Login"
                onclick={() => {
                    onHref("/login");
                }}>vpn_key_rounded</IconButton
            >
            <IconButton
                class="material-icons"
                aria-label="Signup"
                onclick={() => {
                    onHref("/signup");
                }}>person_add_rounded</IconButton
            >
            <IconButton
                class="material-icons"
                aria-label="Help"
                onclick={() => {
                    onHref("/help");
                }}>help_rounded</IconButton
            >
        </Section>
    </Row>
</TopAppBar>
