import React, { Component } from 'react'
import { Dimmer, Loader, Segment, Divider, Button } from 'semantic-ui-react'
import HomeHeader from './HomeHeader.jsx'
import HomeSideMenu from './HomeSideMenu.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FileOpener from './FileOpener.jsx'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AddClientModal from './AddClientModal.jsx';
import Dialog from 'material-ui/Dialog';
var linq = require('mini-linq-js')

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: null,
            toggleMenu: false,
            openClientAddWindow: false,
            open: false,
            triggerAddClientModal: false
        }
        this.init = this.init.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLoadFromFileClick = this.handleLoadFromFileClick.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
        this.triggerAddClient = this.triggerAddClient.bind(this);
        this.addClientByName = this.addClientByName.bind(this);
    }


    init() {
        fetch("Clients/Get").then(response => {
            response.json().then(data => {
                this.setClients(data);
            })
        })
    }

    componentDidMount() {
        this.init();
    }

    toggleVisibility() {
        this.setState({
            toggleMenu: !this.state.toggleMenu
        })
    }

    handleLoadFromFileClick(e) {
        this.refs.fileOpener.click();
        this.setState({
            open: false
        })
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    deleteClient(clientName) {
        fetch("Clients/Remove/" + clientName).then(response => {
            response.json().then(data => {
                this.setClients(data);
            })
        })
    }

    setClients(data) {
        var clients = [];
        data.map(x => {
            var client = {
                name: x.Name,
                fleets: x.Fleets,
                status: x.RefreshStatus
            }
            clients.push(client)
        });
        this.setState({
            clients: clients
        });
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    postData(url, data) {
        // Default options are marked with *
        return fetch(url, {
            body: JSON.stringify(data, null, 2), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *same-origin
            redirect: 'follow', // *manual, error
            referrer: 'no-referrer', // *client
        }) // parses response to JSON
    }


    handleChange(files) {
        var reader = new FileReader();
        var clientName = files[0].name.replace('.json', '');
        reader.onload = (file) => {
            let newClient = JSON.parse(file.target.result);

            var toSend = JSON.stringify(newClient);

            this.postData("Clients/AddClient/" + clientName, file.target.result).then(response => response.json().then(data => this.setClients(data)))

        };
        reader.readAsText(files[0]);
    }

    triggerAddClient() {
        this.setState({
            triggerAddClientModal: !this.state.triggerAddClientModal,
            open: false
        })
    }

    addClientByName(name) {
        if (!name) {
            return;
        }
        if (this.state.clients.any(x => x.name.toLowerCase() === name.toLowerCase())) {
            alert("Client with the same name already exists.")
            return;
        }
        fetch("Clients/AddClientByName/" + name)
            .then(response => response.json()
                .then(data => {
                    if (typeof (data) === "string") {
                        alert(data);
                        this.setState({
                            triggerAddClientModal: false
                        })
                    } else {
                        console.log(data)
                        var clients = [];
                        data.map(x => {
                            var client = {
                                name: x.Name,
                                fleets: x.Fleets,
                                status: x.RefreshStatus
                            }
                            clients.push(client)
                        })
                        this.setState({
                            clients: clients,
                            triggerAddClientModal: false
                        })
                    }
                }))
    }

    render() {

        var { clients, triggerAddClientModal } = this.state;

        var style = {
            marginRight: 40,
            marginTop: 15,
            float: "right"
        }

        if (!this.state.clients) {
            return <div> <Segment>
                <Dimmer active>
                    <Loader size='massive'>Loading clients...</Loader>
                </Dimmer>
            </Segment></div>
        }

        return (
            <div>
                <HomeHeader toggle={this.toggleVisibility} />
                <Divider style={{ marginTop: "20px" }} horizontal><h2>Clients Overview</h2></Divider>
                <HomeSideMenu
                    clients={this.state.clients}
                    toggled={this.state.toggleMenu}
                    deleteClient={this.deleteClient}
                />
                <MuiThemeProvider>
                    <div>
                        <input type="file" id="file" accept=".json" ref="fileOpener" onChange={(e) => this.handleChange(e.target.files)} style={{ display: "none" }} />
                        <RaisedButton onClick={this.handleClick} label="Add Client" primary={true} style={style} />
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            animated={true}
                            autoCloseWhenOffScree={true}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                <MenuItem onClick={this.handleLoadFromFileClick} primaryText="Load from file" />
                                <MenuItem onClick={this.triggerAddClient} primaryText="Load by name" />
                            </Menu>
                        </Popover>
                    </div>
                </MuiThemeProvider>
                <AddClientModal open={triggerAddClientModal} close={this.triggerAddClient} addClientByName={this.addClientByName} />
            </div>
        )
    }
}



