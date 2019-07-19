/**
 * @file: 棋盘
 */

import React from 'react'
import { ChessStore } from "./chessStore";
import Chess from "./Chess";

const SIZE = 4
const Bound = 120

export default class Chessboard extends React.PureComponent {

    state = { chessList: [] }

    chessStore = null

    componentDidMount ()
    {
        const chessStore = new ChessStore({ x: SIZE, y: SIZE })
        this.chessStore = chessStore
        this.setState({ chessList: chessStore.list })
        window.addEventListener('keydown', this.handleKeyPress)
    }

    handleKeyPress = ( event ) => {
        if (this.chessStore.check()) {
            this.chessStore.move(event.keyCode)
            const chessList = this.chessStore.list.slice()
            this.setState({ chessList })
        } else {
            alert('你不能再移动了')
        }
    }

    render ()
    {
        const { chessList } = this.state
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

        return <div style={ boardStyle }>
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
            { chessList.map(( { value, x, y, label } ) => <Chess x={ x }
                                                                 y={ y }
                                                                 value={ value }
                                                                 bound={ Bound }
                                                                 key={ label }/>) }
        </div>
    }
}