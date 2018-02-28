import React, { Component } from 'react'
import { Dimmer, Loader, Image, Segment, Divider, Button } from 'semantic-ui-react'
import HomeHeader from './HomeHeader.jsx'
import HomeSideMenu from './HomeSideMenu.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: null,
            toggleMenu: false,
            openClientAddWindow: false
        }
        this.init = this.init.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }


    init() {
        fetch("RetrieveClients/Clients").then(response => {
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


    render() {

        var { clients } = this.state;
        var style = {
            marginRight: 80,
            marginTop: 25,
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
                <HomeSideMenu clients={this.state.clients}
                    toggled={this.state.toggleMenu} />
                <MuiThemeProvider>
                    <RaisedButton label="Add Client" primary={true} style={style} />
                </MuiThemeProvider>
            </div>
        )
    }
}



