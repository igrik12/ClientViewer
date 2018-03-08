import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Icon } from 'semantic-ui-react'
import PluginModal from './PluginModal.jsx'
import Popover from 'material-ui/Popover'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu';


export default class FleetDescriptor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openPcs: false,
            pcs: []
        };
        this.handlePcToggle = this.handlePcToggle.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this)
    }
    handlePcToggle = (event, pcs) => {
        this.setState({
            openPcs: !this.state.openPcs,
            anchorEl: event.currentTarget,
            pcs: pcs
        })
    };

    handleRequestClose = () => {
        this.setState({
            openPcs: false,
        });
    };

    render() {
        var { fleets } = this.props;
        const that = this;

        return <MuiThemeProvider>
            <List>
                <Popover
                    open={this.state.openPcs}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={that.handlePcToggle}
                >
                    <Menu>
                        {this.state.pcs && this.state.pcs.map(pc => {
                            return <MenuItem key={pc.Identity.Name} primaryText={"PC: " + pc.Identity.Name} />
                        })}
                    </Menu>
                </Popover>
                {fleets.map(function (fleet, i) {
                    return <ListItem key={i}
                        primaryText={fleet.Identity.Name}
                        leftIcon={<Icon color="black" name='user circle' size='large' />}
                        nestedItems={fleet.Vehicles.map(function (vehicle, i) {
                            return <ListItem key={i}
                                primaryText={<div>{vehicle.Identity.Name}<Icon style={{marginBottom:5, marginLeft:10}} color="blue" name='info' size='large' /></div>}
                                leftIcon={<Icon color="blue" name='train' size='large' />}
                                onClick={(event) => that.handlePcToggle(event, vehicle.Pcs)}
                                nestedItems={vehicle.Products.map(function (product, i) {
                                    return <ListItem key={i}
                                        primaryText={product.Identity.Name}
                                        leftIcon={<Icon color="blue"  name='archive' size='large' />}
                                        nestedItems={product.Frameworks.map(function (framework, i) {
                                            return <ListItem key={i}
                                                primaryText={framework.Identity && framework.Identity.Name}
                                                leftIcon={<Icon color="blue"  name='setting' size='large' />}
                                                nestedItems={framework.PluginConfigurations && framework.PluginConfigurations.map(function (plugin, i) {
                                                    return <ListItem
                                                        key={i}
                                                        primaryText={<PluginModal plugin={plugin} />}
                                                        leftIcon={<Icon color="teal"  name='plug' size='large' />} />
                                                })}
                                            />
                                        })}
                                    />
                                })}
                            />
                        })} >
                    </ListItem>
                })}
            </List>
        </MuiThemeProvider>;
    }
}






