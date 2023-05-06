<template>
  <div class="mx-auto max-w-6xl text-white bg-black">
    <div>Name: app1</div>
    <div>Framework: vue3</div>
    <div>Language: JavaScript</div>
    <div>CSS: Tailwind</div>
    <!-- <div v-if="azureAccessToken" style="color:#ccaa33">{{azureAccessToken}}</div> -->
    <div v-if="userProfile" style="color:#ccaa33">{{userProfile.name}}</div>
    <click-counter/>
  </div>
</template>
<script>
import ClickCounter from './ClickCounter.vue';
import {callMsGraph} from "./graph";
export default {
  mounted() {
    console.log("listening to auth0 token event");
    document.addEventListener("AzureAccessTokenEvt", (evt) => {
      console.log("app1 received token", evt.detail.access_token);
      this.azureAccessToken = evt.detail.access_token; // TODO: rename variable name
      this.getUserInfo();
    });
    console.log("emmiting get access-token request");
    const getAccessToken = new CustomEvent("GetAzureAccessTokenEvt");
    document.dispatchEvent(getAccessToken);
  },
  methods: {
    getUserInfo() {
      callMsGraph(this.azureAccessToken)
      .then(resp => {
        this.userProfile = resp;
      });

    }
  },
  unmounted() {
    document.removeEventListener("AzureAccessTokenEvt");
  },
  data() {
    return {
      azureAccessToken: undefined,
      userProfile: undefined
    }
  },
  components: { ClickCounter },
  
}
</script>
