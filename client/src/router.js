import Vue from 'vue'
import Router from 'vue-router'
// import Store from './store';

import Home from './views/Home'
import Login from "./views/Login";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'Home',
            title: 'Home',
            path: '/',
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            name: 'Login',
            title: 'Login',
            path: '/login',
            component: Login,
            meta: { requiresAuth: false }
        },
    ],
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (!Store.getters.getLogin) {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             })
//         } else {
//             next()
//         }
//     } else {
//         next()
//     }
// });

export default router;
