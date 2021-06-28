import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import VueToast from 'vue-toast-notification';
import dateFilter from '@/filters/date';

//import '@/services/configureAxios';

import {
    AppAlert,
    AppSpinner
} from '@/components/utils';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-toast-notification/dist/theme-default.css';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use( Vuelidate );
Vue.use( VueToast );
Vue.use( Router );


// Base components (shared across the app)
Vue.component( 'AppAlert', AppAlert );
Vue.component( 'AppSpinner', AppSpinner );

Vue.filter( 'date', dateFilter );