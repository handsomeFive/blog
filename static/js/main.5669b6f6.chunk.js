(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{159:function(e,t,a){e.exports={article_body:"Article_article_body__CwDmE"}},170:function(e,t,a){e.exports=a(348)},194:function(e,t,a){e.exports=a.p+"static/media/illustration_websocket.23db087e.jpeg"},195:function(e,t,a){e.exports=a.p+"static/media/illustration_record.8b99f6aa.jpg"},196:function(e,t,a){e.exports=a.p+"static/media/illistration_2048.86cbbb54.jpg"},197:function(e,t,a){e.exports=a.p+"static/media/illistration_screenshot.190e6ac5.jpg"},198:function(e,t,a){e.exports=a.p+"static/media/ws.37927860.png"},345:function(e,t,a){},346:function(e,t,a){},348:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),l=a.n(c),o=a(11),i=a(12),s=a(15),u=a(14),d=a(16),m=a(25),h=a(30),p=(a(175),a(168)),b=(a(177),a(124)),f=(a(179),a(69)),g=a(95),v=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"\u4e3b\u9875")}}]),t}(r.a.PureComponent),E=(a(349),a(79)),x=(a(99),a(44)),y=(a(120),a(28)),k=a(159),w=a.n(k),O=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",this.props,r.a.createElement("div",{className:w.a.article_body},this.props.children))}}]),t}(r.a.PureComponent),j=a(194),S=a(195),C=a(196),P=a(197),_=a(198),T=a(33),A=y.a.Title,D=y.a.Paragraph,R=y.a.Text,I=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e={language:"js",lineNumbers:!0,readonly:!0},t=new T.a("#codeTextArea",e),a=new T.a("#codeTextArea2",e),n=new T.a("#codeTextArea3",e);t.updateCode("const Socket = new Websocket(url,[protocol])\n                     //url, \u6307\u5b9a\u8fde\u63a5\u7684 URL\n                     // protocol \u662f\u53ef\u9009\u7684\uff0c\u6307\u5b9a\u4e86\u53ef\u63a5\u53d7\u7684\u5b50\u534f\u8bae"),a.updateCode("/***\n * websocket\u5c01\u88c5\u7c7b\n * @author daopian\n * @param {Object} config - \u914d\u7f6e\u5bf9\u8c61\n * @param {String} config.type - 1:\u6570\u636e\u70b9 2:\u6570\u636e\u611f\u77e5\u70b9\n * @param {String} config.id - \u5bf9\u5e94\u7684\u6570\u636e\u70b9id\n * @example const ws =new DataPointWebSocket(config)\n *          now you can use ws to subscribe and unsubscribe\n */\nexport class DataPointWebSocket {\n  constructor (config) {\n    this.params = config || {}\n    this.clearable = false\n    this.connect() // \u521d\u59cb\u5316\n  }\n  heartCheck = { // \u5fc3\u8df3\u68c0\u6d4b\n    context: this,\n    timeout: 60000,\n    timeoutObj: null,\n    start: function () {\n      const timeout = this.timeout\n      const websocket = this.context.ws\n      this.timeoutObj = setTimeout(() => { // \u4e00\u5206\u949f\u65e0\u6570\u636e\u63a8\u9001\u65f6\u68c0\u6d4b\u8fde\u63a5\u662f\u5426\u6b63\u5e38\uff0c\u82e5\u4e0d\u6b63\u5e38\u4f1a\u89e6\u53d1ws\u7684close\u4e8b\u4ef6\n        websocket.send('HeartBeat')\n        this.reset()\n      }, timeout)\n    },\n    reset: function () {\n      this.stop()\n      this.start()\n    },\n    stop: function () {\n      window.clearTimeout(this.timeoutObj)\n    }\n  }\n  connect () { // \u53d1\u8d77\u8fde\u63a5\u5e76\u7ed1\u5b9a\u4e8b\u4ef6\n    window.WebSocket = window.WebSocket || window.MozWebSocket\n    if (!window.WebSocket) { // \u68c0\u6d4b\u6d4f\u89c8\u5668\u652f\u6301\n      console.error('\u9519\u8bef: \u6d4f\u89c8\u5668\u4e0d\u652f\u6301websocket')\n      return\n    }\n    const {type, id} = this.params\n    const url = baseUrl + 'type=' + type + '&id=' + id\n    this.ws = new WebSocket(url)\n    this.ws.onopen = (ev) => {\n      this.heartCheck.start()  //\u5f00\u59cb\u5fc3\u8df3\u68c0\u6d4b\n      this.onOpen(ev)\n    }\n    this.ws.onerror = (ev) => {\n      this.onError(ev)\n      this.reconnect()\n    }\n    this.ws.onclose = () => { // \u5fc3\u8df3\u91cd\u8fde\u65f6\u4f1a\u4e3b\u52a8\u89e6\u53d1onclose\n      this.heartCheck.stop()\n      this.reconnect()\n    }\n    this.ws.onmessage = (message) => {\n      this.heartCheck.reset()\n      const {value} = JSON.parse(message.data)\n      this.subscribe(value)\n    }\n  }\n  reconnect () { // \u91cd\u8fde\n    if (this.ws.readyState === WebSocket.CLOSED || this.ws.readyState === WebSocket.CLOSING) { // \u5f53ws\u72b6\u6001\u5df2\u5173\u95ed\u6216\u6b63\u5728\u5173\u95ed\n      if (!this.clearable) {\n        this.connect() //\n      } else {\n        this.clearable = false\n      }\n    }\n  }\n  onOpen (ev) { // \u8fde\u63a5\u6210\u529f\u7684\u56de\u8c03\n  }\n  onError (ev) { // \u53d1\u751f\u9519\u8bef\u7684\u56de\u8c03\n  }\n  subscribe (value) { // \u8ba2\u9605\u6570\u636e\u66f4\u65b0\n  }\n  unsubscribe () { // \u53d6\u6d88\u8ba2\u9605\n    this.clearable = true\n    this.ws.close()\n  }\n  update (params) { // \u66f4\u65b0\u53c2\u6570\n    this.params = params\n    return this // \u4e3a\u94fe\u5f0f\u8c03\u7528\n  }\n}"),n.updateCode("const ws= new DataPointWebSocket (params)// \u521b\u5efa\u5b9e\u4f8b")}},{key:"renderParagraph1",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(A,{level:3},"\u4e00.websocket\u7b80\u4ecb"),r.a.createElement(x.a,null),r.a.createElement(D,null,"WebSocket \u662f HTML5 \u5f00\u59cb\u63d0\u4f9b\u7684\u4e00\u79cd\u5728\u5355\u4e2a TCP \u8fde\u63a5\u4e0a\u8fdb\u884c\u5168\u53cc\u5de5\u901a\u8baf\u7684\u534f\u8bae\u3002"),r.a.createElement(D,null,"WebSocket \u4f7f\u5f97\u5ba2\u6237\u7aef\u548c\u670d\u52a1\u5668\u4e4b\u95f4\u7684\u6570\u636e\u4ea4\u6362\u53d8\u5f97\u66f4\u52a0\u7b80\u5355\uff0c\u5141\u8bb8\u670d\u52a1\u7aef\u4e3b\u52a8\u5411\u5ba2\u6237\u7aef\u63a8\u9001\u6570\u636e\u3002\u5728 WebSocket API \u4e2d\uff0c\u6d4f\u89c8\u5668\u548c\u670d\u52a1\u5668\u53ea\u9700\u8981\u5b8c\u6210\u4e00\u6b21\u63e1\u624b\uff0c\u4e24\u8005\u4e4b\u95f4\u5c31\u76f4\u63a5\u53ef\u4ee5\u521b\u5efa\u6301\u4e45\u6027\u7684\u8fde\u63a5\uff0c\u5e76\u8fdb\u884c\u53cc\u5411\u6570\u636e\u4f20\u8f93\u3002"),r.a.createElement(D,null,"\u5728 WebSocket API \u4e2d\uff0c\u6d4f\u89c8\u5668\u548c\u670d\u52a1\u5668\u53ea\u9700\u8981\u505a\u4e00\u4e2a\u63e1\u624b\u7684\u52a8\u4f5c\uff0c\u7136\u540e\uff0c\u6d4f\u89c8\u5668\u548c\u670d\u52a1\u5668\u4e4b\u95f4\u5c31\u5f62\u6210\u4e86\u4e00\u6761\u5feb\u901f\u901a\u9053\u3002\u4e24\u8005\u4e4b\u95f4\u5c31\u76f4\u63a5\u53ef\u4ee5\u6570\u636e\u4e92\u76f8\u4f20\u9001\u3002"),r.a.createElement(D,null,r.a.createElement("img",{src:_,width:"100%"})))}},{key:"renderParagraph2",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(A,{level:3},"\u4e8c.websocket\u7279\u70b9"),r.a.createElement(x.a,null),r.a.createElement(R,null,"1.\xa0\xa0\u5efa\u7acb\u5728 TCP \u534f\u8bae\u4e4b\u4e0a\uff0c\u670d\u52a1\u5668\u7aef\u7684\u5b9e\u73b0\u6bd4\u8f83\u5bb9\u6613\u3002"),r.a.createElement("br",null),r.a.createElement(R,null,"2.\xa0\xa0\u4e0e HTTP \u534f\u8bae\u6709\u7740\u826f\u597d\u7684\u517c\u5bb9\u6027\u3002\u9ed8\u8ba4\u7aef\u53e3\u4e5f\u662f80\u548c443\uff0c\u5e76\u4e14\u63e1\u624b\u9636\u6bb5\u91c7\u7528 HTTP \u534f\u8bae\uff0c\u56e0\u6b64\u63e1\u624b\u65f6\u4e0d\u5bb9\u6613\u5c4f\u853d\uff0c\u80fd\u901a\u8fc7\u5404\u79cd HTTP \u4ee3\u7406\u670d\u52a1\u5668\u3002"),r.a.createElement("br",null),r.a.createElement(R,null,"3.\xa0\xa0\u6570\u636e\u683c\u5f0f\u6bd4\u8f83\u8f7b\u91cf\uff0c\u6027\u80fd\u5f00\u9500\u5c0f\uff0c\u901a\u4fe1\u9ad8\u6548\u3002"),r.a.createElement("br",null),r.a.createElement(R,null,"4.\xa0\xa0\u53ef\u4ee5\u53d1\u9001\u6587\u672c\uff0c\u4e5f\u53ef\u4ee5\u53d1\u9001\u4e8c\u8fdb\u5236\u6570\u636e\u3002"),r.a.createElement("br",null),r.a.createElement(R,null,"5.\xa0\xa0\u6ca1\u6709\u540c\u6e90\u9650\u5236\uff0c\u5ba2\u6237\u7aef\u53ef\u4ee5\u4e0e\u4efb\u610f\u670d\u52a1\u5668\u901a\u4fe1\u3002"),r.a.createElement("br",null),r.a.createElement(R,null,"6.\xa0\xa0\u534f\u8bae\u6807\u8bc6\u7b26\u662fws\uff08\u5982\u679c\u52a0\u5bc6\uff0c\u5219\u4e3awss\uff09\uff0c\u670d\u52a1\u5668\u7f51\u5740\u5c31\u662f URL\u3002"))}},{key:"renderParagraph3",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(A,{level:3},"\u4e09.websocket\u7684\u4f7f\u7528"),r.a.createElement(x.a,null),r.a.createElement(A,{level:4},"1\uff09\u521b\u5efawebsocket\u5bf9\u8c61-Socket"),r.a.createElement("div",{id:"codeTextArea",style:{width:"100%",height:100,position:"relative"}}),r.a.createElement(A,{level:4},"2\uff09Socket \u5c5e\u6027"),r.a.createElement(E.a,{columns:[{dataIndex:"props",title:"\u5c5e\u6027"},{dataIndex:"desc",title:"\u63cf\u8ff0"}],dataSource:[{props:"Socket.readyState",desc:"\u53ea\u8bfb\u5c5e\u6027 readyState \u8868\u793a\u8fde\u63a5\u72b6\u6001\u3002"},{props:"",desc:"0 - \u8868\u793a\u8fde\u63a5\u5c1a\u672a\u5efa\u7acb\u3002"},{props:"",desc:"1 - \u8868\u793a\u8fde\u63a5\u5df2\u5efa\u7acb\uff0c\u53ef\u4ee5\u8fdb\u884c\u901a\u4fe1\u3002"},{props:"",desc:"2 - \u8868\u793a\u8fde\u63a5\u6b63\u5728\u8fdb\u884c\u5173\u95ed\u3002"},{props:"",desc:"3 - \u8868\u793a\u8fde\u63a5\u5df2\u7ecf\u5173\u95ed\u6216\u8005\u8fde\u63a5\u4e0d\u80fd\u6253\u5f00\u3002"},{props:"Socket.bufferedAmount",desc:"\u53ea\u8bfb\u5c5e\u6027 bufferedAmount \u5df2\u88ab send() \u653e\u5165\u6b63\u5728\u961f\u5217\u4e2d\u7b49\u5f85\u4f20\u8f93\uff0c\u4f46\u662f\u8fd8\u6ca1\u6709\u53d1\u51fa\u7684 UTF-8 \u6587\u672c\u5b57\u8282\u6570\u3002"}],pagination:!1,size:"small"}),r.a.createElement(A,{level:4},"3\uff09Socket \u4e8b\u4ef6"),r.a.createElement(E.a,{pagination:!1,size:"small",columns:[{dataIndex:"event",title:"\u4e8b\u4ef6"},{dataIndex:"handler",title:"\u4e8b\u4ef6\u5904\u7406\u7a0b\u5e8f"},{dataIndex:"desc",title:"\u63cf\u8ff0"}],dataSource:[{event:"open",handler:"Socket.onopen",desc:"\u8fde\u63a5\u5efa\u7acb\u65f6\u89e6\u53d1"},{event:"message",handler:"Socket.onmesage",desc:"\u5ba2\u6237\u7aef\u63a5\u6536\u670d\u52a1\u7aef\u6570\u636e\u65f6\u89e6\u53d1"},{event:"error",handler:"Socket.onerror",desc:"\u901a\u4fe1\u53d1\u751f\u9519\u8bef\u65f6\u89e6\u53d1"},{event:"close",handler:"Socket.onclose",desc:"\u8fde\u63a5\u5173\u95ed\u65f6\u89e6\u53d1"}]}),r.a.createElement(A,{level:4},"4\uff09Socket \u65b9\u6cd5"),r.a.createElement(E.a,{pagination:!1,size:"small",columns:[{dataIndex:"function",title:"\u65b9\u6cd5"},{dataIndex:"desc",title:"\u63cf\u8ff0"}],dataSource:[{function:"Socket.send()",desc:"\u4f7f\u7528\u8fde\u63a5\u53d1\u9001\u6570\u636e"},{function:"Socket.close()",desc:"\u5173\u95ed\u8fde\u63a5"}]}))}},{key:"renderParagraph4",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(A,{level:3},"\u4e09.websocket\u7684\u4f7f\u7528"),r.a.createElement(x.a,null),r.a.createElement(A,{level:4},"1\uff09\u5fc3\u8df3\u91cd\u8fde"),r.a.createElement(D,null,"\u5728\u4f7f\u7528Websocket\u8fc7\u7a0b\u4e2d, \u53ef\u80fd\u4f1a\u51fa\u73b0\u7f51\u7edc\u65ad\u5f00\u7684\u60c5\u51b5, \u6bd4\u5982\u4fe1\u53f7\u4e0d\u597d, \u6216\u8005\u7f51\u7edc\u4e34\u65f6\u6027\u5173\u95ed, \u8fd9\u65f6\u5019Websocket\u7684\u8fde\u63a5\u5df2\u7ecf\u65ad\u5f00, \u800c\u6d4f\u89c8\u5668\u4e0d\u4f1a\u89e6\u53d1websocket\u7684onclose\u65b9\u6cd5, \u6211\u4eec\u65e0\u6cd5\u77e5\u9053\u662f\u5426\u65ad\u5f00\u8fde\u63a5, \u4e5f\u5c31\u65e0\u6cd5\u8fdb\u884c\u91cd\u8fde\u64cd\u4f5c\u3002"),r.a.createElement(D,null,"\u5982\u679c\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\u5411\u540e\u7aef\u53d1\u9001\u6570\u636e, onclose\u4fbf\u4f1a\u89e6\u53d1, \u8fd9\u65f6\u5019\u4fbf\u53ef\u8fdb\u884c\u7ed1\u5b9a\u597d\u7684\u91cd\u8fde\u64cd\u4f5c.\u56e0\u6b64websocket\u5fc3\u8df3\u91cd\u8fde\u5c31\u5e94\u8fd0\u800c\u751f\u4e86\u3002"),r.a.createElement(A,{level:4},"2\uff09websocket\u7684\u5c01\u88c5"),r.a.createElement(D,null,"\u4e3a\u4e86\u65b9\u4fbf\u5728\u9879\u76ee\u4e2d\u4f7f\u7528\uff0c\u4f5c\u8005\u5df2\u7ecf\u6574\u5408\u4e86\u5fc3\u8df3\u91cd\u8fde\u53ca\u4e00\u4e9b\u57fa\u7840\u7ed1\u5b9a\u64cd\u4f5c\uff0c\u4f7f\u7528\u8005\u5728\u4f7f\u7528\u65f6\u53ef\u5c06\u7cbe\u529b\u805a\u7126\u5728\u6570\u636e\u54cd\u5e94\u7684\u5904\u7406\u4e0a\uff0c\u65e0\u9700\u518d\u8003\u8651\u5fc3\u8df3\u91cd\u8fde\u53ca\u57fa\u7840\u64cd\u4f5c\u3002\u4f7f\u7528\u8005\u4f7f\u7528\u5bf9\u8c61\u65f6\u9700\u8ba2\u9605\u6570\u636e\uff0c\u5728\u9000\u51fa\u754c\u9762\u65f6\u5e94\u5173\u95ed\u8fde\u63a5\u5373\u53d6\u6d88\u8ba2\u9605\uff0c\u5bf9\u4e8e\u53c2\u6570\u6539\u53d8\u4f7f\u7528update\u65b9\u6cd5\u66f4\u65b0\u53c2\u6570\u3002\u4ee3\u7801\u6301\u7eed\u4f18\u5316\u4e2d..."),r.a.createElement("div",{id:"codeTextArea2",style:{width:"100%",height:1760,position:"relative"}}),r.a.createElement(A,{level:4},"API:"),r.a.createElement("div",{id:"codeTextArea3",style:{width:"100%",height:50,position:"relative",marginBottom:20}}),r.a.createElement(E.a,{pagination:!1,size:"small",columns:[{dataIndex:"name",title:"\u540d\u79f0"},{dataIndex:"desc",title:"\u8bf4\u660e"},{dataIndex:"type",title:"\u7c7b\u578b"}],dataSource:[{name:"ws.onOpen",desc:"\u521b\u5efa\u8fde\u63a5\u65f6",type:"function(ev)--\u56de\u8c03"},{name:"ws.onError ",desc:"\u8fde\u63a5\u51fa\u73b0\u95ee\u9898",type:"function(ev)--\u56de\u8c03"},{name:"ws.subscribe",desc:"\u8ba2\u9605\uff0c\u54cd\u5e94\u540e\u7aef\u54cd\u5e94",type:"function(value)--\u56de\u8c03"},{name:"ws.unsubscribe ",desc:"\u53d6\u6d88\u8ba2\u9605\uff0c\u5173\u95ed\u8fde\u63a5",type:"function()--\u65b9\u6cd5"},{name:"ws.update",desc:"\u66f4\u65b0\u5bf9\u8c61\uff0c\u53c2\u6570\uff08params\uff09",type:"function()--\u65b9\u6cd5"},{name:"ws.update",desc:"\u624b\u52a8\u91cd\u8fde",type:"function()--\u65b9\u6cd5"}]}))}},{key:"render",value:function(){var e=this.props.height;return r.a.createElement(O,{style:{height:e,overflow:"auto"}},r.a.createElement(y.a,null,r.a.createElement(A,{level:2},"websocket\u9879\u76ee\u521d\u7ea7\u65b9\u6848\u6c89\u6dc0"),this.renderParagraph1(),this.renderParagraph2(),this.renderParagraph3(),this.renderParagraph4()))}}]),t}(r.a.PureComponent),L=(a(98),a(68)),W=a(56),N=function(){function e(t){Object(o.a)(this,e),this._count=0,this.axisX=t.x,this.axisY=t.y,this.list=[],this.score=0,this._addRandomValue(),this._addRandomValue()}return Object(i.a)(e,[{key:"_addRandomValue",value:function(){for(var e=this,t=[],a=function(a){for(var n=function(n){e.list.find(function(e){return e.x===a&&e.y===n})||t.push({x:a,y:n})},r=0;r<e.axisY;r++)n(r)},n=0;n<this.axisX;n++)a(n);if(t.length){var r=Math.floor(Math.random()*t.length);this.list.push(Object(W.a)({},t[r],{value:2,label:this._count,merge:!1})),this._count++}}},{key:"_mergeSameValue",value:function(e,t){for(var a=this,n={x:this.axisX,y:this.axisY},r=this.list.slice().filter(function(e){return!!e.value}).map(function(e){return Object(W.a)({},e,{double:!1})}),c=r.slice(),l="x"===e?"y":"x",o=!1,i=function(i){var s=c.filter(function(e){return e[l]===i}).sort(function(a,n){return(a[e]-n[e])*(t?-1:1)}),u=[];s.length&&(s.forEach(function(e,t){s[t+1]&&e.value===s[t+1].value&&u.every(function(e){return Math.abs(e-t)>1})&&u.push(t)}),u.forEach(function(e){s[e].value=2*s[e].value,s[e].double=!0,s[e+1].value=0,a.score=s[e].value+a.score}),s.filter(function(e){return e.value}).forEach(function(a,c){var i=a.label,s=a.value,u=r.findIndex(function(e){return e.label===i}),d=t?n[l]-c-1:c;u>-1&&r[u][e]!==d&&(r[u].value=s,r[u][e]=d,o=!0)}),s.filter(function(e){return!e.value}).forEach(function(a){var n=r.findIndex(function(e){return e.label===a.label}),c=r.filter(function(n){return(t?a[e]<n[e]:a[e]>n[e])&&n.value&&a[l]===n[l]&&n.double});c.length&&(r[n][e]=c[c.length-1][e],o=!0)}))},s=0;s<n[l];s++)i(s);this.list=r,o&&this._addRandomValue()}},{key:"move",value:function(e){switch(e){case 37:this._mergeSameValue("x",!1);break;case 38:this._mergeSameValue("y",!1);break;case 39:this._mergeSameValue("x",!0);break;case 40:this._mergeSameValue("y",!0)}}},{key:"check",value:function(){var e=this;return this.list.filter(function(e){return!!e.value}).length<this.axisY*this.axisX||this.list.some(function(t){var a=t.x,n=t.y,r=t.value;return!!e.list.filter(function(e){return(e.y===n&&e.x===a+1||e.x===a&&e.y===n+1)&&r===e.value}).length})}},{key:"restart",value:function(){this._count=0,this.score=0,this.list=[],this._addRandomValue(),this._addRandomValue()}}]),e}(),V={2:"#eee4da",4:"#ece0ca",8:"#f2b179",16:"#f59562",32:"#f57c5f",64:"#f75e3c",128:"#edce71",256:"#f1c967",512:"#ecc850",1024:"#efc53f",2048:"red"},z=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={animateClass:"zoomIn"},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e,t,a){this.props.double!==e.double&&this.setState({animateClass:this.props.double?"pulse":""})}},{key:"render",value:function(){var e=this.props,t=e.value,a=e.bound,n=e.x,c=e.y,l=this.state.animateClass,o={left:a*n+"px",top:a*c+"px",width:a-20,height:a-20,margin:10,position:"absolute",textAlign:"center",lineHeight:a-20+"px",backgroundColor:V[t]||"#ccc0b4",transition:"all 0.3s",zIndex:t?1:0};return console.log(l),r.a.createElement("div",{style:o,className:"animated "+l},t)}}]),t}(r.a.PureComponent),F=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={dis:0},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e,t,a){if(this.props.score!==e.score){var n=this.props.score-e.score;this.setState({dis:n})}}},{key:"render",value:function(){var e=this.props.score;this.state.dis;return r.a.createElement("div",{style:{backgroundColor:"rgb(204, 192, 180)",width:120,textAlign:"center",borderRadius:4,marginBottom:10}},r.a.createElement("span",{style:{color:"#eee4da"}},"SCORE:"),r.a.createElement("br",null),r.a.createElement("span",{style:{color:"#fff",fontSize:24}},e))}}]),t}(r.a.PureComponent),U=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={chessList:[],defeated:!1,score:0},a.chessStore=null,a.handleClickAgain=function(){a.chessStore.restart();var e=a.chessStore.list.slice();a.setState({defeated:!1,chessList:e})},a.handleKeyPress=function(e){if(e.keyCode>=37&&e.keyCode<=40){a.chessStore.move(e.keyCode);var t=a.chessStore.list.slice(),n=a.chessStore.score,r=!a.chessStore.check();r?a.setState({defeated:r,chessList:t,score:n}):a.setState({chessList:t,score:n})}},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=new N({x:4,y:4});this.chessStore=e,this.setState({chessList:e.list}),window.addEventListener("keydown",this.handleKeyPress)}},{key:"renderHeader",value:function(){var e=this.state.score;return r.a.createElement(F,{score:e})}},{key:"render",value:function(){var e=this.state,t=e.chessList,a=e.defeated,n={overflow:"hidden",background:"#bcaea1",width:480,height:480,position:"relative"},c={border:"10px solid #bcaea1",backgroundColor:"#ccc0b4",width:120,height:120,float:"left"},l={position:"absolute",width:n.width,height:n.height,zIndex:10,textAlign:"center",fontSize:60,fontWeight:"bold",background:"rgba(238, 228, 218, 0.5)"};return r.a.createElement("div",null,this.renderHeader(),r.a.createElement("div",{style:n},r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),r.a.createElement("div",{style:c}),t.map(function(e){var t=e.value,a=e.x,n=e.y,c=e.label,l=e.double;return r.a.createElement(z,{x:a,y:n,value:t,double:l,bound:120,key:c})}),a?r.a.createElement("div",{style:l},r.a.createElement("p",{style:{marginTop:120,marginBottom:0}},"GAME OVER!"),r.a.createElement(L.a,{ghost:!0,onClick:this.handleClickAgain},"TRY AGAIN")):null))}}]),t}(r.a.PureComponent),H=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(O,null,r.a.createElement(U,null))}}]),t}(r.a.PureComponent),B=y.a.Title,M=y.a.Paragraph,J=y.a.Text,X=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){new T.a("#codeTextArea",{language:"java",lineNumbers:!0,readonly:!0}).updateCode('android {\n    compileSdkVersion rootProject.ext.compileSdkVersion\n    buildToolsVersion rootProject.ext.buildToolsVersion\n    \n    defaultConfig {\n        minSdkVersion rootProject.ext.minSdkVersion\n        targetSdkVersion rootProject.ext.targetSdkVersion\n        versionCode 1\n        versionName "1.0"\n        ndk {\n            abiFilters "armeabi-v7a", "x86"\n        }\n    }')}},{key:"renderReactNativePit",value:function(){return r.a.createElement(M,null,r.a.createElement(B,{level:3},"React Native \u8e29\u5751"),r.a.createElement(x.a,null),r.a.createElement(J,null,"1.\xa0\xa0\u5728android5.1\u7684\u67d0\u4e9b\u8bbe\u5907\u4e0a\uff0cwebView\u5185\u5d4c\u663e\u793aweb\u9879\u76ee\u65f6\uff0c Array.prototype.findIndex\u4e3aundefined\u3002"),r.a.createElement("br",null),r.a.createElement(J,null,"2.\xa0\xa0\u5728\u4f7f\u7528F2\u56fe\u8868\u65f6\uff0c\u6a2a\u7ad6\u5c4f\u5207\u6362\u4e0d\u80fd\u66f4\u65b0\u66f2\u7ebf\u7684\u5bbd\u9ad8\uff0c\u9700\u8981\u5728\u76d1\u542c\u6a2a\u7ad6\u5207\u6362\u65f6\uff0c\u8c03\u5176ref\uff08\u5176\u5b9e\u5c31\u662f\u5bf9\u5e94webView\uff09\u4e2d\u7684injectJavaScript()\uff0cref.chart.current.injectJavaScript(chart.changeSize(width,height);)"),r.a.createElement("br",null),r.a.createElement(J,null,"3.\xa0\xa0\u5728Orientation\u76d1\u542c\u4e8b\u4ef6\u4e2d\u83b7\u53d6\u5bf9\u5e94\u7684\u8bbe\u5907\u7684\u5bbd\u9ad8\u4f1a\u6709\u5ef6\u8fdf\uff0c\u5bfc\u81f4\u66f4\u65b0\u7684\u65f6\u5019\u8ba1\u7b97\u5931\u8bef\uff0c\u9700\u8981\u63d0\u524d\u83b7\u53d6\u8bbe\u5907\u5bbd\u9ad8\u7136\u540e\u6839\u636e\u8bbe\u5907\u6a2a\u5411\u72b6\u6001\u6765\u8ba1\u7b97\u5bf9\u5e94\u5bbd\u9ad8\u3002"),r.a.createElement("br",null),r.a.createElement(J,null,"4.\xa0\xa0\u6dfb\u52a0act-native-orientation\u540e\u65e0\u6cd5\u6253\u5305\uff0c\u4e3b\u8981\u662fCompileSdkVersion\uff0cbuildToolsVersion\uff0cminSdkVersion\uff0ctargetSdkVersion\u914d\u7f6e\u51b2\u7a81\uff0c\u4fee\u6539node_modules/react-native-orientation/android/build.gradle"),r.a.createElement("br",null),r.a.createElement("div",{id:"codeTextArea",style:{width:"100%",height:300,position:"relative"}}))}},{key:"render",value:function(){var e=this.props.height;return r.a.createElement(O,{style:{height:e,overflow:"auto"}},r.a.createElement(y.a,null,r.a.createElement(B,{level:2},"\u8e29\u5751\u8bb0\u5f55"),this.renderReactNativePit()))}}]),t}(r.a.PureComponent),Y=(a(119),a(65)),G=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.style,a=void 0===t?{}:t,n=e.children,c=Object(W.a)({margin:"0 auto",width:792,padding:"0 ".concat(16,"px")},a);return r.a.createElement("div",{style:c},n)}}]),t}(r.a.PureComponent),K=a(58),q=a.n(K),Q=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleClickCard=function(){return a.props.onClick&&a.props.onClick()},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.title,a=e.detail,n=e.date,c=e.illustration,l=e.style,o=void 0===l?{}:l,i=Object(W.a)({height:140},o);return r.a.createElement("div",{onClick:this.handleClickCard,style:i,className:q.a.card+" animated fadeIn"},r.a.createElement("section",{style:{height:i.height},className:q.a.section},r.a.createElement("span",{className:q.a.title},t),r.a.createElement("br",null),r.a.createElement("small",{className:q.a.date},n),r.a.createElement("p",{className:q.a.detail},a)),r.a.createElement("img",{className:q.a.image,src:c}))}}]),t}(r.a.PureComponent),$=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this))).handleCheckDemo=function(e){return function(){return a.props.history.push(e)}},a.handleChangePagination=function(e){return a.setState({current:e})};var n=ce.filter(function(t){return t.catalogue===e.catalogue});return a.state={blogList:n,current:1,pageSize:10},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.blogList,n=t.current,c=t.pageSize,l=a.length,o=(n-1)*c,i=n*c,s=a.slice(o,i);return r.a.createElement("div",{style:{overflow:"auto",paddingBottom:20}},r.a.createElement(G,null,s.map(function(t,a){var n=t.title,c=t.path,l=t.brief,o=t.date,i=t.imageSrc;return r.a.createElement(Q,{key:a,title:n,detail:l,date:o,illustration:i,onClick:e.handleCheckDemo(c)},n)}),r.a.createElement(Y.a,{total:l,current:n,onChange:this.handleChangePagination})))}}]),t}(r.a.PureComponent),Z=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this))).handleCheckBlog=function(e){return function(){return a.props.history.push(e)}},a.handleChangePagination=function(e){return a.setState({current:e})};var n=ce.filter(function(t){return t.catalogue===e.catalogue});return a.state={blogList:n,current:1,pageSize:10},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.blogList,n=t.current,c=t.pageSize,l=a.length,o=(n-1)*c,i=n*c,s=a.slice(o,i);return r.a.createElement("div",{style:{overflow:"auto",paddingBottom:20}},r.a.createElement(G,null,s.map(function(t,a){var n=t.title,c=t.path,l=t.brief,o=t.date,i=t.imageSrc;return r.a.createElement(Q,{key:a,title:n,detail:l,date:o,illustration:i,onClick:e.handleCheckBlog(c)},n)}),r.a.createElement(Y.a,{total:l,current:n,onChange:this.handleChangePagination})))}}]),t}(r.a.PureComponent),ee=y.a.Title,te=y.a.Paragraph,ae=y.a.Text,ne=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e={language:"javascript",lineNumbers:!0,readonly:!0},t=new T.a("#codeTextArea",e),a=new T.a("#codeTextArea2",e),n=new T.a("#codeTextArea3",e),r=new T.a("#codeTextArea4",e);t.updateCode("export const dataURL2Blob = base64Data => {\nlet byteString = ''\nif (base64Data.split(',')[0].indexOf('base64') >= 0) {\n  byteString = window.atob(base64Data.split(',')[1])\n} else {\n  byteString = unescape(base64Data.split(',')[1])\n}\nconst mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]\nlet ia = new Uint8Array(byteString.length)\nfor (let i = 0; i < byteString.length; i++) {\n  ia[i] = byteString.charCodeAt(i)\n}\nreturn new Blob([ia], {\n  type: mimeString\n})"),a.updateCode("const file = new File([blob], '\u622a\u56fe.png', { type: 'image/png' })\nconst formData = new FormData()\nformData.append('file', file)\nformData.append('xxxxxxx', id)\nformData.append('xxxxxxx', 100)"),n.updateCode("const axiso = axios.create({headers: {'Content-Type':'multipart/form-data'}})\naxiso.defaults.headers.common['token'] = \u2018xxxxx\u2019\naxiso.post(`/xxxxx/upload`, formData)"),r.updateCode("import html2canvas from 'html2canvas'\n  const getScreenshot = (dom, name, options) => {\n  let canvas = document.createElement('canvas')\n  const width = dom.clientWidth\n  const height = dom.clientHeight\n  const scale = 1 // canvas\u653e\u5927\u500d\u6570\uff0c\u500d\u6570\u8d8a\u9ad8\u6e05\u6670\u5ea6\u8d8a\u9ad8\n  canvas.width = width * scale\n  canvas.height = height * scale\n  canvas.style.width = dom.clientWidth * scale + 'px'\n  canvas.style.height = dom.clientHeight * scale + 'px'\n  const ctx = canvas.getContext('2d')\n  ctx.scale(scale, scale)\n  // \u53bb\u6389\u952f\u9f7f\n  ctx.webkitImageSmoothingEnabled = false\n  ctx.mozImageSmoothingEnabled = false\n  ctx.imageSmoothingEnabled = false\n  const defaultOptions = {\n    canvas,\n    scale,\n    width,\n    height,\n    onrendered: canvas => {}\n  }\n  const distOptions = {...defaultOptions, ...options}\n  return html2canvas(dom, distOptions)\n}\n  getScreenshot(this.screenshotDom, '\u622a\u56fe', { useCORS: true, logging: true }).then((canvas) => {\n      const dataURL = canvas.toDataURL('image/png')\n      const blob = dataURL2Blob(dataURL)\n      // const a = document.createElement('a')\n      // const url = window.URL.createObjectURL(blob)\n      // a.href = url\n      // a.download = `\u622a\u56fe.png`\n      // a.click()\n      // window.URL.revokeObjectURL(url)\n\n      const file = new File([blob], '\u622a\u56fe.png', { type: 'image/png' })\n      const axiso = axios.create({ headers: { 'Content-Type': 'multipart/form-data' }, })\n      const formData = new FormData()\n      axiso.defaults.headers.common['token'] = 'xxxxxxxxxxxxxxxxx'\n      formData.append('file', file)\n      //......\n      formData.append('xxxx', xxxx)\n      axiso.post(xxxxxxxx, formData)\n    })")}},{key:"renderReactNativePit",value:function(){return r.a.createElement(te,null,r.a.createElement(x.a,null),r.a.createElement(te,null,"\xa0\xa0\xa0\xa0\u5728\u4f7f\u7528ant\u7ec4\u4ef6\u4e0a\u4f20\u6587\u4ef6\u7684\u65f6\u5019\uff0c\u4f1a\u83b7\u53d6\u5230\u4e0a\u4f20\u6587\u4ef6\u7684\u4e8c\u8fdb\u5236\u6587\u4ef6\uff0c\u7136\u540e\u5e76\u4e14\u4f20\u9012\u53c2\u6570\u5230\u540e\u7aef\uff0c\u5b9e\u73b0\u4e0a\u4f20\u64cd\u4f5c\u3002\u4f46\u662f\u4f7f\u7528html2canvas\u5b9e\u73b0\u622a\u56fe\u4e0a\u4f20\u65f6\uff0c\u6ca1\u6709\u4f7f\u7528\u6d4f\u89c8\u5668\u81ea\u5e26\u7684\u9009\u62e9\u6587\u4ef6\u6b65\u9aa4\uff0c\u5219\u9700\u8981\u76f4\u63a5\u83b7\u53d6\u5230\u4e8c\u8fdb\u5236\u6587\u4ef6\uff0c\u5e76\u4e14\u7ec4\u7ec7FormData\u7136\u540e\u518d\u901a\u8fc7AJAX\u8bf7\u6c42\u53d1\u9001\u5230\u540e\u7aef\u3002\u5b9e\u73b0\u622a\u56fe\u4e0a\u4f20\u7684\u529f\u80fd\u3002"),r.a.createElement("br",null),r.a.createElement(te,null,r.a.createElement(ae,null,"1.\xa0\xa0\u751f\u6210\u622a\u56fe"),r.a.createElement("br",null),r.a.createElement(ae,null,"\u4f7f\u7528html2canvas\u751f\u6210\u622a\u56fe\uff0chtml2canvas(dom,config).then(canvas=>canvas.toDataURL(\u2018image/png\u2019))\u83b7\u53d6\u5230\u4e3aPNG\u7684\u622a\u56fe\u6587\u4ef6"),r.a.createElement("br",null)),r.a.createElement(te,null,r.a.createElement(ae,null,"2.\xa0\xa0\u8f6c\u6210Blob\u6587\u4ef6"),r.a.createElement("br",null),r.a.createElement(ae,null,"\u7f51\u4e0a\u67e5\u9605\u8f6cblob\u5bf9\u8c61\u65b9\u6cd5"),r.a.createElement("br",null),r.a.createElement("div",{id:"codeTextArea",style:{width:"100%",height:340,position:"relative"}})),r.a.createElement(te,null,r.a.createElement(ae,null,"3.\xa0\xa0\u51c6\u5907formData"),r.a.createElement("br",null),r.a.createElement("div",{id:"codeTextArea2",style:{width:"100%",height:140,position:"relative"}})),r.a.createElement(te,null,r.a.createElement(ae,null,"4.\xa0\xa0\u4e0a\u4f20\u6587\u4ef6"),r.a.createElement("br",null),r.a.createElement(ae,null,"\u4f7f\u7528axios\u5c01\u88c5ajax\u8bf7\u6c42"),r.a.createElement("br",null),r.a.createElement("div",{id:"codeTextArea3",style:{width:"100%",height:80,position:"relative"}})),r.a.createElement(te,null,r.a.createElement(ae,null,"5.\xa0\xa0\u9879\u76ee\u5e94\u7528"),r.a.createElement("br",null),r.a.createElement("div",{id:"codeTextArea4",style:{width:"100%",height:360,position:"relative"}})))}},{key:"render",value:function(){var e=this.props.height;return r.a.createElement(O,{style:{height:e,overflow:"auto"}},r.a.createElement(y.a,null,r.a.createElement(ee,{level:2},"\u622a\u5c4f\u4e0a\u4f20"),this.renderReactNativePit()))}}]),t}(r.a.PureComponent),re=[{path:"".concat("/blog","/"),text:"\u4e3b\u9875",component:v,exact:!0},{path:"".concat("/blog","/home"),text:"\u4e3b\u9875",component:v,exact:!0},{path:"".concat("/blog","/blog"),text:"\u535a\u5ba2\u5217\u8868",component:Z,exact:!0,catalogue:"blog"},{path:"".concat("/blog","/blog/websocket"),text:"websocket\u4f7f\u7528",component:I,exact:!0},{path:"".concat("/blog","/blog/record"),text:"\u91c7\u5751\u8bb0\u5f55",component:X,exact:!0},{path:"".concat("/blog","/blog/screenshot"),text:"\u622a\u5c4f\u5b9e\u73b0",component:ne,exact:!0},{path:"".concat("/blog","/demo"),text:"\u6f14\u793a\u5217\u8868",component:$,exact:!0,catalogue:"demo"},{path:"".concat("/blog","/demo/game2048"),text:"2048\u5c0f\u6e38\u620f",component:H,exact:!0}],ce=[{catalogue:"blog",title:"websocket\u7684\u4f7f\u7528",path:"".concat("/blog","/blog/websocket"),brief:"WebSocket \u662f HTML5 \u5f00\u59cb\u63d0\u4f9b\u7684\u4e00\u79cd\u5728\u5355\u4e2a TCP \u8fde\u63a5\u4e0a\u8fdb\u884c\u5168\u53cc\u5de5\u901a\u8baf\u7684\u534f\u8bae\u3002WebSocket \u4f7f\u5f97\u5ba2\u6237\u7aef\u548c\u670d\u52a1\u5668\u4e4b\u95f4\u7684\u6570\u636e\u4ea4\u6362\u53d8\u5f97\u66f4\u52a0\u7b80\u5355\uff0c\u5141\u8bb8\u670d\u52a1\u7aef\u4e3b\u52a8\u5411\u5ba2\u6237\u7aef\u63a8\u9001\u6570\u636e\u3002\u5728 WebSocket API \u4e2d\uff0c\u6d4f\u89c8\u5668\u548c\u670d\u52a1\u5668\u53ea\u9700\u8981\u5b8c\u6210\u4e00\u6b21\u63e1\u624b... ",date:" 6 Jul , 2019",imageSrc:j},{catalogue:"blog",title:"React Native\u8e29\u5751\u8bb0\u5f55",path:"".concat("/blog","/blog/record"),brief:"\u5728react-native\u9879\u76ee\u4e2d\u53d1\u73b0\u7684\u5751\u53ca\u89e3\u51b3\u529e\u6cd5\u3002\u6301\u7eed\u8bb0\u5f55...",date:"8 Oct, 2019",imageSrc:S},{catalogue:"blog",title:"html2canvas\u751f\u6210\u622a\u56fe\u5e76\u4e0a\u4f20",path:"".concat("/blog","/blog/screenshot"),brief:"\u5728\u9879\u76ee\u4e2d\u8981\u81ea\u52a8\u751f\u6210\u622a\u56fe\u5e76\u4e0a\u4f20\u4f5c\u4e3a\u6a21\u5757\u7684\u5c01\u9762\uff0c\u8bb0\u5f55\u4e00\u4e0b\u5b9e\u73b0\u65f6\u9047\u89c1\u7684\u95ee\u9898\u3002",date:"22 Oct, 2019",imageSrc:P},{catalogue:"demo",title:"2048\u5c0f\u6e38\u620f",path:"".concat("/blog","/demo/game2048"),brief:"\u5b9e\u73b0React\u4e0b2048\u6e38\u620f\u7684\u5f00\u53d1\uff0c\u4f7f\u7528\u4e00\u7ef4\u6570\u7ec4\u6765\u5b9e\u73b0\u6570\u636e\u7684\u5408\u5e76\u8ba1\u7b97\u7b49\u3002",date:"21 Jul, 2019",imageSrc:C}],le=(a(340),a(10).a.createFromIconfontCN({scriptUrl:"//at.alicdn.com/t/font_1286037_s8te0szqzgn.js"})),oe=f.b.SubMenu,ie=f.b.Item,se=b.a.Header,ue=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,c=new Array(n),l=0;l<n;l++)c[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={},a.renderMenuNode=function(e){return e.map(function(e){var t=e.children,n=e.title,c=e.icon,l=e.path;return t?r.a.createElement(oe,{key:n,title:r.a.createElement("span",null,r.a.createElement(le,{type:c}),r.a.createElement("span",null,n))},a.renderMenuNode(t)):r.a.createElement(ie,{key:l},r.a.createElement(g.a,{to:{pathname:l}},n))})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"renderHeader",value:function(){var e={height:52,lineHeight:"52px",backgroundColor:"#FFF"},t={width:792,margin:"0 auto",paddingLeft:16,paddingRight:16},a={margin:"0 16px"};return r.a.createElement(se,{style:e},r.a.createElement("div",{style:t},r.a.createElement(p.a,{size:32,icon:"user"}),r.a.createElement(g.a,{style:a,to:"".concat("/blog","/blog")},"\u535a\u5ba2"),r.a.createElement(g.a,{style:a,to:"".concat("/blog","/demo")},"Demo")))}},{key:"renderContent",value:function(){var e=re.map(function(e){return r.a.createElement(m.b,{key:e.path,path:e.path,exact:e.exact,render:function(t){return r.a.createElement(e.component,Object.assign({catalogue:e.catalogue},t))}})});return r.a.createElement(m.d,null,e,r.a.createElement(m.a,{to:"notFound"}))}},{key:"render",value:function(){return r.a.createElement(b.a,{className:"height1",style:{backgroundColor:"#f6f6f6"}},this.renderHeader(),this.renderContent())}}]),t}(n.Component),de=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"\u9875\u9762\u8d70\u4e22\u4e86\u3002\u3002\u3002")}}]),t}(r.a.PureComponent),me=Object(h.a)(),he=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(m.c,{history:me},r.a.createElement(m.d,null,r.a.createElement(m.d,null,r.a.createElement(m.b,{exact:!0,component:ue}),r.a.createElement(m.b,{path:"/notFound",component:de}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(344),a(345),a(346),a(347);l.a.render(r.a.createElement(he,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},58:function(e,t,a){e.exports={card:"Card_card__1QSkW",section:"Card_section__2imkg",title:"Card_title__2X9sT",detail:"Card_detail__1jPte",date:"Card_date__2Wlz2",image:"Card_image__3BHFt"}}},[[170,1,2]]]);
//# sourceMappingURL=main.5669b6f6.chunk.js.map