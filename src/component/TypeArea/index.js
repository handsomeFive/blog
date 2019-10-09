/**
 * @file: 版心组件 ,内容需要在此组件下开发
 */
import React from 'react'
import { V_LAYOUT_AREA_GAP, V_LAYOUT_TYPE_AREA } from '../../constants/global'

export default class TypeArea extends React.PureComponent {
  render () {
    const {style = {}, children} = this.props
    const typeAreaStyle = {
      margin: '0 auto',
      width: V_LAYOUT_TYPE_AREA,
      padding: `0 ${V_LAYOUT_AREA_GAP}px`,
      ...style
    }
    return <div style={typeAreaStyle}>{children}</div>
  }
}
