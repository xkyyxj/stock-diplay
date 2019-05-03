import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

class LeftTree extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                >
                    {this.props.data != null && this.props.data.length > 0 ? this.props.data.map(item => {
                        return (
                            <ListItem button divider>
                                <ListItemText inset primary={item} />
                            </ListItem>
                        )
                    }) : null}
                </List>
            </div>
        )
    }
}

export default LeftTree