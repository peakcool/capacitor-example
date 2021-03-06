import { createRouter, createWebHashHistory, Router } from 'vue-router';

import HelloWorld from '../components/HelloWorld.vue';
import Network from '../components/Network.vue';
import Device from '../components/Device.vue';
import BarcodeScanner from '../components/BarcodeScanner.vue';
import StatusBar from '../components/StatusBar.vue';
import SQLite from '../components/SQLite.vue';

// 1. 定义路由组件.
// 也可以从其他文件导入

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes: any[] = [
  { path: '/', name: 'home', component: HelloWorld },
  { path: '/network', name: 'network', component: Network },
  { path: '/device', name: 'device', component: Device },
  { path: '/status-bar', name: 'status-bar', component: StatusBar },
  { path: '/barcode-scanner', name: 'barcode-scanner', component: BarcodeScanner },
  { path: '/sqlite', name: 'sqlite', component: SQLite },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router: Router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;
