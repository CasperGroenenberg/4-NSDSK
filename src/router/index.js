import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior () {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import('@/components/LandingPage.vue')
    },
    {
      path: '/confirm-registration',
      name: 'confirm-registration',
      meta: { layout: 'userpages' },
      component: () => import('@/components/ConfirmRegistration.vue'),
      beforeEnter (to, _from, next) {
        if (to.query.token?.match(/[\d]*/)) {
          next()
        } else {
          next({ name: 'landing-page' })
        }
      }
    },
    {
      path: '/change-email',
      name: 'change-email',
      meta: { layout: 'userpages' },
      component: () => import('@/components/ChangeEmail.vue'),
      beforeEnter (to, _from, next) {
        if (to.query.token?.match(/[\d]*/)) {
          next()
        } else {
          next({ name: 'landing-page' })
        }
      }
    },
    {
      path: '/change-password',
      name: 'change-password',
      meta: { layout: 'userpages' },
      component: () => import('@/components/ChangePassword.vue'),
      beforeEnter (to, _from, next) {
        if (to.query.token?.match(/[\d]*/)) {
          next()
        } else {
          next({ name: 'landing-page' })
        }
      }
    }
  ]
})

export default router
