import React, { Component } from 'react'
import { Dimmer, Loader, Image, Segment, Divider, Button } from 'semantic-ui-react'
import HomeHeader from './HomeHeader.jsx'
import HomeSideMenu from './HomeSideMenu.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FileOpener from './FileOpener.jsx'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: null,
            toggleMenu: false,
            openClientAddWindow: false,
            open: false
        }
        this.init = this.init.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLoadFromFileClick = this.handleLoadFromFileClick.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
    }


    init() {
        fetch("Clients/Get").then(response => {
            response.json().then(data => {
                var clients = [];
                var parsed = data.map(c => {
                    var client = {
                        name: c.key,
                        fleets: JSON.parse(c.value)
                    }
                    clients.push(client)
                })
                this.setState({
                    clients: clients
                })
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
        var { clients } = this.state;
        var updated = clients.filter(client => {
            return client.name.toLowerCase() !== clientName.toLowerCase();
        })
        this.setState({
            clients: updated
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


    handleChange(files) {
        console.log(files[0].name);
        var reader = new FileReader();
        var {clients} = this.state;
        var clientName = files[0].name.replace('.json', '');
        var contains = clients.filter(x => x.name.toLowerCase() === clientName.toLowerCase()); 

        if(contains.length != 0){
            alert("Client " + clientName +" already exists.");
            reader.abort();
            return;
        }
        reader.onload = (file) => {
            var newClient = { name: clientName, fleets: JSON.parse(file.target.result) };
            clients.push(newClient)
            this.setState({
                clients: clients
            })
        };
        reader.readAsText(files[0]);
    }


    render() {

        var { clients } = this.state;
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
                <Image src='/assets/images/image.png' />
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
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                <MenuItem onClick={this.handleLoadFromFileClick} primaryText="Load from file" />
                                <MenuItem primaryText="Load by name" />
                            </Menu>
                        </Popover>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}




