import React, {Component} from 'react';

class KLineChart extends Component {
    constructor(props) {
        super(props)
    }

    _drawSingleKLine(data, x, y, width, height) {
        let totalDelta = data.high - data.low
        let mainContentHighPri = data.close > data.open ? data.close : data.open
        let mainContentLowPri = data.open > data.close ? data.close : data.open
        let upPct = (data.high - mainContentHighPri) / totalDelta
        let mainContentPct = (mainContentHighPri - mainContentLowPri) / totalDelta

        let upX = x + width / 2
        let canvas= this.refs.k_line_chart
        let canvasContext = canvas.getContext()

        // 绘制上影线
        //let 
    }

    _drawKLines(data) {
        let width = this.refs.k_line_chart.offsetWidth
        let height = this.refs.k_line_chart.offsetHeight
        for(let i = 0;i < data.length;i++) {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <canvas ref='k_line_chart'/>
        )
    }
}