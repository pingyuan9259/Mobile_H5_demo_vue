import Vue from 'vue'
import Router from 'vue-router'
import Person from '@/components/Person'
import MyAccount from '@/components/account/MyAccount'
import MyPayLog from '@/components/account/MyPayLog'
import BuyMemberPage from '@/components/account/BuyMemberPage'
import NewbornHelp from '@/components/account/NewbornHelp'
import CourseDetail from '@/components/course/Detail'
import LiveBack from '@/components/course/liveback'
import CourseDetail2 from '@/components/course/Detail2'
import TimeMachine from '@/components/TimeMachine/index'
import PostList from '@/components/PostList/index'
import StudyQuery from '@/components/StudyQuery/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/myAccount',
      name: 'MyAccount',
      component: MyAccount
    },
    {
      path: '/myPayLog',
      name: 'MyPayLog',
      component: MyPayLog
    },
    {
      path: '/buyMemberPage',
      name: 'BuyMemberPage',
      component: BuyMemberPage
    },
    {
      path: '/courseDetail',
      name: 'CourseDetail',
      component: CourseDetail
    },
    {
      path: '/courseDetail2',
      name: 'CourseDetail2',
      component: CourseDetail2
    },
    {
      path: '/newborn',
      name: 'NewbornHelp',
      component: NewbornHelp
    },
    {
      path: '/timemachine',
      name: 'TimeMachine',
      component: TimeMachine
    },
    {
      path: '/postlist',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/studyquery',
      name: 'StudyQuery',
      component: StudyQuery
    },
    {
      path: '/liveback',
      name: 'LiveBack',
      component: LiveBack
    }
  ]
})
