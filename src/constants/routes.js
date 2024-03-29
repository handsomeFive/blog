import Home from '../routes/pages/Home';
import WebsocketUsecase from '../routes/pages/Blog/WebsocketUsecase';
import Game2048 from '../routes/pages/Demo/Game2048';
import Record from '../routes/pages/Blog/Record';
import Snake from '../routes/pages/Demo/GluttonousSnake';
import Screenshot from '../routes/pages/Blog/Screenshot';
import {
  ILLUSTRATION_WEBSOCKET,
  ILLUSTRATION_RECORD,
  ILLUSTRATION_2048,
  ILLUSTRATION_SCREEN_SHOT,
} from '../assets/img';

// 在github的page 默认地址为 https://handsomefive.github.io/blog/ 则需要/blog 根路由

export const BASIC_ROUTE = '/blog';

export const routeConfig = [
  { path: `${BASIC_ROUTE}/`, text: '主页', component: Home, exact: true },
  { path: `${BASIC_ROUTE}/home`, text: '主页', component: Home, exact: true },
  {
    path: `${BASIC_ROUTE}/article/websocket`,
    text: 'websocket使用',
    component: WebsocketUsecase,
    exact: true,
  },
  {
    path: `${BASIC_ROUTE}/article/record`,
    text: '采坑记录',
    component: Record,
    exact: true,
  },
  {
    path: `${BASIC_ROUTE}/article/screenshot`,
    text: '截屏实现',
    component: Screenshot,
    exact: true,
  },
  {
    path: `${BASIC_ROUTE}/demo/game2048`,
    text: '2048小游戏',
    component: Game2048,
    exact: true,
  },
  {
    path: `${BASIC_ROUTE}/demo/gluttonousSnake`,
    text: '贪吃蛇小游戏',
    component: Snake,
    exact: true,
  },
];

export const routesList = [
  {
    catalogue: 'outLink',
    title: '实现-波浪',
    path: `https://thoughts.teambition.com/share/5ffea73086465a0046842427#title=仪表盘实现`,
    brief: '为实现，仪表盘与数字同等递增效果。',
    date: ' 2 Jul , 2021',
    imageSrc: ILLUSTRATION_WEBSOCKET,
  },
  {
    catalogue: 'outLink',
    title: '实现-仪表盘',
    path: `https://thoughts.teambition.com/share/5ffea73086465a0046842427#title=仪表盘实现`,
    brief: '为实现，仪表盘与数字同等递增效果。',
    date: ' 2 Jul , 2021',
    imageSrc: ILLUSTRATION_WEBSOCKET,
  },
  {
    catalogue: 'blog',
    title: 'websocket的使用',
    path: `${BASIC_ROUTE}/article/websocket`,
    brief:
      'WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手... ',
    date: ' 6 Jul , 2019',
    imageSrc: ILLUSTRATION_WEBSOCKET,
  },
  {
    catalogue: 'blog',
    title: 'React Native踩坑记录',
    path: `${BASIC_ROUTE}/article/record`,
    brief: '在react-native项目中发现的坑及解决办法。持续记录...',
    date: '8 Oct, 2019',
    imageSrc: ILLUSTRATION_RECORD,
  },
  {
    catalogue: 'blog',
    title: 'html2canvas生成截图并上传',
    path: `${BASIC_ROUTE}/article/screenshot`,
    brief:
      '在项目中要自动生成截图并上传作为模块的封面，记录一下实现时遇见的问题。',
    date: '22 Oct, 2019',
    imageSrc: ILLUSTRATION_SCREEN_SHOT,
  },
  {
    catalogue: 'demo',
    title: '2048小游戏',
    path: `${BASIC_ROUTE}/demo/game2048`,
    brief: '实现React下2048游戏的开发，使用一维数组来实现数据的合并计算等。',
    date: '21 Jul, 2019',
    imageSrc: ILLUSTRATION_2048,
  },
  {
    catalogue: 'demo',
    title: '贪吃蛇',
    path: `${BASIC_ROUTE}/demo/gluttonousSnake`,
    brief: '实现React下贪吃蛇8游戏的开发。',
    date: '21 Jul, 2019',
    imageSrc: ILLUSTRATION_2048,
  },
];
