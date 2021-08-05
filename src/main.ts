import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router/index";
import "./assets/css/tailwind.css";
import Db from "./db";

const app = createApp(App)
	.use(router)
	.use(Quasar, quasarUserOptions);

Db.install(app);

router.isReady().then(() => {
	app.mount("#app");
});
