import React from 'react'
import Article from "../component/Article";
import { Typography, Divider, Table } from "antd";
import IMG_WS from '../../../assets/img/ws.png'
import Codeflask from 'codeflask'

const { Title, Paragraph, Text } = Typography

export default class WebsocketUsecase extends React.PureComponent {

    componentDidMount () {
        const option = { language: 'js', lineNumbers: true, readonly: true }
        const flask1 = new Codeflask('#codeTextArea', option)
        const flask2 = new Codeflask('#codeTextArea2', option)
        const flask3 = new Codeflask('#codeTextArea3', option)
        const code1 = `const Socket = new Websocket(url,[protocol])
                     //url, 指定连接的 URL
                     // protocol 是可选的，指定了可接受的子协议`
        const code3 = 'const ws= new DataPointWebSocket (params)' +
            '// 创建实例'
        const code2 = '/***\n' +
            ' * websocket封装类\n' +
            ' * @author daopian\n' +
            ' * @param {Object} config - 配置对象\n' +
            ' * @param {String} config.type - 1:数据点 2:数据感知点\n' +
            ' * @param {String} config.id - 对应的数据点id\n' +
            ' * @example const ws =new DataPointWebSocket(config)\n' +
            ' *          now you can use ws to subscribe and unsubscribe\n' +
            ' */\n' +
            'export class DataPointWebSocket {\n' +
            '  constructor (config) {\n' +
            '    this.params = config || {}\n' +
            '    this.clearable = false\n' +
            '    this.connect() // 初始化\n' +
            '  }\n' +
            '  heartCheck = { // 心跳检测\n' +
            '    context: this,\n' +
            '    timeout: 60000,\n' +
            '    timeoutObj: null,\n' +
            '    start: function () {\n' +
            '      const timeout = this.timeout\n' +
            '      const websocket = this.context.ws\n' +
            '      this.timeoutObj = setTimeout(() => { // 一分钟无数据推送时检测连接是否正常，若不正常会触发ws的close事件\n' +
            '        websocket.send(\'HeartBeat\')\n' +
            '        this.reset()\n' +
            '      }, timeout)\n' +
            '    },\n' +
            '    reset: function () {\n' +
            '      this.stop()\n' +
            '      this.start()\n' +
            '    },\n' +
            '    stop: function () {\n' +
            '      window.clearTimeout(this.timeoutObj)\n' +
            '    }\n' +
            '  }\n' +
            '  connect () { // 发起连接并绑定事件\n' +
            '    window.WebSocket = window.WebSocket || window.MozWebSocket\n' +
            '    if (!window.WebSocket) { // 检测浏览器支持\n' +
            '      console.error(\'错误: 浏览器不支持websocket\')\n' +
            '      return\n' +
            '    }\n' +
            '    const {type, id} = this.params\n' +
            '    const url = baseUrl + \'type=\' + type + \'&id=\' + id\n' +
            '    this.ws = new WebSocket(url)\n' +
            '    this.ws.onopen = (ev) => {\n' +
            '      this.heartCheck.start()  //开始心跳检测\n' +
            '      this.onOpen(ev)\n' +
            '    }\n' +
            '    this.ws.onerror = (ev) => {\n' +
            '      this.onError(ev)\n' +
            '      this.reconnect()\n' +
            '    }\n' +
            '    this.ws.onclose = () => { // 心跳重连时会主动触发onclose\n' +
            '      this.heartCheck.stop()\n' +
            '      this.reconnect()\n' +
            '    }\n' +
            '    this.ws.onmessage = (message) => {\n' +
            '      this.heartCheck.reset()\n' +
            '      const {value} = JSON.parse(message.data)\n' +
            '      this.subscribe(value)\n' +
            '    }\n' +
            '  }\n' +
            '  reconnect () { // 重连\n' +
            '    if (this.ws.readyState === WebSocket.CLOSED || this.ws.readyState === WebSocket.CLOSING) { // 当ws状态已关闭或正在关闭\n' +
            '      if (!this.clearable) {\n' +
            '        this.connect() //\n' +
            '      } else {\n' +
            '        this.clearable = false\n' +
            '      }\n' +
            '    }\n' +
            '  }\n' +
            '  onOpen (ev) { // 连接成功的回调\n' +
            '  }\n' +
            '  onError (ev) { // 发生错误的回调\n' +
            '  }\n' +
            '  subscribe (value) { // 订阅数据更新\n' +
            '  }\n' +
            '  unsubscribe () { // 取消订阅\n' +
            '    this.clearable = true\n' +
            '    this.ws.close()\n' +
            '  }\n' +
            '  update (params) { // 更新参数\n' +
            '    this.params = params\n' +
            '    return this // 为链式调用\n' +
            '  }\n' +
            '}'
        flask1.updateCode(code1)
        flask2.updateCode(code2)
        flask3.updateCode(code3)
    }

    renderParagraph1 () {
        return <React.Fragment>
            <Title level={ 3 }>一.websocket简介</Title>
            <Divider/>
            <Paragraph>
                WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
            </Paragraph>
            <Paragraph>
                WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API
                中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
            </Paragraph>
            <Paragraph>
                在 WebSocket API 中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。
            </Paragraph>
            <Paragraph><img src={ IMG_WS } width={ '100%' }/></Paragraph>
        </React.Fragment>
    }

