import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import EnhanceTableHead from './EnhanceTableHead'

const styles = theme => ({
    table: {
        height: '50%'
    }
})

/**
 * Table数据格式
 * {head: ['a', 'b', 'c'], data: [['2', '3', '4'],['5', '6', '7']]
 * 
 * 可能遗留历史问题：
 * 1. 排序的时候是每次render的时候都会做下排序，可能导致效率低下，可用解决方案是点击排序后排序并将排序好数据存储在this.state当中
 */
class MainTable extends Component {
    constructor(props) {
        super(props)
        this.onSortClick = this.onSortClick.bind(this)

        this.state = {
            order: 'asc',
            orderBy: ''
        }
    }

    onSortClick(event, orderBy) {
        this.setState({
            orderBy: orderBy,
            order: this.state.order == 'desc' ? 'asc' : 'desc'
        })
    }

    /**
     * 数据快速排序
     */
    _sortData(tableData, orderBy, start, end) {
        if(start < end) {
            let tempIndex = this._partation(tableData, orderBy, start, end)
            this._sortData(start, tempIndex - 1)
            this._sortData(tempIndex + 1, end)
        }

        return tableData
    }

    _partation(tableData, orderBy, start, end) {
        while(start < end) {
            if(this._sortCompare(tableData[start][orderBy], tableData[end][orderBy])) {
                let tempValue = tableData[start]
                tableData[start] = tableData[end]
                tableData[end] = tempValue
                --end
            }
            else {
                ++start
            }
        }

        return start
    }

    _sortCompare(value1, value2) {
        return this.state.order == 'asc' ? value1 > value2 : value2 > value1
    }

    render() {
        let {classes} = this.props
        let tableHead = this.props.data.head
        let tableData = this.props.data.data
        let orderIndex = tableHead && Array.isArray(tableHead) ? tableHead.indexOf(this.state.orderBy) : -1
        if(orderIndex > -1) {
            tableData = this._sortData(tableData, orderIndex, 0, tableData.length - 1)
        }
        return (
            <div className={this.props.className}>
                {tableHead && Array.isArray(tableHead) ? (
                    <Table className={classes.table}>
                    <EnhanceTableHead 
                        data = {tableHead}
                        orderBy = {this.state.orderBy}
                        order = {this.state.order}
                        onSortClick = {this.onSortClick}
                    />

                    <TableBody>
                        {tableData && Array.isArray(tableData) ? tableData.map((row, rowIndex) => {
                            return (
                                <TableRow>
                                    {row.map((item, index) => {
                                        return (
                                            <TableCell>
                                                {
                                                    tableHead[index] && tableHead[index].render ? tableHead[index].render(rowIndex, row, item) : item
                                                }
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </Table>
                ) : "No Data!"}
            </div>
        )
    }
}

export default withStyles(styles)(MainTable)