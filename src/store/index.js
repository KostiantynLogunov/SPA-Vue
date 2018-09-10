import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import { getLocalUser} from "../helpers/auth";
import axios from "axios/index";

const user = getLocalUser();

export const store = new Vuex.Store({
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        customers: []
    },
    getters: {
        isLoading(state){
            return state.loading;
        },
        isLoggedIn(state){
            return state.isLoggedIn;
        },
        auth_error(state){
            return state.auth_error;
        },
        customers(state){
            return state.customers;
        },
        currentUser(state){
            return state.currentUser;
        }
    },
    mutations: {
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser =null;
        },
        updateCustomers(state, payload) {
            state.customers = payload;
        }
    },
    actions: {
        login(store) {
            store.commit('login');
        },
        getCustomers(store) {
            axios.get('http://vue-spa-api/api/customers', {
                headers: {
                    "Authorization": `Bearer ${ store.state.currentUser.token }`
                }
            })
                .then((response) => {
                    store.commit('updateCustomers', response.data.customers)
                })
                .catch((err) => {
                    reject("Wrong email or password");
                })
        }
    }
});