/**
 * @class : 棋盘数据处理中心
 */
export class ChessStore {
    constructor ( props )
    {
        this._count = 0
        this.axisX = props.x
        this.axisY = props.y
        this.list = []
        this._addRandomValue()
        this._addRandomValue()
    }

    /**
     * @function add random value to the list
     * @private
     */

    _addRandomValue ()
    {
        const value = Math.floor(Math.random() * 10) > 5 ? 2 : 4 // the random value : 2 or 4
        const canAddAry = []
        for ( let x = 0; x < this.axisX; x++ ) {
            for ( let y = 0; y < this.axisY; y++ ) {
                if (!this.list.find(item => item.x === x && item.y === y)) {
                    canAddAry.push({ x, y })
                }
            }
        }
        if (canAddAry.length) {
            const label = Math.floor(Math.random() * canAddAry.length)
            this.list.push({ ...canAddAry[label], value, label: this._count })
            this._count++
        }
    }

    /**
     * @function merge the same value
     * @param direction  {x,y}
     * @private
     */
    _mergeSameValue ( axis, reverse )
    {
        const emunAxis = { 'x': this.axisX, 'y': this.axisY }
        const copy = this.list.slice()
        const relativeAxis = axis === 'x' ? 'y' : 'x' //相对坐标
        let isChange = false
        for ( let i = 0; i < emunAxis[relativeAxis]; i++ ) {
            const rowAry = this.list.filter(item => item[relativeAxis] === i).sort(( a, b ) => (a[axis] - b[axis]) * (reverse ? -1 : 1))
            const mergeAry = []
            if (rowAry.length) {
                rowAry.forEach(( item, index ) => {
                    if (rowAry[index + 1] && item.value === rowAry[index + 1].value && mergeAry.every(label => Math.abs(label - index) > 1)) {
                        mergeAry.push(index)
                    }
                })
                mergeAry.forEach(label => {
                    rowAry[label].value = 2 * rowAry[label].value
                    rowAry[label + 1].value = 0
                })
                rowAry.filter(item => item.value).forEach(( { label, value }, index ) => {
                    const currentIndex = copy.findIndex(copyItem => copyItem.label === label)
                    const result = reverse ? (emunAxis[relativeAxis] - index - 1) : index
                    if (currentIndex > -1 && copy[currentIndex][axis] !== result) {
                        copy[currentIndex].value = value
                        copy[currentIndex][axis] = result
                        isChange = true
                    }
                })
                rowAry.filter(item => !item.value).forEach(( { label } ) => {
                    const currentIndex = copy.findIndex(copyItem => copyItem.label === label)
                    copy.splice(currentIndex, 1)
                    isChange = true
                })
            }
        }
        this.list = copy
        isChange && this._addRandomValue()
    }

    /**
     * @function move the chess
     * @param code :number (key code)
     */
    move ( code )
    {
        switch ( code ) {
            case 37: // left
                this._mergeSameValue('x', false)
                break;
            case 38: // top
                this._mergeSameValue('y', false)
                break;
            case 39: // right
                this._mergeSameValue('x', true)
                break;
            case 40: // bottom
                this._mergeSameValue('y', true)
                break;
        }
    }
}