<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import { profile, load_profile } from "../../../stores";
    import { InputImg, InputField } from "../../../components";
    import { text } from "../../../assets";
    import { lang, load_token, user } from "../../../stores";
    import { ajax } from "../../../libs";

    let id = $page.params.id;
    onMount(() => {
        load_profile();
    });
    const on_first_name = (val: string) => {
        $profile.first_name = val;
    };
    const on_last_name = (val: string) => {
        $profile.last_name = val;
    };
    const on_img = (file: File) => {
        let form_data = new FormData();
        form_data.append("file", file);
        const current_token = load_token();
        ajax("post", `/user/${$user.email}/img`, form_data, current_token).then(
            (result: any) => {
                if (result.status === 200) {
                    ajax(
                        "get",
                        `/user/${$user.email}/img`,
                        null,
                        current_token,
                        "blob",
                    ).then((result: any) => {
                        if (result.status === 200) {
                            const file_reader = new FileReader();
                            file_reader.onload = (ev) => {
                                let target = ev.target;
                                if (target && target.result) {
                                    $user.img = target.result.toString();
                                }
                            };
                            file_reader.readAsDataURL(result.data);
                        }
                    });
                }
            },
        );
    };
</script>

<div class="flex flex-col justify-start items-start w-full h-full">
    <div class="sm:grid grid-cols-3 sm:gap-4 sm:px-0 px-4 py-6 w-full h-fit">
        <div
            class="flex flex-row justify-center items-center p-5 max-h-80 overflow-hidden"
        >
            <InputImg src={$user.img} onchange={on_img} />
        </div>
        <div class="text-gray-500 divide-y divide-gray-500 sm:col-span-2">
            <div class="font-medium sm:grid grid-cols-3 py-2">
                <div class="w-full">
                    {text("email", $lang)}
                </div>
                <div class="sm:col-span-2">
                    {`${$profile.email}`}
                </div>
            </div>
            <div class="font-medium sm:grid grid-cols-4 py-2">
                <div>
                    {text("first name", $lang)}
                </div>
                <div>
                    <InputField
                        value={$profile.first_name}
                        on_change={on_first_name}
                    />
                </div>
                <div>
                    {text("last name", $lang)}
                </div>
                <div>
                    <InputField
                        value={$profile.last_name}
                        on_change={on_last_name}
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="h-fit w-full">
        <DataTable class="w-full">
            <Head>
                <Row>
                    <Cell>
                        {text("index", $lang)}
                    </Cell>
                    <Cell>
                        {text("name", $lang)}
                    </Cell>
                    <Cell>
                        {text("description", $lang)}
                    </Cell>
                    <Cell>
                        {text("cost", $lang)}
                    </Cell>
                    <Cell>
                        {text("recommendation", $lang)}
                    </Cell>
                    <Cell>
                        {text("objecttion", $lang)}
                    </Cell>
                </Row>
            </Head>
            <Body></Body>
        </DataTable>
    </div>
</div>
