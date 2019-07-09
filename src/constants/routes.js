import Home from "../routes/pages/Home";
import WebsocketUsecase from "../routes/pages/WebsocketUsecase";
import Game2048 from '../routes/pages/Game2048'

export const menu = [
    {
        title: '技术总结',
        icon: 'icon-Summary',
        children: [
            { title: 'websocket使用', path: '/summary/websocket' }
        ]
    },
    {
        title: 'Demo',
        icon: 'icon-codeoptimization',
        children: [
            { title: '2048小游戏', path: '/demo/game2048' }
        ]
    }
]
export const routeConfig = [
    { path: '/', text: '主页', component: Home, exact: true },
    { path: '/home', text: '主页', component: Home, exact: true },
    { path: '/summary/websocket', text: 'websocket使用', component: WebsocketUsecase, exact: true },
    { path: '/demo/game2048', text: '2048小游戏', component: Game2048, exact: true },
]