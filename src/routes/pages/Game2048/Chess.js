/**
 * @file: 棋子
 */
import React from 'react'

const COLOR_ENUM = { //棋子颜色
    '2'   : '#eee4da',
    '4'   : '#ece0ca',
    '8'   : '#f2b179',
    '16'  : '#f59562',
    '32'  : '#f57c5f',
    '64'  : '#f75e3c',
    '128' : '#edce71',
    '256' : '#f1c967',
    '512' : '#ecc850',
    '1024': '#efc53f',
    '2048': 'red',
}


export default class Chess extends React.PureComponent {


    state = { animateClass: 'animated pulse' }

    componentDidMount ()
    {
        // this.setState({ animateClass: '' })
    }

    componentDidUpdate ( prevProps, prevState, snapshot )
    {
        if (this.props.value !== prevProps.value) { //
            this.setState({ animateClass: 'animated pulse' })
        }
    }

    render ()
    {
        const { value, bound, x, y } = this.props
        const { animateClass } = this.state
        const bgColor = COLOR_ENUM[value] || '#ccc0b4'
        const style = {
            left           : bound * x + "px",
            top            : bound * y + "px",
            width          : bound - 20,
            height         : bound - 20,
            margin         : 10,
            position       : 'absolute',
            textAlign      : 'center',
            lineHeight     : bound - 20 + 'px',
            backgroundColor: bgColor,
            transition     : 'all 0.3s'
        }

        return <div style={ style } className={ animateClass }>
            { value }
        </div>
    }
}