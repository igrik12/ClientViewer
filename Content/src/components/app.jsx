import React, { Component } from 'react'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clients: null
        }
        this.init = this.init.bind(this)
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

    componentWillMount() {
        this.init();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    render() {
        var { clients } = this.state;
        return <div>
        </div>
    }
}