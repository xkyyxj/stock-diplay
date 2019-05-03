import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';


/**
 * 
 * TableHead数据格式：字符串数组，名字为data
 */
class EnhanceTableHead extends Component {
    constructor(props) {
        super(props)
    }

    createSortHandler(item) {
        return event => {
            this.props.onSortClick(event, item)
        }
    }

    render() {
        let {orderBy, order} = this.props
        let tableHead = this.props.data
        return (
            <TableHead>
                <TableRow>
                    {tableHead && Array.isArray(tableHead) ? tableHead.map(item => {
                        return (
                            <TableCell>
                                <Tooltip
                                title="Sort"
                                placement={'bottom-end'}
                                enterDelay={200}
                                >
                                <TableSortLabel
                                    active={orderBy === item.id}
                                    direction={order}
                                    onClick={this.createSortHandler(item.id)}
                                >
                                    {item.id}
                                </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        )
                    }) : null}
                </TableRow>
            </TableHead>
        )
    }
}

export default EnhanceTableHead