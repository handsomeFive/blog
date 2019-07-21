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
        this.score = 0
        this._addRandomValue()
        this._addRandomValue()
    }

    /**
     * @function add random value to the list
     * @private
     */

    _addRandomValue ()
    {
        // const value = Math.floor(Math.random() * 10) > 5 ? 2 : 4 // the random value : 2 or 4
        const value = 2
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
            this.list.push({ ...canAddAry[label], value, label: this._count, merge: false })
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
        const copy = this.list.slice().filter(item => !!item.value).map(item => {
            return { ...item, double: false, }
        })
        const aimAry = copy.slice()
        const relativeAxis = axis === 'x' ? 'y' : 'x' //相对坐标
        let isChange = false
        for ( let i = 0; i < emunAxis[relativeAxis]; i++ ) {
            const rowAry = aimAry.filter(item => item[relativeAxis] === i).sort(( a, b ) => (a[axis] - b[axis]) * (reverse ? -1 : 1))
            const mergeAry = []
            if (rowAry.length) {
                rowAry.forEach(( item, index ) => {
                    if (rowAry[index + 1] && item.value === rowAry[index + 1].value && mergeAry.every(label => Math.abs(label - index) > 1)) {
                        mergeAry.push(index)
                    }
                })
                mergeAry.forEach(label => {
                    rowAry[label].value = 2 * rowAry[label].value
                    rowAry[label].double = true
                    rowAry[label + 1].value = 0
                    this.score = ( rowAry[label].value) + this.score
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
                rowAry.filter(item => !item.value).forEach(( mergedItem ) => {
                    const currentIndex = copy.findIndex(copyItem => copyItem.label === mergedItem.label)
                    const ary = copy.filter(item => {
                        const jud = reverse ? mergedItem[axis] < item[axis] : mergedItem[axis] > item[axis]
                        return jud && item.value && mergedItem[relativeAxis] === item[relativeAxis] && item.double
                    })
                    if (ary.length) {
                        copy[currentIndex][axis] = ary[ary.length - 1][axis]
                        isChange = true
                    }
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

    check ()
    {
        if (this.list.filter(item => !!item.value).length < this.axisY * this.axisX) {
            return true
        } else {
            return this.list.some(item => { //
                const { x, y, value } = item
                return !!this.list.filter(data => ((data.y === y && data.x === x + 1) || (data.x === x && data.y === y + 1)) && value === data.value).length
            })
        }
    }

    restart ()
    {
        this._count = 0
        this.score = 0
        this.list = []
        this._addRandomValue()
        this._addRandomValue()
    }

}