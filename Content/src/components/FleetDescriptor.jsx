import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Icon, Popup, Button, Dropdown, DropdownMenu } from 'semantic-ui-react'
import PluginModal from './PluginModal.jsx'
import Popover from 'material-ui/Popover'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DropDownMenu } from 'material-ui';




export default class FleetDescriptor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openPcs: false,
            pcs: [],
            snackbarOpen: false,
            currectClipValue: ''
        };
        this.handleRequestClose = this.handleRequestClose.bind(this)
    }

    handleRequestClose = () => {
        this.setState({
            openPcs: false,
        });
    };

    // Snackbar and clipboard copy actions
    //-------------------------------------

    parsePlugin = (plugin) => {
        return JSON.stringify(plugin, null, 2);
    }

    handleSnackbarClick = (name) => {
        this.setState({
            snackbarOpen: true,
            currectClipValue: name
        });
    };

    handleSnackbarRequestClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };


    render() {
        var { fleets } = this.props;
        const that = this;
        const styles = {
            checkbox: {
                maxWidth: 25,
                float: "left"
            },
        };

        return <div>
            <MuiThemeProvider>
                <List>
                    {fleets.map(function (fleet, i) {
                        return <div>
                            <div style={{ paddingTop: 5 }}>
                                <ListItem key={i}
                                    primaryTogglesNestedList={true}
                                    primaryText={fleet.Identity.Name}
                                    leftIcon={<Icon color="blue" name='train' size='large' />}
                                    nestedItems={fleet.Vehicles.map(function (vehicle, i) {
                                        return <div>
                                            <div style={{ float: "left", marginTop: 12, marginLeft: 30 }}>
                                                <Popup
                                                    hoverable
                                                    trigger={<Icon size="large" name='info circle' />}
                                                    content={
                                                        <Menu>
                                                            <div>
                                                                <Dropdown item text="Constants">
                                                                    <Dropdown.Menu>
                                                                        {Object.keys(vehicle.VehicleConstants).map((key,index) => {
                                                                           return <Dropdown.Item text={JSON.stringify(key) + ":  " + vehicle.VehicleConstants[key] } />
                                                                        })}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                            <div style={{ marginTop: 10 }}>
                                                                <Dropdown item text="Vehicle PCs">
                                                                    <Dropdown.Menu>
                                                                        {vehicle.Pcs.map((pc, i) => {
                                                                            return <Dropdown.Item key={i} icon='computer' text={pc.Identity.Name} />
                                                                        })}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </Menu>
                                                    }
                                                    hideOnScroll
                                                />
                                            </div>
                                            <div style={{ marginLeft: 55 }}>
                                                <div className="vehicleCheckBox" style={{ float: "left" }}>
                                                    <Checkbox
                                                        style={{ marginTop: 12, marginLeft: 5 }}
                                                        onCheck={() => that.props.selectVehicle(vehicle.Identity.Name)}
                                                    />
                                                </div>
                                                <ListItem
                                                    key={i}
                                                    primaryText={vehicle.Identity.Name}
                                                    primaryTogglesNestedList={true}
                                                    nestedItems={vehicle.Products.map(function (product, i) {
                                                        return <ListItem key={i}
                                                            primaryText={product.Identity.Name}
                                                            primaryTogglesNestedList={true}
                                                            leftIcon={<Icon color="blue" name='archive' size='large' />}
                                                            nestedItems={product.Frameworks.map(function (framework, i) {
                                                                return <Popup
                                                                    key={i}
                                                                    content={framework.PcIdentity && framework.PcIdentity.Name}
                                                                    trigger={<ListItem
                                                                        key={i}
                                                                        style={{ marginLeft: 30 }}
                                                                        primaryText={framework.Identity && framework.Identity.Name}
                                                                        leftIcon={<Icon color="blue" name='setting' size='large' />}
                                                                        primaryTogglesNestedList={true}
                                                                        nestedItems={framework.PluginConfigurations && framework.PluginConfigurations.map(function (plugin, i) {
                                                                            return <div style={{ width: "100%" }}>
                                                                                <div style={{ width: "5%", float: "right", marginTop: 17, marginBotton: 7, marginRight: 4 }}>
                                                                                    <CopyToClipboard text={that.parsePlugin(plugin)}>
                                                                                        <Icon onClick={() => that.handleSnackbarClick(plugin.Identity.Name)} color="blue" name='copy' size='large' />
                                                                                    </CopyToClipboard>
                                                                                </div>
                                                                                <div>
                                                                                    <ListItem
                                                                                        key={i}
                                                                                        style={{ paddingTop: 5, width: "85%", marginLeft: 60 }}
                                                                                        primaryText={<PluginModal plugin={plugin} />}
                                                                                        leftIcon={<Icon color="teal" name='plug' size='large' />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        })}
                                                                    />} />
                                                            })}
                                                        />
                                                    })}
                                                /></div>
                                        </div>
                                    })} >
                                </ListItem></div></div>
                    })}
                </List>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.currectClipValue + " copied to clipboard"}
                    autoHideDuration={2500}
                    onRequestClose={this.handleSnackbarRequestClose}
                />
            </MuiThemeProvider>
        </div>
    }
}






