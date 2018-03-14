import React, { Component } from 'react'
import { Dimmer, Loader, Segment, Divider, Icon, Popup, List, Card, Modal } from 'semantic-ui-react'
import HomeHeader from './HomeHeader.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Popover from 'material-ui/Popover';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AddClientModal from './AddClientModal.jsx';
import ClientCard from './ClientCard.jsx'
import Update from 'material-ui/svg-icons/action/update'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const linq = require('mini-linq-js');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: null,
            status: [],
            toggleMenu: false,
            openClientAddWindow: false,
            open: false,
            triggerAddClientModal: false,
            adding: false,
            refreshDialog: false
        };
        this.init = this.init.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleLoadFromFileClick = this.handleLoadFromFileClick.bind(this);
        Home.deleteClient = Home.deleteClient.bind(this);
        this.triggerAddClient = this.triggerAddClient.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCloseRefresh = this.handleCloseRefresh.bind(this);
    }


    init() {
        fetch("Database/RefreshDatabase").then(response => {
            response.json().then(data => {
                this.setState({
                    clients: this.extractClients(data)
                })
            })
        });
        setInterval(() => {
            fetch("Database/Status")
                .then(response => response.json())
                .then(status => {
                    this.setState({
                        status: status
                    })
                })
        }, 1000)
    }

    extractClients(data) {
        const clients = [];
        data.map(x => {
            const client = {
                name: x.Name,
                fleets: x.Fleets,
                status: x.RefreshStatus
            };
            clients.push(client)
        });
        return clients;
    }

    componentDidMount() {
        this.init();
    }

    toggleVisibility() {
        this.setState({
            toggleMenu: !this.state.toggleMenu
        })
    }

    handleCloseRefresh = () => {
        this.setState({ refreshDialog: false });
    };

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

    static deleteClient(clientName) {
        fetch("Database/Remove/" + clientName).then(response => {
            response.json().then(data => {
                this.setState({
                    clients: this.extractClients(data)
                });
            })
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    static postData(url, data) {
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


    addClientFromFile(files) {
        const reader = new FileReader();
        const clientName = files[0].name.replace('.json', '');
        var match = this.state.clients.where(x => x.name == clientName);
        if (match.length > 0) {
            alert("Client with the same name already exists.");
            return;
        }
        reader.onload = (file) => {
            Home.postData("Database/AddClient/" + clientName, file.target.result)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        clients: this.extractClients(data)
                    })
                })
        };
        reader.readAsText(files[0]);
    }

    triggerAddClient() {
        this.setState({
            triggerAddClientModal: !this.state.triggerAddClientModal,
            open: false
        })
    }

    handleRefresh() {
        fetch("Database/RefreshDatabase")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    clients: this.extractClients(data),
                    refreshing: false
                })
            })
        this.setState({
            refreshing: true
        })
    }


    render() {
        var { clients, triggerAddClientModal, status, refreshing } = this.state;

        const style = {
            marginRight: 10,
            marginTop: 15,
            float: "right"
        };

        if (!clients) {
            return <div>
                <Modal open={true}>
                    <Dimmer active>
                        <Loader size='massive'>Loading clients...</Loader>
                    </Dimmer>
                </Modal>
            </div>
        }

        if (refreshing) {
            return <div>
                <Modal size="large" open={true}>
                    <Dimmer active>
                        <Loader size='massive'>Refreshing database...</Loader>
                    </Dimmer>
                </Modal>
            </div>
        }

        return (
            <div>
                <HomeHeader toggle={this.toggleVisibility} />
                <Divider style={{ marginTop: "20px" }} horizontal><h3>Clients Overview <Popup
                    trigger={<Icon style={{ marginBottom: 5 }} size="large" name='info circle' />}
                    content={
                        <List>
                            <List.Item>Last Refresh: {status[0]}</List.Item>
                            <List.Item>Next Refresh: {status[1]}</List.Item>
                            <List.Item>Time Till Refresh: {status[2]}</List.Item>
                        </List>}
                /></h3></Divider>
                <Segment style={{ background: "#FFFFFF", marginLeft:10 }} basic>
                    <Card.Group>
                        {clients.map((client) => {
                            return <ClientCard
                                name={client.name}
                                fleets={client.fleets}
                                status={client.status.RefreshBlob}
                                key={client.name}
                                deleteClient={Home.deleteClient} />
                        })}
                    </Card.Group>
                </Segment>

                <MuiThemeProvider>
                    <div>
                        <input type="file" id="file" accept=".json" ref="fileOpener" onChange={(e) => this.addClientFromFile(e.target.files)} style={{ display: "none" }} />
                        <RaisedButton onClick={this.handleRefresh} label="Refresh" primary={true} style={{ float: "right", marginTop: 15, marginRight: 60 }} />
                        <RaisedButton onClick={this.handleLoadFromFileClick} label="Add Client" primary={true} style={style} />
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
                            </Menu>
                        </Popover>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}



