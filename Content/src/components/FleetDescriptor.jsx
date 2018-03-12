import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Icon, Popup } from 'semantic-ui-react'
import PluginModal from './PluginModal.jsx'
import Popover from 'material-ui/Popover'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';




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

    copyToClipboard = (value) => {
        fetch("Database/CopyToClipboard/" + value)
    }

    handleSnackbarClick = (name) => {
        this.copyToClipboard(name);
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
                            <div style={{ float: "left", marginTop: 17 }}><Checkbox

                                onCheck={() => that.props.selectFleet(fleet.Identity.Name)}
                            />
                            </div>
                            <div style={{ paddingTop: 5 }}>
                                <ListItem key={i}
                                    primaryTogglesNestedList={true}
                                    primaryText={fleet.Identity.Name}
                                    nestedItems={fleet.Vehicles.map(function (vehicle, i) {
                                        return <Popup
                                            key={i}
                                            content={vehicle.Pcs.map((pc, i) => {
                                                return <MenuItem
                                                    key={i}
                                                    primaryText={"PC: " + pc.Identity.Name} />
                                            })}
                                            trigger={<ListItem
                                                key={i}
                                                primaryText={vehicle.Identity.Name}
                                                leftIcon={<Icon color="blue" name='train' size='large' />}
                                                primaryTogglesNestedList={true}
                                                nestedItems={vehicle.Products.map(function (product, i) {
                                                    return <ListItem key={i}
                                                        primaryText={product.Identity.Name}
                                                        primaryTogglesNestedList={true}
                                                        leftIcon={<Icon color="blue" name='archive' size='large' />}
                                                        nestedItems={product.Frameworks.map(function (framework, i) {
                                                            return <ListItem key={i}
                                                                primaryText={framework.Identity && framework.Identity.Name}
                                                                leftIcon={<Icon color="blue" name='setting' size='large' />}
                                                                primaryTogglesNestedList={true}
                                                                nestedItems={framework.PluginConfigurations && framework.PluginConfigurations.map(function (plugin, i) {
                                                                    return <ListItem
                                                                        key={i}
                                                                        primaryText={<PluginModal plugin={plugin} />}
                                                                        leftIcon={<Icon color="teal" name='plug' size='large' />}
                                                                        rightIcon={<Icon onClick={() => that.handleSnackbarClick(plugin.Identity.Name)} color="blue" name='copy' size='large' />}
                                                                    />
                                                                })}
                                                            />
                                                        })}
                                                    />
                                                })}
                                            />} />
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






