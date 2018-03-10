import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Icon } from 'semantic-ui-react'
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
            snackbarOpen: false
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

    // Snackbar and clipboard copy actions
    //-------------------------------------

    copyToClipboard = (value) => {
        fetch("Database/CopyToClipboard/" + value)
    }

    handleSnackbarClick = (name) => {
        this.copyToClipboard(name);
        this.setState({
            snackbarOpen: true,
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
                            primaryText={
                                <div style={{ marginBottom: 25 }}>
                                    <div>
                                        <Checkbox
                                            style={styles.checkbox}
                                            onCheck={() => that.props.selectFleet(fleet.Identity.Name)}
                                        />
                                    </div>
                                    <div style={{ paddingTop: 5, maxWidth: 20, float: "left" }}>
                                        {fleet.Identity.Name}
                                    </div>
                                </div>}
                            nestedItems={fleet.Vehicles.map(function (vehicle, i) {
                                return <ListItem key={i}
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
                                                            primaryText={<PluginModal plugin={plugin}/>}
                                                            leftIcon={<Icon color="teal" name='plug' size='large' />}
                                                            rightIcon={<Icon onClick={() => that.handleSnackbarClick(plugin.Identity.Name)} color="blue" name='copy' size='large' />}
                                                        />
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
                <Snackbar
                    open={this.state.snackbarOpen}
                    message="Copied to clipboard"
                    autoHideDuration={2500}
                    onRequestClose={this.handleSnackbarRequestClose}
                />
            </MuiThemeProvider>
        </div>
    }
}






