import React from 'react'
import { Button } from 'antd'
import Article from '../../../../component/Article'
import Point from "./Point";
import _ from 'lodash'

const WIDTH = 600;
const HEIGHT = 400;
const STEP = 20;
const INITIAL_SNACK_LENGTH = 4;

const STATUS_LIST = ['未开始', '暂停', '进行中', '失败', '通关'];

export default class Snake extends React.PureComponent {

    constructor ( props )
    {
        super(props);
        const xMax = WIDTH / STEP;
        const yMax = HEIGHT / STEP;
        this.state = { xMax, yMax, snake: [], prey: null, state: 0 };
        this.direction = 0; //direction: 0-left 1-right 2-top 3-bottom
        this.cxt = null;
        this.snake = [];
        this.timer = null;
    }

    componentDidMount ()
    {
        const canvas = document.getElementById('canvas');
        this.cxt = canvas.getContext('2d'); // 获取canvas元素
        this.cxt.lineWidth = STEP;
        window.addEventListener('keydown', ( event ) => {
            switch ( event.keyCode ) {
                case 38: // up
                    if (this.direction !== 3) {
                        this.direction = 2;
                    }
                    break;
                case 39: // left
                    if (this.direction !== 1) {
                        this.direction = 0;
                    }
                    break;
                case 40: // down
                    if (this.direction !== 2) {
                        this.direction = 3;
                    }
                    break;
                case 37: // right
                    if (this.direction !== 0) {
                        this.direction = 1;
                    }
                    break;
            }
        })
    }

    componentWillUnmount ()
    {
        window.removeEventListener('keydown', () => {
        })
    }

    handleShiftState = () => { // 点击按钮控制游戏进程
        const state = this.state.state;
        if (state === 0) { // 开始游戏
            this.setState({ state: 2 }, this.handleStartGame);
        }
    };

    handleStartGame = () => { // 开始游戏 即 画蛇
        const snake = [];
        const { xMax, yMax } = this.state;
        const startX = Math.ceil(xMax / 2 - Math.random() * 5);
        const startY = Math.ceil(yMax / 2 - Math.random() * 5);
        snake.push(new Point({ xAxis: startX, yAxis: startY }));
        for ( let i = 1; i < INITIAL_SNACK_LENGTH; i++ ) {
            const { xAxis, yAxis } = snake[i - 1];
            const array = [0, 1, 2, 3];
            if (i === 1) {
                const index = array.indexOf(this.direction);
                array.splice(index, 1)
            }
            const point = this.getNextPoint(xAxis, yAxis, array[Math.floor(Math.random() * array.length)]);
            snake.push(new Point(point))
        }
        this.snake = snake;
        this.handleCreatePrey();
        this.drawSnake();
        this.moveSnake();
    };

    handleCreatePrey = () => { // 生成猎物
        const { xMax, yMax } = this.state;
        const emptyAry = [];
        for ( let i = 0; i < xMax; i++ ) {
            for ( let j = 0; j < yMax; j++ ) {
                if (!this.snake.some(point => point.isSame(i, j))) {
                    emptyAry.push({ xAxis: i, yAxis: j })
                }
            }
        }
        const point = emptyAry[Math.ceil(Math.random() * emptyAry.length)];
        const prey = new Point(point);
        this.setState({ prey })
    };

    getNextPoint ( xAxis, yAxis, direction ) // 获取下一个点
    {
        switch ( direction ) {
            case 0:
                return { xAxis: xAxis + 1, yAxis };
            case 1:
                return { xAxis: xAxis - 1, yAxis };
            case 2:
                return { xAxis, yAxis: yAxis - 1 };
            case 3:
                return { xAxis, yAxis: yAxis + 1 };
        }
    }


    drawSnake = () => {
        const { prey, state } = this.state;
        this.cxt.clearRect(0, 0, WIDTH, HEIGHT);
        this.snake.forEach(( { xAxis, yAxis, color } ) => { // 每个点绘制出来
            this.cxt.fillStyle = color;
            this.cxt.fillRect(xAxis * STEP, yAxis * STEP, STEP, STEP);
        });
        if (prey) {
            this.cxt.fillStyle = prey.Color;
            this.cxt.fillRect(prey.XAxis * STEP, prey.YAxis * STEP, STEP, STEP);
        }
        if (state === 2) {
            window.requestAnimationFrame(this.drawSnake);
        }
    };

    moveSnake = () => {
        this.timer = window.setInterval(() => {
            const snake = _.cloneDeep(this.snake);
            this.snake = snake.map(( point, index ) => {
                if (index === 0) {
                    const { xAxis, yAxis } = this.getNextPoint(point.XAxis, point.YAxis, this.direction);
                    point.XAxis = xAxis;
                    point.YAxis = yAxis;
                } else {
                    point.XAxis = this.snake[index - 1].XAxis;
                    point.YAxis = this.snake[index - 1].YAxis;
                }
                return point
            });
            this.handleMoveCheck();
        }, 500)
    };

    handleMoveCheck = () => { // 碰撞检测 吃猎物 撞墙壁 撞自身 判定
        const { prey, xMax, yMax } = this.state;
        const XAxis = this.snake[0].XAxis;
        const YAxis = this.snake[0].YAxis;
        if (prey && prey.isSame(XAxis, YAxis)) { // 吃到猎物
            const { xAxis, yAxis } = this.getNextPoint(XAxis, YAxis, this.direction);
            const newSnake = _.cloneDeep(this.snake);
            newSnake.unshift(new Point({ xAxis, yAxis, color: prey.Color }));
            this.snake = newSnake;
            this.handleCreatePrey();
        } else {
            if ((XAxis <= 0 || XAxis >= xMax) || (YAxis <= 0 || YAxis >= yMax)) {  // 撞墙壁
                this.setState({ state: 3 })
            }
            if (this.snake.slice(1).some(point => point.isSame(XAxis, YAxis))) { // 撞自己
                this.setState({ state: 3 })
            }
        }
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
// 结合canvas 做图形的绘制 避免使用dom渲染状态