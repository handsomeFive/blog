import React from 'react'
import { Pagination } from 'antd'
import TypeArea from '../../../../component/TypeArea'
import { routesList } from '../../../../constants/routes'
import Card from '../../../../component/Card'

export default class DemoList extends React.PureComponent {

  constructor (props) {
    super()
    const blogList = routesList.filter(item => item.catalogue === props.catalogue)
    this.state = {blogList, current: 1, pageSize: 10}
  }

  handleCheckDemo = (path) => () => this.props.history.push(path)

  handleChangePagination = (page) => this.setState({current: page})

  render () {
    const {blogList, current, pageSize} = this.state
    const total = blogList.length
    const start = (current - 1) * pageSize
    const end = current * pageSize
    const currentList = blogList.slice(start, end) // 计算分页
    return <div style={{overflow: 'auto', paddingBottom: 20}}><TypeArea>
      {currentList.map((item, index) => {
        const {title, path, brief, date, imageSrc} = item
        return <Card key={index}
                     title={title}
                     detail={brief}
                     date={date}
                     illustration={imageSrc}
                     onClick={this.handleCheckDemo(path)}>
          {title}
        </Card>
      })}
      <Pagination total={total} current={current} onChange={this.handleChangePagination}/>
    </TypeArea>
    </div>
  }
}

