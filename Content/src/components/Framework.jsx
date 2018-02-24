import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { Card, Label } from 'semantic-ui-react'
import Plugin from './Plugin.jsx'
import { List, ListItem } from 'material-ui/List'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PluginModal from './PluginModal.jsx'
import TempList from './ListNested.jsx'



export default class Framework extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { framework } = this.props;
        var configs = framework.PluginConfigurations ? framework.PluginConfigurations : framework.StarterMotorConfigurations;

        return <TempList>
            <MuiThemeProvider>
                <List>
                    {
                        configs.map(function (item, i) {
                            return <PluginModal key={i} plugin={item} />
                        })
                    }
                </List>
            </MuiThemeProvider>
        </TempList>
    }
}
