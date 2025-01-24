<script lang="ts">
    import TextField from "@smui/textfield";
    import Fab, { Icon } from "@smui/fab";

    let { value, on_change } = $props();

    let is_edit = $state(false);
    let input_value = $state("");
    const on_edit = () => {
        input_value = value;
        is_edit = true;
    };
    const on_ok = () => {
        on_change(input_value);
        on_cancel();
    };
    const on_cancel = () => {
        is_edit = false;
        input_value = "";
    };
    const on_key = (e: KeyboardEvent) => {
        switch (e.key) {
            case "Enter":
                on_ok();
                break;
            case "Escape":
                on_cancel();
                break;
            default:
                break;
        }
    };
</script>

<div>
    {#if is_edit}
        <div class="sm:grid grid-cols-5">
            <TextField
                class="sm:col-span-3 h-7"
                bind:value={input_value}
                onkeydown={on_key}
                autofocus={true}
            />
            <div
                class="flex flex-row justify-center items-center sm:col-span-2 h-7"
            >
                <div class="flex flex-row justify-center items-center p-1">
                    <Fab class="w-7 h-7 bg-green-500" onclick={on_ok}>
                        <Icon class="material-icons">check</Icon>
                    </Fab>
                </div>
                <div class="flex flex-row justify-center items-center p-1">
                    <Fab class="w-7 h-7 bg-red-500" onclick={on_cancel}>
                        <Icon class="material-icons">clear</Icon>
                    </Fab>
                </div>
            </div>
        </div>
    {:else}
        <p class="text-black" ondblclick={on_edit}>
            {value}
        </p>
    {/if}
</div>
