/**
 * @class : 定义坐标类 用于显示
 */
export default class Point {
    constructor ( params )
    {
        this.update(params || {})
    }

    get xAxis ()
    {
        return this.XAxis
    }

    get yAxis ()
    {
        return this.YAxis
    }

    set xAxis ( val )
    {
        this.XAxis = val
    }

    set xAxis ( val )
    {
        this.YAxis = val
    }

    update ( params )
    {
        Object.keys(params).forEach(key => this[key] = params[key]);
    }
}