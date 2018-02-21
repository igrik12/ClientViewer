import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { Card, Label } from 'semantic-ui-react'
import Plugin from './Plugin.jsx'
import { List, ListItem } from 'material-ui/List'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PluginModal from './PluginModal.jsx'


export default class Framework extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { framework } = this.props;
        var configs = framework.PluginConfigurations ? framework.PluginConfigurations : framework.StarterMotorConfigurations;

        return <Panel hideIcon={true} title={<Label color={"green"} size="large" basic style={{ width: "100%" }}>Framework: {framework.Identity.Name}</Label>}>
            <Card.Group>{
                <MuiThemeProvider>
                    <List>
                        {
                            configs.map(function (item, i) {
                                return <PluginModal key={i} plugin={item} />
                            })
                        }
                    </List>
                </MuiThemeProvider>
            }</Card.Group>
        </Panel>
    }
}
