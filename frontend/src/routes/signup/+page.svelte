<script lang="ts">
  import Card, { Content, Actions, PrimaryAction } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import Textfield from "@smui/textfield";
  import { ajax } from "../../lib";
  import { goto } from "$app/navigation";
  import { snackbar, status, message } from "../../stores";

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
    const result = await ajax("post", "/auth/signup", user_info);
    switch (result.status) {
      case 200:
        status.set(result.status);
        message.set(result.data.message);
        if ($snackbar) {
          $snackbar.open();
          goto("/login");
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
</script>

<div class="container d-flex justify-content-center align-items-center p-5">
  <div class="card shadow-sm">
    <Card>
      <PrimaryAction class="border-bottom border-dark p-3">
        Sign Up
      </PrimaryAction>
      <Content class="p-3">
        <div class="row">
          <div class="col">
            <Textfield bind:value={first_name} label="First Name" />
          </div>
          <div class="col">
            <Textfield bind:value={last_name} label="Last Name" />
          </div>
        </div>
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
        <div class="row">
          <div class="col">
            <Textfield
              bind:value={confirm_password}
              label="Confirm password"
              type="password"
              class="w-100"
            />
          </div>
        </div>
      </Content>
      <Actions class="row p-3">
        <Button class="col" onclick={onCancel}>
          <Label>Cancel</Label>
        </Button>
        <Button class="col" onclick={onSignup}>
          <Label>Sign up</Label>
        </Button>
      </Actions>
    </Card>
  </div>
</div>
