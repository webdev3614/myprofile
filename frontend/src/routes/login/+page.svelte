<script lang="ts">
  import Card, { Content, Actions, PrimaryAction } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import Textfield from "@smui/textfield";
  import { ajax } from "../../libs";
  import { token } from "../../stores";
  import { goto } from "$app/navigation";
  import { text } from "../../assets";
  import { lang } from "../../stores";

  let email = $state("");
  let password = $state("");
  export const onLogin = async () => {
    const user_info = {
      email,
      password,
    };
    const result: any = await ajax("post", "/auth/login", user_info);
    if (result.status === 200) {
      token.set(result.data.token);
      localStorage.setItem("token", result.data.token);
      goto("/");
    }
  };
  export const onSignup = async () => {
    goto("/signup");
  };
</script>

<div class="flex flex-col justify-center items-center w-full h-full py-24">
  <div class="card shadow-md w-96 h-fit">
    <Card>
      <PrimaryAction class="border-bottom border-dark p-5">
        {text("log in", $lang)}
      </PrimaryAction>
      <Content class="p-3">
        <div class="w-full">
          <div class="w-full">
            <Textfield
              class="w-full"
              label={text("email", $lang)}
              type="email"
              bind:value={email}
            />
          </div>
        </div>
        <div class="w-full">
          <div class="w-full">
            <Textfield
              class="w-full"
              label={text("password", $lang)}
              type="password"
              bind:value={password}
            />
          </div>
        </div>
      </Content>
      <Actions class="flex flex-row justify-end items-center p-3">
        <Button onclick={onLogin}>
          <Label>
            {text("log in", $lang)}
          </Label>
        </Button>
        <Button onclick={onSignup}>
          <Label>
            {text("sign up", $lang)}
          </Label>
        </Button>
      </Actions>
    </Card>
  </div>
</div>
