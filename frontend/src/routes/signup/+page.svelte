<script lang="ts">
  import Card, { Content, Actions, PrimaryAction } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import Textfield from "@smui/textfield";
  import { ajax } from "../../libs";
  import { goto } from "$app/navigation";
  import { text } from "../../assets";
  import { lang } from "../../stores";

  let first_name = $state("");
  let last_name = $state("");
  let email = $state("");
  let password = $state("");
  let confirm_password = $state("");
  export const onCancel = async () => {
    first_name = "";
    last_name = "";
    email = "";
    password = "";
    confirm_password = "";
  };
  export const onSignup = async () => {
    const user_info = {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };
    const result: any = await ajax("post", "/auth/signup", user_info);
    if (result.status === 200) {
      goto("/login");
    }
  };
</script>

<div class="flex flex-col justify-center items-center w-full h-full p-10">
  <div class="card shadow-md">
    <Card>
      <PrimaryAction class="border-b border-gray-100 p-3">
        {text("sign up", $lang)}
      </PrimaryAction>
      <Content class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid grid-cols-3 sm:gap-4 sm:px-0">
          <div class="text-sm/6 font-medium text-gray-900">
            <Textfield
              class="w-full"
              type="text"
              bind:value={first_name}
              label={text("first name", $lang)}
            />
          </div>
          <div class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <Textfield
              class="w-full"
              type="text"
              bind:value={last_name}
              label={text("last name", $lang)}
            />
          </div>
        </div>
        <div class="px-4 py-6 sm:grid grid-cols-3 sm:gap-4 sm:px-0">
          <div class="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
            <Textfield
              class="w-full"
              label={text("email", $lang)}
              type="email"
              bind:value={email}
            />
          </div>
        </div>
        <div class="px-4 py-6 sm:grid grid-cols-3 sm:gap-4 sm:px-0">
          <div class="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
            <Textfield
              class="w-full"
              label={text("password", $lang)}
              type="password"
              bind:value={password}
            />
          </div>
        </div>
        <div class="px-4 py-6 sm:grid grid-cols-3 sm:gap-4 sm:px-0">
          <div class="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
            <Textfield
              class="w-full"
              label={text("confirm password", $lang)}
              type="password"
              bind:value={confirm_password}
            />
          </div>
        </div>
      </Content>
      <Actions class="flex flex-row justify-end items-center p-3">
        <Button class="col" onclick={onCancel}>
          <Label>
            {text("cancel", $lang)}
          </Label>
        </Button>
        <Button class="col" onclick={onSignup}>
          <Label>
            {text("sign up", $lang)}
          </Label>
        </Button>
      </Actions>
    </Card>
  </div>
</div>
