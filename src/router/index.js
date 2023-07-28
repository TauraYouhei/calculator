import { createRouter, createWebHashHistory } from 'vue-router'
import Calculator from '../views/Calculator.vue'
import Register from '../views/RegisterView.vue'
import scpwConfirm from '../views/ScpwConfirmView.vue'
import Login from '../views/LoginView.vue'
import Mypage from '../views/MypageView.vue'
import FriendProfile from '../views/FriendProfileView.vue'
import TalkList from '../views/TalkListView.vue'
import Message from '../views/MessagesView.vue'
import Config from '../views/ConfigView.vue'
import FriendAdd from '../views/FriendAddView.vue'
import PWChange from '../views/PasswordChange.vue'
import secretPasswordChange from '../views/SecretPasswordChange.vue'

const routes = [
  {
    path: '/',
    name: 'calculator',
    component: Calculator
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: scpwConfirm
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: Mypage
  },
  {
    path: '/mypage/friendProfile',
    name: 'friendProfile',
    component: FriendProfile
  },
  {
    path: '/talkList',
    name: 'talkList',
    component: TalkList
  },
  {
    path: '/talkList/message',
    name: 'message',
    component: Message
  },
  {
    path: '/config',
    name: 'config',
    component: Config
  },
  {
    path: '/friendAdd',
    name: 'friendAdd',
    component: FriendAdd
  },
  {
    path: '/config/pwChange',
    name: 'passwordChange',
    component: PWChange
  },
  {
    path: '/config/scpwChange',
    name: 'secretPasswordChange',
    component: secretPasswordChange
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
       return savedPosition
    } else {
       return { top: 0 }
    }
  }
})

export default router
