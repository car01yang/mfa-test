<template>
  <div>
    <button @click="requestLogin">SignIn</button>
    <button @click="signOut">SignOut</button>
  </div>
</template>

<script>
import {
  signIn,
  confirmSignIn,
  signOut,
  updateMFAPreference,
} from "aws-amplify/auth";
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async requestLogin() {
      const output = await signIn({
        username: "jason.kc.mo3@deltaww.com",
        password: "!Qaz234z",
      });

      console.log("signIn", output);
      this.handleSignInNextSteps(output);
    },
    async signOut() {
      await signOut();
    },
    async handleSignInNextSteps(output) {
      const { nextStep } = output;
      switch (nextStep.signInStep) {
        case "CONFIRM_SIGN_IN_WITH_TOTP_CODE":
          // if isSignedIn: true -> nextStep.signInStep: "DONE"
          try {
            const { nextStep } = await confirmSignIn({
              // jason.kc.mo3 Authenticator Key = RTKZ5PSUM7V6MCXSNE7J4KIYBGJIRUVCL2OHEZUU42AFZE54R7WQ
              challengeResponse: "471984",
            });
            console.log("confirmSignIn", nextStep);

            if (nextStep.signInStep === "DONE") {
              this.handleUpdateMFAPreference();
            }
          } catch (error) {
            console.log(error);
          }
      }
    },
    async handleUpdateMFAPreference() {
      try {
        const res = await updateMFAPreference();
        console.log("MFAPreference", res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
