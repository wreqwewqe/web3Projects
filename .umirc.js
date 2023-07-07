import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '银行',
      path: '/bank',
      component: './Bank',
    },
    {
      name:"抢红包",
      path:"/redpack",
      component:"./RedPack"
    },
    {
      name:"多签存证",
      path:"/mutiSign",
      component:"./MutiSign"
    }
  ],
  npmClient: 'pnpm',
});
