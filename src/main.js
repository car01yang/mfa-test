import Vue from "vue";
import App from "./App.vue";
import config from "./aws-exports";
import { Amplify } from "aws-amplify";

Vue.config.productionTip = false;

Amplify.configure({
  ...config,
  aws_cognito_identity_pool_id:
    "ap-northeast-1:bb9cf3d9-889e-48ce-89fb-821451a5ff89",
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
