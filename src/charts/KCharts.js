import React, {Component} from 'react';
import Candlestick from 'echarts/lib/chart/candlestick'
import Line from 'echarts/lib/chart/line'
import DataZoom from 'echarts/lib/component/dataZoom'
import LegendScoll from 'echarts/lib/component/legendScroll'
import { withStyles } from '@material-ui/core/styles';
import echarts from 'echarts/lib/echarts'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/test1'

const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';

const styles = theme => ({
    stockCharts: {
        width: '100%',
        height: '100%',
        background: 'white',
        marginBottom: '10px'
    }
})

class KCharts extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._getData(this.props.stockCode)
    }

    componentWillReceiveProps(nextProps) {
        this._getData(nextProps.stockCode)
    }

    _getData(stockCode) {
        if(!stockCode || stockCode.length == 0) {
            return
        }
        axios({
            url: `/stockBaseInfo/${stockCode.replace('.', '_')}`,
            method: 'get'
        }).then((resp) => {
            let myChart = echarts.init(this.refs.chartDiv)
            myChart.setOption(this._constructOptions(stockCode, resp.data))
        })
    }

    _processData(rowData) {
        let categoryData = []
        let values = []
        let volumes = []
        let ma = {
            ma5: [],
            ma10: [],
            ma20: [],
            ma30: []
        }
        for (var i = 0; i < rowData.length; i++) {
            categoryData.push(rowData[i].splice(0, 1)[0]);
            values.push(rowData[i]);
            volumes.push([i, rowData[i][4], rowData[i][0] > rowData[i][1] ? 1 : -1]);
            ma.ma5.push(rowData[i][5])
            ma.ma10.push(rowData[i][6])
            ma.ma20.push(rowData[i][7])
            ma.ma30.push(rowData[i][8])
        }
    
        return {
            categoryData: categoryData,
            values: values,
            volumes: volumes,
            ...ma
        };
    }

    _constructOptions(stockCode, rowData) {
        let data0 = this._processData(rowData)
        let options = {
            title: {
                text: stockCode,
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%'
            },
            xAxis: {
                type: 'category',
                data: data0.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 95,
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    y: '95%',
                    start: 95,
                    end: 100
                }
            ],
            series: [
                {
                    name: '日K',
                    type: 'candlestick',
                    data: data0.values,
                    itemStyle: {
                        normal: {
                            color: upColor,
                            color0: downColor,
                            borderColor: upBorderColor,
                            borderColor0: downBorderColor
                        }
                    },
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [
                            {
                                name: 'XX标点',
                                coord: ['2013/5/31', 2300],
                                value: 2300,
                                itemStyle: {
                                    normal: {color: 'rgb(41,60,85)'}
                                }
                            },
                            {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    name: 'from lowest to highest',
                                    type: 'min',
                                    valueDim: 'lowest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                }
                            ],
                            {
                                name: 'min line on close',
                                type: 'min',
                                valueDim: 'close'
                            },
                            {
                                name: 'max line on close',
                                type: 'max',
                                valueDim: 'close'
                            }
                        ]
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: data0.ma5,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: data0.ma10,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: data0.ma20,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: data0.ma30,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
        
            ]
        }

        return options
    }
    
    render() {
        let { classes } = this.props
        return (
            <div className={classes.stockCharts} ref='chartDiv'>
                无数据
            </div>
        )
    }
}

export default withStyles(styles)(KCharts)