import { createRouter, createWebHashHistory } from 'vue-router'

const FourCountry=()=>import('@/components/FourCountry.vue')
const GoodDetail=()=>import('@/components/GoodDetail.vue')
const GoodList=()=>import('@/components/GoodList.vue')
const LoginPage=()=>import('@/components/LoginPage.vue')
const MainPage=()=>import('@/components/MainPage.vue')
const RegisterPage=()=>import('@/components/RegisterPage.vue')

const CarPage=()=>import('@/components/CarPage.vue')
const OrderPage=()=>import('@/components/OrderPage.vue')
const SettleAccount=()=>import('@/components/SettleAccount.vue')

const AddGood=()=>import('@/components/AddGood.vue')
const AddCategory=()=>import('@/components/AddCategory.vue')

const AdminLogin=()=>import('@/components/AdminLogin.vue')





const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/GoodDetail',
        name: 'GoodDetail',
        component: GoodDetail,
    },
    {
        path: '/FourCountry',
        name: 'FourCountry',
        component:FourCountry,
    },
    {
        path: '/GoodList',
        name: 'GoodList',
        component: GoodList,
    },
    {
        path: '/LoginPage',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/RegisterPage',
        name: 'RegisterPage',
        component: RegisterPage,
    },
    {
        path: '/CarPage',
        name: 'CarPage',
        component: CarPage,
    },
    {
        path: '/SettleAccount',
        name: 'SettleAccount',
        component: SettleAccount,
    },
    {
        path: '/OrderPage',
        name: 'OrderPage',
        component: OrderPage,
    },

    {
        path: '/AddGood',
        name: 'AddGood',
        component: AddGood,
    },

    {
        path: '/AddCategory',
        name: 'AddCategory',
        component: AddCategory,
    },
    {
        path: '/AdminLogin',
        name: 'AdminLogin',
        component: AdminLogin,
    },

    
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.afterEach(() => {
    window.scrollTo(0, 0);
})
// const router = new VueRouter({ routes });

export default router;