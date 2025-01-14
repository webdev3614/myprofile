<script lang="ts">
    import { goto } from "$app/navigation";
    import Button, { Label } from "@smui/button";
    import List, { Item, PrimaryText, SecondaryText, Text } from "@smui/list";
    import Menu from "@smui/menu";
    import { Anchor } from "@smui/menu-surface";

    let menu: Menu;
    let anchor: HTMLElement | undefined = $state();
    let anchorClasses: { [k: string]: boolean } = $state({});

    let { user = $bindable() } = $props();

    export const menu_list = () => {
        let item_list = [];
        if (user.is_admin) {
            item_list.push({
                pt: "Admin",
                st: "This is the page for site management.",
                action: () => {
                    goto("/admin");
                },
            });
        }
        item_list = item_list.concat([
            {
                pt: "My Portofolio",
                st: "This is my portofolio page.",
                action: () => {
                    goto(`/portofolio/${user.email}`);
                },
            },
            {
                pt: "My Profile",
                st: "This is my profile page.",
                action: () => {
                    goto(`/profile/${user.email}`);
                },
            },
        ]);
        return item_list;
    };
</script>

<div
    class={Object.keys(anchorClasses).join(" ")}
    use:Anchor={{
        addClass: (className) => {
            if (!anchorClasses[className]) {
                anchorClasses[className] = true;
            }
        },
        removeClass: (className) => {
            if (anchorClasses[className]) {
                delete anchorClasses[className];
            }
        },
    }}
    bind:this={anchor}
>
    <Button onclick={() => menu.setOpen(true)}>
        <Label>
            {`${user.first_name} ${user.last_name}`}
        </Label>
    </Button>
    <Menu
        bind:this={menu}
        anchor={false}
        anchorElement={anchor}
        anchorCorner="BOTTOM_LEFT"
    >
        <List twoLine>
            {#each menu_list() as item}
                <Item onSMUIAction={item.action}>
                    <Text>
                        <PrimaryText>{item.pt}</PrimaryText>
                        <SecondaryText>{item.st}</SecondaryText>
                    </Text>
                </Item>
            {/each}
        </List>
    </Menu>
</div>
