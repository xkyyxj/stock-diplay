import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import axios from 'axios'

import MainTable from '../gridPage/MainTable'
import LeftTree from './LeftTree'
import MainHead from "./MainHead"
import KCharts from '../charts/KCharts'
import EchartsTest from '../charts/EchartsTest'
import './MainPage.scss'

const mysql = require('mysql')

axios.defaults.baseURL = 'http://localhost:8080/test1'

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    header: {
        width: '100%',
        height: '15%',
        minHeight: '64px',
        position: 'relative'
    },
    content: {
        flexGrow: 1,
        display: 'flex'
    },
    mainTable: {
       // paddingTop: '24px',
        width: '100%',
        height: '100%',

        display: 'flex',
        //flexGrow: 1,
        flexDirection: 'column'
    },
    category: {
        //paddingTop: '24px',
        overflow: 'scroll'
    },
    tableContent: {
        overflow: 'auto',
        height: '50%'
    }
})

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //表格数据
            data: {},
            treeData: [],
            showKCharts: false,
            showKChartsStockCode: '603993.SH'
        }

        //bind绑定
        this.handleClose = this.handleClose.bind(this)

        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '123',
            database : 'stock'
        });
    }

    componentDidMount() {
        //加载数据
        axios({
            url: '/content',
            method: 'get'
        }).then((resp) => {
            this.setState({
                treeData: resp.data
            })
        }).catch((error) => {
            console.log(error)
        })


        axios({
            url: '/tableContent/has_up',
            method: 'Get'
        }).then(resp => {
            console.log(resp)
            let head = resp.data[0]
            for(let i = 0;i < head.length;i++) {
                if(head[i] == 'ts_code') {
                    head[i] = {
                        id: head[i],
                        render: (rowIndex, row, item) => {
                            return (
                                <span
                                    style={{color: '#007ace', cursor: 'pointer' }}
                                    onClick={() => {
                                        this.setState({
                                            showKCharts: true,
                                            showKChartsStockCode: item
                                        })
                                    }}
                                >
                                   {item} 
                                </span>
                            )
                        }   
                    }
                }
                else {
                    head[i] = {
                        id: head[i]
                    }
                }
            }

            let content = resp.data.slice(1, resp.data.length)
            this.setState({
                data: {
                    head: head,
                    data: content
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handleClose() {
        this.setState({
            showKCharts: false
        })
    }

    render() {
        let {classes} = this.props
        return (
            <div className={classes.root}>
                <header className={classes.header}>
                    <MainHead />
                </header>
                <section className={classes.content}>
                    <LeftTree className={classes.category} data={this.state.treeData}/>
                    <div className={classes.mainTable}>
                        <MainTable className={classes.tableContent} data={this.state.data}/>
                        <KCharts />
                    </div>
                </section>
            </div>
        )
    }
}

export default withStyles(styles)(MainPage)