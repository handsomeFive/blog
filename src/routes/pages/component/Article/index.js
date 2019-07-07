import React from 'react'
import Styles from './index.module.css'

export default class Article extends React.PureComponent {
    render () {

        return <div { ...this.props }>
            <div className={ Styles.article_body }>
                { this.props.children }
            </div>
        </div>
    }
}