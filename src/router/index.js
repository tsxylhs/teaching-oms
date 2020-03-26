import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes Takean mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/homework',
    name: '作业管理',
    meta: { title: '作业管理', icon: 'example' },
    children: [
      {
        path: '/homework',
        name: 'Table',
        component: () => import('@/views/homework/index'),
        meta: { title: '布置的作业', icon: 'table' }
      },
      {
        path: '提交的作业',
        name: 'Tree',
        component: () => import('@/views/subhomework/index'),
        meta: { title: '提交的作业', icon: 'tree' }
      }
    ]
  },

  {
    path: '/attendance',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '考勤管理',
        component: () => import('@/views/attendance/index'),
        meta: { title: '考勤管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/Takean',
    component: Layout,
    redirect: '/Takean/grades',
    name: 'Nested',
    meta: {
      title: '考务',
      icon: 'nested'
    },
    children: [
      {
        path: 'grades',
        component: () => import('@/views/Takean/grades/index'), // Parent router-view
        name: '平时成绩',
        meta: { title: '平时成绩' },
        children: [
          {
            path: 'grades-1',
            component: () => import('@/views/Takean/grades/signin'),
            name: '签到成绩',
            meta: { title: '签到成绩' }
          },
          {
            path: 'grades-2',
            component: () => import('@/views/Takean/grades/performance'),
            name: '课堂表现',
            meta: { title: '课堂表现' },
            children: [
              {
                path: 'grades-2-1',
                component: () => import('@/views/Takean/grades/performance/mathematics'),
                name: '离散数学',
                meta: { title: '离散数学' }
              },
              {
                path: 'grades-2-2',
                component: () => import('@/views/Takean/grades/performance/software'),
                name: '软件工程',
                meta: { title: '软件工程' }
              }
            ]
          }
        ]
      },
      {
        path: 'Menu1-3',
        component: () => import('@/views/Takean/grades/testscores'),
        name: 'Menu1-3',
        meta: { title: '考试成绩' }
      }

    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '系统用户', icon: 'link' }
      }
    ]
  },
  {
    path: 'errormessage',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '小程序错误上报', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
