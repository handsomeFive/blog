import Home from "../routes/pages/Home";
import WebsocketUsecase from "../routes/pages/WebsocketUsecase";

export const menu = [
    {
        title: '技术总结',
        path: '',
        children: [
            { title: 'websocket使用', path: '/summary/websocket' }
        ]
    }
]
export const routeConfig = [
    { path: '/', text: '主页', component: Home, exact: true },
    { path: '/home', text: '主页', component: Home, exact: true },
    { path: '/summary/websocket', text: 'websocket使用', component: WebsocketUsecase, exact: true },
]