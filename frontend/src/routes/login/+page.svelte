<script lang="ts">
    import Card, { Content, Actions, PrimaryAction } from "@smui/card";
    import Button, { Label } from "@smui/button";
    import Textfield from "@smui/textfield";
    import Snackbar from "@smui/snackbar";
    import { ajax, Snackbar as Snack } from "../../lib";
    
    let email = $state("");
    let password = $state("");
    let snackbar: Snackbar | null = $state(null);
    let status = $state(200);
    let message = $state("");
    export const onLogin = async () => {
        const user_info = {
        email,
        password
      };
      const result = await ajax(
        "post",
        "http://localhost:3000/api/auth/login",
        user_info,
      );
      switch (result.status) {
        case 200:
          status = result.status;
          message = result.data.message;
          if (snackbar) {
            snackbar.open();
            window.location.href = "/login"
          }
          break;
        case 400:
        case 409:
        case 500:
          status = result.status;
          message = result.response.data.message;
          if (snackbar) {
            snackbar.open();
          }
          break;
        default:
          break;
      }
    };
    export const onSignup = async () => {
      window.location.href = "/signup"
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
  <Snack bind:snackbar bind:message bind:status />
  