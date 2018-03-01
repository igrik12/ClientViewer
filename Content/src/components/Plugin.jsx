import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { Card } from 'semantic-ui-react'
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ActionInfo from 'material-ui/svg-icons/action/info'

export default class Plugin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { plugin } = this.props;
        return <ListItem
            key={plugin.name}
            primaryText={plugin.name}
            rightIcon={<ActionInfo />}
        />
    }
}