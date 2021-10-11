import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

import './styles/main.scss';
import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
 
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
 
// Tell Vue to install the plugin. plugin dialog box quand modif infos profile user
Vue.use(VuejsDialog);
Vue.use(VuejsDialogMixin);
new Vue({
  router,
  render: h => h(App)
}).$mount('body');
