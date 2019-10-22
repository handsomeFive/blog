/**
 * @file: 踩坑记录
 */
import React from 'react'
import { Divider, Typography } from 'antd'
import Article from '../../../../component/Article'
import Codeflask from 'codeflask'

const {Title, Paragraph, Text} = Typography

export default class Screenshot extends React.PureComponent {

  componentDidMount () {
    const option = {language: 'javascript', lineNumbers: true, readonly: true}
    const flask = new Codeflask('#codeTextArea', option)
    const flask2 = new Codeflask('#codeTextArea2', option)
    const flask3 = new Codeflask('#codeTextArea3', option)
    const flask4 = new Codeflask('#codeTextArea4', option)
    const code = `export const dataURL2Blob = base64Data => {\nlet byteString = ''\nif (base64Data.split(',')[0].indexOf('base64') >= 0) {\n  byteString = window.atob(base64Data.split(',')[1])\n} else {\n  byteString = unescape(base64Data.split(',')[1])\n}\nconst mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]\nlet ia = new Uint8Array(byteString.length)\nfor (let i = 0; i < byteString.length; i++) {\n  ia[i] = byteString.charCodeAt(i)\n}\nreturn new Blob([ia], {\n  type: mimeString\n})`
    const code2 = `const file = new File([blob], '截图.png', { type: 'image/png' })\nconst formData = new FormData()\nformData.append('file', file)\nformData.append('xxxxxxx', id)\nformData.append('xxxxxxx', 100)`
    const code3 = `const axiso = axios.create({headers: {'Content-Type':'multipart/form-data'}})\naxiso.defaults.headers.common['token'] = ‘xxxxx’\naxiso.post(\`/xxxxx/upload\`, formData)`
    const code4 = `import html2canvas from 'html2canvas'
  const getScreenshot = (dom, name, options) => {
  let canvas = document.createElement('canvas')
  const width = dom.clientWidth
  const height = dom.clientHeight
  const scale = 1 // canvas放大倍数，倍数越高清晰度越高
  canvas.width = width * scale
  canvas.height = height * scale
  canvas.style.width = dom.clientWidth * scale + 'px'
  canvas.style.height = dom.clientHeight * scale + 'px'
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)
  // 去掉锯齿
  ctx.webkitImageSmoothingEnabled = false
  ctx.mozImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false
  const defaultOptions = {
    canvas,
    scale,
    width,
    height,
    onrendered: canvas => {}
  }
  const distOptions = {...defaultOptions, ...options}
  return html2canvas(dom, distOptions)
}
  getScreenshot(this.screenshotDom, '截图', { useCORS: true, logging: true }).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png')
      const blob = dataURL2Blob(dataURL)
      // const a = document.createElement('a')
      // const url = window.URL.createObjectURL(blob)
      // a.href = url
      // a.download = \`截图.png\`
      // a.click()
      // window.URL.revokeObjectURL(url)

      const file = new File([blob], '截图.png', { type: 'image/png' })
      const axiso = axios.create({ headers: { 'Content-Type': 'multipart/form-data' }, })
      const formData = new FormData()
      axiso.defaults.headers.common['token'] = 'xxxxxxxxxxxxxxxxx'
      formData.append('file', file)
      //......
      formData.append('xxxx', xxxx)
      axiso.post(xxxxxxxx, formData)
    })`
    flask.updateCode(code)
    flask2.updateCode(code2)
    flask3.updateCode(code3)
    flask4.updateCode(code4)
  }

  renderReactNativePit () {
    return <Paragraph>
      <Divider/>
      <Paragraph>&nbsp;&nbsp;&nbsp;&nbsp;在使用ant组件上传文件的时候，会获取到上传文件的二进制文件，然后并且传递参数到后端，实现上传操作。但是使用html2canvas实现截图上传时，没有使用浏览器自带的选择文件步骤，则需要直接获取到二进制文件，并且组织FormData然后再通过AJAX请求发送到后端。实现截图上传的功能。</Paragraph><br/>
      <Paragraph>
        <Text>1.&nbsp;&nbsp;生成截图</Text><br/>
        <Text>使用html2canvas生成截图，html2canvas(dom,config).then(canvas=>canvas.toDataURL(‘image/png’))获取到为PNG的截图文件</Text><br/>
      </Paragraph>
      <Paragraph>
        <Text>2.&nbsp;&nbsp;转成Blob文件</Text><br/>
        <Text>网上查阅转blob对象方法</Text><br/>
        <div id={'codeTextArea'} style={{width: '100%', height: 340, position: 'relative'}}/>
      </Paragraph>
      <Paragraph>
        <Text>3.&nbsp;&nbsp;准备formData</Text><br/>
        <div id={'codeTextArea2'} style={{width: '100%', height: 140, position: 'relative'}}/>
      </Paragraph>
      <Paragraph>
        <Text>4.&nbsp;&nbsp;上传文件</Text><br/>
        <Text>使用axios封装ajax请求</Text><br/>
        <div id={'codeTextArea3'} style={{width: '100%', height: 80, position: 'relative'}}/>
      </Paragraph>
      <Paragraph>
        <Text>5.&nbsp;&nbsp;项目应用</Text><br/>
        <div id={'codeTextArea4'} style={{width: '100%', height: 360, position: 'relative'}}/>
      </Paragraph>
    </Paragraph>

  }

  render () {
    const {height} = this.props

    return <Article style={{height, overflow: 'auto'}}>
      <Typography>
        <Title level={2}>截屏上传</Title>
        {this.renderReactNativePit()}
      </Typography>
    </Article>
  }
}
