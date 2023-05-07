<template>
  <div class="mx-auto max-w-6xl text-white bg-black">
    <div>Name: app1</div>
    <div>Framework: vue3</div>
    <div>Language: JavaScript</div>
    <div>CSS: Tailwind</div>
    <!-- <div v-if="azureAccessToken" style="color:#ccaa33">{{azureAccessToken}}</div> -->
    <div v-if="userProfile" >User Name: <span style="color:#ccaa33">{{userProfile.displayName}}</span></div>
    <div v-if="userProfile" >User email: <span style="color:#ccaa33">{{userProfile.userPrincipalName}}</span></div>
    <click-counter/>
  </div>
</template>
<script>
import ClickCounter from './ClickCounter.vue';
import {callMsGraph} from "./graph";
export default {
  mounted() {
    console.log("listening to azure token event");
    try {
      document.removeEventListener("AzureAccessTokenEvt", this.azureTokenEventHandler, true);
    } catch(e) {
      console.warn("Unable to remove listner");
    }
    document.addEventListener("AzureAccessTokenEvt", this.azureTokenEventHandler, {once: true});
    console.log("emmiting get access-token request");
    const getAccessToken = new CustomEvent("GetAzureAccessTokenEvt");
    document.dispatchEvent(getAccessToken);
  },
  methods: {
    getUserInfo() {
      if (!this.userProfile) {
        callMsGraph(this.azureAccessToken)
        .then(resp => {
          this.userProfile = resp;
        });
      }
    },
    azureTokenEventHandler(evt) {
      console.log("app1 received token", evt.detail.access_token.substring(0,10) + "...");
      this.azureAccessToken = evt.detail.access_token; // TODO: rename variable name
      this.getUserInfo();
    }
  },
  destroyed() {
    console.log("REMOVING LISTNER !!!");
    document.removeEventListener("AzureAccessTokenEvt", this.azureTokenEventHandler, true);
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
