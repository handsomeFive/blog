/**
 * @file: 棋盘
 */

import React from 'react'
import { ChessStore } from "./chessStore";
import Chess from "./Chess";
import { Button } from "antd";
import ScoreBoard from "./ScoreBoard";

const SIZE = 4
const Bound = 120

export default class Chessboard extends React.PureComponent {

    state = { chessList: [], defeated: false, score: 0 }

    chessStore = null

    componentDidMount ()
    {
        const chessStore = new ChessStore({ x: SIZE, y: SIZE })
        this.chessStore = chessStore
        this.setState({ chessList: chessStore.list })
        window.addEventListener('keydown', this.handleKeyPress)
    }

    handleClickAgain = () => {
        this.chessStore.restart()
        const chessList = this.chessStore.list.slice()
        this.setState({ defeated: false, chessList })
    }

    handleKeyPress = ( event ) => {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            this.chessStore.move(event.keyCode)
            const chessList = this.chessStore.list.slice()
            const score = this.chessStore.score
            const defeated = !this.chessStore.check()
            if (defeated) {
                this.setState({ defeated, chessList, score })
            } else {
                this.setState({ chessList, score })
            }
        }
    }

    renderHeader ()
    {
        const { score } = this.state
        return <ScoreBoard score={score}/>
    }

    render ()
    {
        const { chessList, defeated } = this.state
        const boardStyle = {
            overflow  : 'hidden',
            background: '#bcaea1',
            width     : Bound * SIZE,
            height    : Bound * SIZE,
            position  : 'relative',
        }
        const emptyBoxStyle = {
            border         : '10px solid #bcaea1',
            backgroundColor: '#ccc0b4',
            width          : Bound,
            height         : Bound,
            float          : 'left'
        }
        const gameOverStyle = {
            position  : 'absolute',
            width     : boardStyle.width,
            height    : boardStyle.height,
            zIndex    : 10,
            textAlign : 'center',
            fontSize  : 60,
            fontWeight: 'bold',
            background: 'rgba(238, 228, 218, 0.5)'
        }
        const gameOverTextStyle = {
            marginTop   : 120,
            marginBottom: 0
        }

        return <div>
            { this.renderHeader() }
            <div style={ boardStyle }>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                <div style={ emptyBoxStyle }/>
                { chessList.map(( { value, x, y, label, double } ) => <Chess x={ x }
                                                                             y={ y }
                                                                             value={ value }
                                                                             double={ double }
                                                                             bound={ Bound }
                                                                             key={ label }/>) }
                { defeated ? <div style={ gameOverStyle }>
                    <p style={ gameOverTextStyle }>GAME OVER!</p>
                    <Button ghost onClick={ this.handleClickAgain }>TRY AGAIN</Button>
                </div> : null }
            </div>
        </div>
    }
}