    renderParagraph2 () {
        return <React.Fragment>
            <Title level={ 3 }>二.websocket特点</Title>
            <Divider/>
            <Text>1.&nbsp;&nbsp;建立在 TCP 协议之上，服务器端的实现比较容易。</Text><br/>
            <Text>2.&nbsp;&nbsp;与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。</Text><br/>
            <Text>3.&nbsp;&nbsp;数据格式比较轻量，性能开销小，通信高效。</Text><br/>
            <Text>4.&nbsp;&nbsp;可以发送文本，也可以发送二进制数据。</Text><br/>
            <Text>5.&nbsp;&nbsp;没有同源限制，客户端可以与任意服务器通信。</Text><br/>
            <Text>6.&nbsp;&nbsp;协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。</Text>
        </React.Fragment>
    }

    renderParagraph3 () {
        return <React.Fragment>
            <Title level={ 3 }>三.websocket的使用</Title>
            <Divider/>
            <Title level={ 4 }>1）创建websocket对象-Socket</Title>
            <div id={ 'codeTextArea' } style={ { width: '100%', height: 100, position: 'relative' } }/>
            <Title level={ 4 }>2）Socket 属性</Title>
            <Table columns={ [{ dataIndex: 'props', title: '属性' }, { dataIndex: 'desc', title: '描述' }] }
                   dataSource={ [{ props: 'Socket.readyState', desc: '只读属性 readyState 表示连接状态。' },
                       { props: '', desc: '0 - 表示连接尚未建立。' },
                       { props: '', desc: '1 - 表示连接已建立，可以进行通信。' },
                       { props: '', desc: '2 - 表示连接正在进行关闭。' },
                       { props: '', desc: '3 - 表示连接已经关闭或者连接不能打开。' },
                       {
                           props: 'Socket.bufferedAmount',
                           desc: '只读属性 bufferedAmount 已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数。'
                       },
                   ] }
                   pagination={ false } size='small'/>
            <Title level={ 4 }>3）Socket 事件</Title>
            <Table pagination={ false } size='small'
                   columns={ [{ dataIndex: 'event', title: '事件' },
                       { dataIndex: 'handler', title: '事件处理程序' },
                       { dataIndex: 'desc', title: '描述' }] }
                   dataSource={ [{ event: 'open', handler: 'Socket.onopen', desc: '连接建立时触发' },
                       { event: 'message', handler: 'Socket.onmesage', desc: '客户端接收服务端数据时触发' },
                       { event: 'error', handler: 'Socket.onerror', desc: '通信发生错误时触发' },
                       { event: 'close', handler: 'Socket.onclose', desc: '连接关闭时触发' }] }/>
            <Title level={ 4 }>4）Socket 方法</Title>
            <Table pagination={ false } size='small'
                   columns={ [{ dataIndex: 'function', title: '方法' }, { dataIndex: 'desc', title: '描述' }] }
                   dataSource={ [{ function: 'Socket.send()', desc: '使用连接发送数据' },
                       { function: 'Socket.close()', desc: '关闭连接' }] }/>
        </React.Fragment>
    }

    renderParagraph4 () {
        return <React.Fragment>
            <Title level={ 3 }>三.websocket的使用</Title>
            <Divider/>
            <Title level={ 4 }>1）心跳重连</Title>
            <Paragraph>
                在使用Websocket过程中, 可能会出现网络断开的情况, 比如信号不好, 或者网络临时性关闭, 这时候Websocket的连接已经断开, 而浏览器不会触发websocket的onclose方法,
                我们无法知道是否断开连接, 也就无法进行重连操作。
            </Paragraph>
            <Paragraph>
                如果在这种情况下向后端发送数据, onclose便会触发, 这时候便可进行绑定好的重连操作.因此websocket心跳重连就应运而生了。
            </Paragraph>
            <Title level={ 4 }>2）websocket的封装</Title>
            <Paragraph>
                为了方便在项目中使用，作者已经整合了心跳重连及一些基础绑定操作，使用者在使用时可将精力聚焦在数据响应的处理上，无需再考虑心跳重连及基础操作。使用者使用对象时需订阅数据，在退出界面时应关闭连接即取消订阅，对于参数改变使用update方法更新参数。代码持续优化中...
            </Paragraph>
            <div id={ 'codeTextArea2' } style={ { width: '100%', height: 1760, position: 'relative' } }/>
            <Title level={ 4 }>API:</Title>
            <div id={ 'codeTextArea3' }
                 style={ { width: '100%', height: 50, position: 'relative', marginBottom: 20 } }/>
            <Table pagination={ false } size='small'
                   columns={ [{ dataIndex: 'name', title: '名称' },
                       { dataIndex: 'desc', title: '说明' },
                       { dataIndex: 'type', title: '类型' }] }
                   dataSource={ [{ name: 'ws.onOpen', desc: '创建连接时', type: 'function(ev)--回调' },
                       { name: 'ws.onError ', desc: '连接出现问题', type: 'function(ev)--回调' },
                       { name: 'ws.subscribe', desc: '订阅，响应后端响应', type: 'function(value)--回调' },
                       { name: 'ws.unsubscribe ', desc: '取消订阅，关闭连接', type: 'function()--方法' },
                       { name: 'ws.update', desc: '更新对象，参数（params）', type: 'function()--方法' },
                       { name: 'ws.update', desc: '手动重连', type: 'function()--方法' }] }/>
        </React.Fragment>
    }


    render () {
        return <Article>
            <Typography>
                <Title level={ 2 }>websocket项目初级方案沉淀</Title>
                { this.renderParagraph1() }
                { this.renderParagraph2() }
                { this.renderParagraph3() }
                { this.renderParagraph4() }
            </Typography>
        </Article>
    }

}