import React from 'react'

export default class ScoreBoard extends React.PureComponent {


    state = { dis: 0 }

    componentDidUpdate ( prevProps, prevState, snapshot )
    {
        if (this.props.score !== prevProps.score) {
            const dis = this.props.score - prevProps.score
            this.setState({ dis })
        }
    }

    render ()
    {
        const { score } = this.props
        const { dis } = this.state
        const style = {
            backgroundColor: 'rgb(204, 192, 180)',
            width          : 120,
            textAlign      : 'center',
            borderRadius   : 4,
            marginBottom   : 10,
        }
        return <div style={ style }>
            <span style={ { color: '#eee4da' } }>SCORE:</span>
            <br/>
            <span style={ { color: '#fff', fontSize: 24, } }>{ score }</span>
            {/*<span className={ 'animated fadeoutUp' }*/}
            {/*      style={ { position: 'absolute' } }>{ '+' + dis }</span>*/}
        </div>
    }
}
