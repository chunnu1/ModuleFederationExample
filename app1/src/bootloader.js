import Vue, { createApp } from "vue";

import "./index.scss";

import App from "./App.vue";

export const mount = (el) => {
    createApp(App).mount(el);
}

mount("#app");
