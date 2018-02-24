import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Icon } from 'semantic-ui-react'
import PluginModal from './PluginModal.jsx'

export default class ClientCardDescriptor extends Component {
    constructor(props) {
        super(props);
    }
    archive
    render() {
        var { fleets } = this.props

        return <MuiThemeProvider><List>
            <ListItem>
            {fleets.map(function (fleet, i) {
                    return <ListItem key={i}
                        primaryText={fleet.Identity.Name}
                        leftIcon={<Icon name='user circle' size='large' />}
                        nestedItems={fleet.Vehicles.map(function (vehicle, i) {
                            return <ListItem key={i}
                                primaryText={vehicle.Identity.Name}
                                leftIcon={<Icon name='train' size='large' />}
                                nestedItems={vehicle.Products.map(function (product, i) {
                                    return <ListItem key={i}
                                        primaryText={product.Identity.Name}
                                        leftIcon={<Icon name='archive' size='large' />}
                                        nestedItems={product.Frameworks.map(function (framework, i) {
                                            return <ListItem key={i}
                                                primaryText={framework.Identity && framework.Identity.Name}
                                                leftIcon={<Icon name='setting' size='large' />} 
                                                nestedItems={framework.StarterMotorConfigurations && framework.StarterMotorConfigurations.map(function (plugin, i) {
                                                    return <ListItem 
                                                        key={i}
                                                        primaryText={<PluginModal plugin={plugin}/>}
                                                        leftIcon={<Icon name='plug' size='large' />} />
                                                })}
                                                />
                                        })}
                                    />
                                })}
                            />
                        })} >
                    </ListItem>
                })}
            </ListItem>
        </List></MuiThemeProvider>;
    }
}






