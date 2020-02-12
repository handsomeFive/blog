import React from 'react'
import { Button } from 'antd'
import Article from '../../../../component/Article'
import Point from "./Point";

const WIDTH = 600;
const HEIGHT = 400;
const STEP = 5;
const INITIAL_SNACK_LENGTH = 4;

const STATUS_LIST = ['未开始', '暂停', '进行中', '失败', '通关'];

export default class Snake extends React.PureComponent {

    constructor ( props )
    {
        super(props);
        const xMax = WIDTH / STEP;
        const yMax = HEIGHT / STEP;
        this.state = { xMax, yMax, snake: [], prey: null, state: 0, direction: 0 }; //direction: 0-left 1-right 2-top 4-bottom
        this.cxt = null;
        this.timer = null;
    }

    componentDidMount ()
    {
        const canvas = document.getElementById('canvas');
        this.cxt = canvas.getContext('2d'); // 获取canvas元素
        this.cxt.lineWidth = STEP;
    }

    handleShiftState = () => {
        const state = this.state.state;
        if (state === 0) { // 开始游戏
            this.setState({ state: 2 });
            this.handleStartGame()
        }
    };

    handleStartGame = () => { // 开始游戏 即 画蛇
        const snake = [];
        const { xMax, yMax, direction } = this.state;
        const startX = Math.ceil(xMax / 2 - Math.random() * 5);
        const startY = Math.ceil(yMax / 2 - Math.random() * 5);
        snake.push(new Point({ XAxis: startX, YAxis: startY }));
        for ( let i = 1; i < INITIAL_SNACK_LENGTH; i++ ) {
            const { XAxis, YAxis } = snake[i - 1];
            const array = [0, 1, 2, 3];
            if (i === 1) {
                const index = array.indexOf(direction);
                array.splice(index, 1)
            }
            const point = this.getRandomPoint(XAxis, YAxis, array[Math.floor(Math.random() * array.length)]);
            snake.push(new Point(point))
        }
        this.setState({ snake }, () => {
            this.drawSnake(snake);
            this.startMoveSnake()
        })
    };

    getRandomPoint ( XAxis, YAxis, direction ) // 随机产生点
    {
        switch ( direction ) {
            case 0:
                return { XAxis: XAxis + 1, YAxis };
            case 1:
                return { XAxis: XAxis - 1, YAxis };
            case 2:
                return { XAxis, YAxis: YAxis - 1 };
            case 3:
                return { XAxis, YAxis: YAxis + 1 };
        }
    }


    drawSnake = () => {
        this.cxt.clearRect(0, 0, WIDTH, HEIGHT);
        this.state.snake.forEach(( { XAxis, YAxis }, index ) => {
            if (index === 0) {
                this.cxt.beginPath();
                this.cxt.moveTo(XAxis * STEP, YAxis * STEP);
            } else if (index === this.state.snake.length) {
                this.cxt.closePath();
            } else {
                this.cxt.lineTo(XAxis * STEP, YAxis * STEP);
            }
        });
        this.cxt.stroke();
        window.requestAnimationFrame(this.drawSnake);
    };

    startMoveSnake = () => {
        this.timer = window.setInterval(() => {
            const { snake, direction } = this.state;
            const newSnake = snake.map(( point, index ) => {
                if (index === 0) {
                    return new Point(this.getRandomPoint(point.XAxis, point.YAxis, direction))
                } else {
                    return snake[index - 1]
                }
            });
            this.setState({ snake: newSnake }, this.drawSnake)
        }, 1000)
    };


    render ()
    {
        const { state } = this.state;
        const canvasStyle = { border: '1px solid ' };
        return <Article>
            <Button onClick={ this.handleShiftState }>{ STATUS_LIST[state] }</Button>
            <canvas id='canvas' width={ WIDTH } height={ HEIGHT } style={ canvasStyle }/>
        </Article>

    }
}