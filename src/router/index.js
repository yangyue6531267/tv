import Vue from 'vue'

import Router from 'vue-router'

// import Category from '../components/category.vue'

// import Recommend from '../page/recommend.vue'

// const Category = () => import(/* webpackChunkName: "category" */'../components/category.vue')

// const Recommend = () =>
//   import(/* webpackChunkName: "recommend" */'../page/recommend.vue')

// const Recommend = r => require.ensure([], () => r(require('@/page/recommend')), 'Recommend')

// const HotTopics = () =>
//   import(/* webpackChunkName: "zt" */'../page/hotTopics.vue')

// const Detail = () =>
//   import(/* webpackChunkName: "detail" */'../page/detail/Category_Movie.vue')

// const NotFound = () =>
//   import(/* webpackChunkName: "other" */'../page/notFound.vue')

// const actor = () =>
//   import(/* webpackChunkName: "zt" */'../page/detail/actor.vue')

// const Historical = () =>
//   import(/* webpackChunkName: "history" */ '../page/detail/Historical.vue')

// const History = () =>
//   import(/* webpackChunkName: "history" */ '../page/detail/History')

// const Search = () =>
//   import(/* webpackChunkName: "search" */'../page/search/Search.vue')

// const HistoryFirm = () =>
//   import(/* webpackChunkName: "search" */'../page/detail/History_firm.vue')

// const firm = () => import(/* webpackChunkName: "other" */'../page/firm.vue')

// const Filter = () =>
//   import(/* webpackChunkName: "filter" */'../page/filter/FilterResult.vue')

const Category = r => require.ensure([], () => r(require('@/components/category')), 'Category')
const Recommend = r => require.ensure([], () => r(require('@/page/recommend')), 'Recommend')
const Search = r => require.ensure([], () => r(require('@/page/search/Search')), 'Search')
const Filter = r =>
  require.ensure([], () => r(require('@/page/filter/FilterResult')), 'Filter')
const HotTopics = r =>
  require.ensure([], () => r(require('@/page/hotTopics')), 'HotTopics')
const specialDj = r =>
  require.ensure([], () => r(require('@/page/specialDj')), 'specialDj')
const NotFound = r =>
  require.ensure([], () => r(require('@/page/notFound')), 'NotFound')
const History = r =>
  require.ensure([], () => r(require('@/page/historyHome/historyhomes')), 'History')
const Screening = r =>
  require.ensure([], () => r(require('@/page/screening/screenhomes')), 'Screening')
const VideoPlayer = r => require.ensure([], () => r(require('@/page/play/VideoPlayer')), 'Detail')
const EventDetail = r => require.ensure([], () => r(require('@/page/detail/EventDetail/event-detail')), 'EventDetail')
const GameDetail = r => require.ensure([], () => r(require('@/page/detail/GameDetail/game-detail')), 'GameDetail')
const AnchorDetail = r => require.ensure([], () => r(require('@/page/detail/AnchorDetail/anchor-detail')), 'AnchorDetail')
const VarietyDetail = r => require.ensure([], () => r(require('@/page/detail/VarietyDetail/variety-detail')), 'VarietyDetail')
const AnchorShotVideo = r => require.ensure([], () => r(require('@/page/detail/AnchorDetail/anchor-shot-video')), 'Anchor-shot-video')
const PayFor = r => require.ensure([], () => r(require('@/page/payFor/Order')), 'Order')
Vue.use(Router)

export default new Router({
  base: '/esport/',
  mode: 'history',
  routes: [
    { path: '/', redirect: '/jx/index' },
    { path: '/index', redirect: '/jx/index' },
    {
      path: '/jx',
      name: 'category',
      component: Category,
      props: true,
      meta: { keepAlive: true },
      children: [
        {
          path: 'index',
          name: 'index',
          component: Recommend,
          props: true,
          meta: { keepAlive: true }
        }
      ]
    },
    {
      path: '/play',
      name: 'play',
      component: VideoPlayer,
      props: true,
      meta: { keepAlive: false }
    },
    {
      path: '/hotTopics',
      name: 'hotTopics',
      component: HotTopics,
      props: true,
      meta: { keepAlive: true, keep: false }
    },
    {
      path: '/specialDj',
      name: 'specialDj',
      component: specialDj,
      props: true,
      meta: { keepAlive: false }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      props: true,
      meta: { keepAlive: true }
    },
    {
      path: '/payfor',
      name: 'payfor',
      component: PayFor,
      props: true,
      meta: { keepAlive: false }
    },
    {
      path: '/eventDetail',
      name: 'eventDetail',
      component: EventDetail,
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/gameDetail',
      name: 'gameDetail',
      component: GameDetail,
      props: true,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/anchorDetail',
      name: 'anchorDetail',
      component: AnchorDetail,
      props: true,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/varietyDetail',
      name: 'varietyDetail',
      component: VarietyDetail,
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/History',
      name: 'History',
      component: History,
      props: true,
      meta: {
        keepAlive: true, keep: false
      }
    },
    {
      path: '/Screening',
      name: 'Screening',
      component: Screening,
      props: true,
      meta: {
        keepAlive: true, keep: false
      }
    },
    {
      path: '/AnchorShotVideo',
      name: 'AnchorShotVideo',
      component: AnchorShotVideo,
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/filter',
      name: 'filter',
      component: Filter,
      props: true,
      meta: { keepAlive: true }
    },
    {
      path: '*',
      name: 'all',
      component: NotFound,
      props: true,
      meta: { keepAlive: true }
    }
  ]
})
