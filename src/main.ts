import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store, { key } from '@/store'

import 'normalize.css'
import '@/assets/styles/global.scss'
import 'lib-flexible'

const app = createApp(App)
// vant组件库
import {
  Tabs,
  Cell,
  Button,
  NavBar,
  Tab,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  TreeSelect,
  Card,
  Stepper,
  SubmitBar,
  Checkbox,
  Lazyload,
  Empty,
  Pagination,
  Toast,
  Form,
  Field,
  CellGroup,
  List,
  SwipeCell,
  ShareSheet,
  Area,
  Popup,
  Overlay,
  Uploader,
} from 'vant'
// vant 组件库样式
import 'vant/lib/index.css'

app
  .use(Button)
  .use(NavBar)
  .use(Tabbar)
  .use(Tab)
  .use(Tabs)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(TreeSelect)
  .use(Card)
  .use(Stepper)
  .use(SubmitBar)
  .use(Checkbox)
  .use(Cell)
  .use(Lazyload)
  .use(Empty)
  .use(Pagination)
  .use(Toast)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(List)
  .use(SwipeCell)
  .use(ShareSheet)
  .use(Area)
  .use(Popup)
  .use(Overlay)
  .use(Uploader)
  .use(router)
  .use(store, key)
  .mount('#app')
