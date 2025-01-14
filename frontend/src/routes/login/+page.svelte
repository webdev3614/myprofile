<script lang="ts">
  import Card, { Content, Actions, PrimaryAction } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import Textfield from "@smui/textfield";
  import { ajax } from "../../lib";
  import { token, snackbar, status, message } from "../../stores";
  import { goto } from "$app/navigation";

  let email = $state("");
  let password = $state("");
  export const onLogin = async () => {
    const user_info = {
      email,
      password,
    };
    const result = await ajax("post", "/auth/login", user_info);
    switch (result.status) {
      case 200:
        if ($snackbar) {
          status.set(result.status);
          message.set(result.data.message);
          token.set(result.data.token);
          localStorage.setItem("token", $token);
          $snackbar.open();
          goto("/");
        }
        break;
      case 400:
      case 409:
      case 500:
        status.set(result.status);
        message.set(result.response.data.message);
        if ($snackbar) {
          $snackbar.open();
        }
        break;
      default:
        break;
    }
  };
  export const onSignup = async () => {
    goto("/signup");
  };
</script>

<div class="container d-flex justify-content-center align-items-center p-5">
  <div class="card shadow-sm" style="min-width: 300px;">
    <Card>
      <PrimaryAction class="border-bottom border-dark p-3">
        Log in
      </PrimaryAction>
      <Content class="p-3">
        <div class="row">
          <div class="col">
            <Textfield
              bind:value={email}
              label="Email"
              type="email"
              class="w-100"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <Textfield
              bind:value={password}
              label="Password"
              type="password"
              class="w-100"
            />
          </div>
        </div>
      </Content>
      <Actions class="row p-3">
        <Button class="col" onclick={onLogin}>
          <Label>Log in</Label>
        </Button>
        <Button class="col" onclick={onSignup}>
          <Label>Sign up</Label>
        </Button>
      </Actions>
    </Card>
  </div>
</div>
