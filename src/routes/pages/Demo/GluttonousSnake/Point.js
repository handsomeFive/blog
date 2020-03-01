/**
 * @class : 定义坐标类 用于显示
 */
export default class Point {
    constructor ( params )
    {
        this.update(params || {})
    }

    get XAxis ()
    {
        return this.xAxis
    }

    get YAxis ()
    {
        return this.yAxis
    }

    get Color ()
    {
        return this.color
    }

    set Color ( val )
    {
        this.color = val
    }

    set XAxis ( val )
    {
        this.xAxis = val
    }

    set YAxis ( val )
    {
        this.yAxis = val
    }

    update ( params )
    {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        this.color = `rgb(${ r },${ g },${ b })`
        Object.keys(params).forEach(key => this[key] = params[key]);
    }

    isSame ( xAxis, yAxis )
    {
        return xAxis === this.XAxis && yAxis === this.yAxis
    }
}
// 面向对象写法 之get set 注意get 和 set 的方法名不能和 属性名字一样 需要做出区分