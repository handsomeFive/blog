/**
 * @file: 踩坑记录
 */
import React from 'react'
import { Divider, Typography } from 'antd'
import Article from '../../../../component/Article'
import Codeflask from 'codeflask'

const {Title, Paragraph, Text} = Typography

export default class Record extends React.PureComponent {

  componentDidMount () {
    const option = {language: 'java', lineNumbers: true, readonly: true}
    const flask = new Codeflask('#codeTextArea', option)
    const code = `android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion
    
    defaultConfig {
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }`
    flask.updateCode(code)
  }

  renderReactNativePit () {
    return <Paragraph>
      <Title level={3}>React Native 踩坑</Title>
      <Divider/>
      <Text>1.&nbsp;&nbsp;在android5.1的某些设备上，webView内嵌显示web项目时， Array.prototype.findIndex为undefined。</Text><br/>
      <Text>2.&nbsp;&nbsp;在使用F2图表时，横竖屏切换不能更新曲线的宽高，需要在监听横竖切换时，调其ref（其实就是对应webView）中的injectJavaScript()，ref.chart.current.injectJavaScript(chart.changeSize(width,height);)</Text><br/>
      <Text>3.&nbsp;&nbsp;在Orientation监听事件中获取对应的设备的宽高会有延迟，导致更新的时候计算失误，需要提前获取设备宽高然后根据设备横向状态来计算对应宽高。</Text><br/>
      <Text>4.&nbsp;&nbsp;添加act-native-orientation后无法打包，主要是CompileSdkVersion，buildToolsVersion，minSdkVersion，targetSdkVersion配置冲突，修改node_modules/react-native-orientation/android/build.gradle</Text><br/>
      <div id={'codeTextArea'} style={{width: '100%', height: 300, position: 'relative'}}/>
    </Paragraph>

  }

  render () {
    const {height} = this.props

    return <Article style={{height, overflow: 'auto'}}>
      <Typography>
        <Title level={2}>踩坑记录</Title>
        {this.renderReactNativePit()}
      </Typography>
    </Article>
  }
}
