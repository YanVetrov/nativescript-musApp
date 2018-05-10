import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import description from '../components/description';
import HelloWorld from '../components/HelloWorld';

const router = new VueRouter({
    pageRouting: true,
    routes: [{
            path: '/home',
            component: Home,
            meta: {
                title: 'Home',
            },
        },
        {
            path: '/:genre/:id',
            component: description,
            meta: {
                title: 'Описание',
            },
        },
        {
            path: '/hello',
            component: HelloWorld,
            meta: {
                title: 'Главная',
            },
        },
        { path: '*', redirect: '/hello' },
    ],
});

router.replace('/hello');

module.exports = router;