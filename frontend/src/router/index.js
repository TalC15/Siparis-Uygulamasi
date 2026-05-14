// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { tokenService } from '../utils/token';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/RegisterView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path:'/products',
    name: 'Products',
    component: () => import('../views/products/ProductsView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path:'/customers',
    name:'Customers',
    component: () => import('../views/customers/CustomersView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path:'/users',
    name: 'Users',
    component: ()=> import('../views/users/UsersView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path:'/orders',
    name: 'orders',
    component: ()=> import('../views/orders/OrdersView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation guard - auth kontrolü (ileride genişletilecek)
router.beforeEach(async(to, from) => {
     if (!to.meta.requiresAuth) return true

    const token = tokenService.getToken('token')

    if (!token) return {name:'Login'}

    try {
        const res = await fetch('http://localhost:3000/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (res.ok) {
            return true
        } else {
            tokenService.clearToken('token')
            return {name:'Login'}
        }
    } catch (err) {
        return {name:'Login'}
    }
});

export default router;
