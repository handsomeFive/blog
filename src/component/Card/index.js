import React from 'react'
import Styles from './index.module.css'

export default class Card extends React.PureComponent {

  handleClickCard = () => this.props.onClick && this.props.onClick()

  render () {
    const {title, detail, date, illustration, style = {}} = this.props
    const cardStyle = {height: 140, ...style}

    return <div onClick={this.handleClickCard} style={cardStyle} className={Styles.card + ' animated fadeIn'}>
      <section style={{height: cardStyle.height}} className={Styles.section}>
        <span className={Styles.title}>{title}</span>
        <br/>
        <small className={Styles.date}>{date}</small>
        <p className={Styles.detail}>{detail}</p>
      </section>
      <img className={Styles.image} src={illustration}/>
    </div>
  }
}
