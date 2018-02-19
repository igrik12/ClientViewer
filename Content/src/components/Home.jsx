import React, { Component } from 'react'
import { Dimmer, Loader, Image, Segment, Divider } from 'semantic-ui-react'
import HomeHeader from './HomeHeader.jsx'
import HomeSideMenu from './HomeSideMenu.jsx'

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
                        fleets: []
                    }
                    c.value.map(v => {
                        client.fleets.push(JSON.parse(v))
                    })
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

        var {clients} = this.state;

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
                    toggled={this.state.toggleMenu}/>
            </div>
        )
    }
}



