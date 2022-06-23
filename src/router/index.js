import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },


  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/information',
    name: 'example',
    meta: {
      title: '人才',
      icon: 'el-icon-user'
    },
    children: [{
        path: 'information',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {
          title: '基本信息',
          icon: 'table'
        }
      },
      {
        path: 'detailed',
        name: 'detailed',
        component: () => import('@/views/personnel/index'),
        meta: {
          title: '详细资料',
          icon: 'el-icon-school'
        }
      },
      {
        path: 'personnel',
        name: 'personnel',
        component: () => import('@/views/personnel/create'),
        meta: {
          title: '添加人才',
          icon: 'edit'
        }
      },
      {
        path: 'personnel/edit/:id(\\d+)',
        component: () => import('@/views/personnel/edit'),
        name: 'EditForm',
        meta: {
          title: '详细资料编辑',
          noCache: true,
          activeMenu: 'education'
        },
        hidden: true
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      // component: () => import('@/views/education/edit'),
      meta: {
        title: '职业',
        icon: 'form'
      }
    }]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    name: 'Nested',
    meta: {
      title: '管理员',
      icon: 'el-icon-postcard'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/nested/menu2/index'),
      name: 'Menu2',
      meta: {
        title: '管理员'
      }
    }]
  },
  // {
  //   path: '/banner',
  //   component: Layout,
  //   redirect: '/banner/list',
  //   name: 'Banner',
  //   meta: {
  //     title: '轮播图',
  //     icon: 'el-icon-picture-outline'
  //   },
  //   children: [{
  //     path: 'list',
  //     component: () => import('@/views/nested/menu2/index'),
  //     name: 'Menu2',
  //     meta: {
  //       title: '轮播图'
  //     }
  //   }]
  // },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
