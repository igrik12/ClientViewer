import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ActionInfo from 'material-ui/svg-icons/action/info';
import StarterMotorConfiguration from './StarterMotorConfiguration.jsx'


export default class StarterMotorConfigurations extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <List>
                        {
                            this.props.configurations.map(config => {
                                return <ListItem
                                    key={config.Identity.Name}
                                    primaryText={<StarterMotorConfiguration config={config} />}
                                    rightIcon={<ActionInfo />}
                                />
                            })
                        }
                    </List>
                </MuiThemeProvider>
            </div>
        )
    }
}