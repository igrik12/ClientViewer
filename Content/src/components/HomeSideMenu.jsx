import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon, Divider } from 'semantic-ui-react'
import ClientLabels from './ClientLabels.jsx'
import ClientCards from './ClientCards.jsx'
import { statusColor } from './StatusColors.jsx'
import ContentAdd from 'material-ui/svg-icons/content/add';


export default class HomeSideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientStatus: [{
                "clientName": "Kaneko",
                "color": "green",
                "status": "Release Ready"
            },
            {
                "clientName": "HS1",
                "color": "green",
                "status": "Release Ready"
            }]
        }
        this.tempStatusTrigger = this.tempStatusTrigger.bind(this)

    }

    componentDidMount() {
        this.tempStatusTrigger();
    }



    tempStatusTrigger() {
        setTimeout(() => {
            var rnd = Math.floor((Math.random() * 3) + 1);
            let clientStatusData = [
                {
                    "clientName": "Kaneko",
                    "color": "",
                    "status": ""
                }, {
                    "clientName": "Bombardier",
                    "color": "",
                    "status": ""
                }, {
                    "clientName": "HS1",
                    "color": "",
                    "status": ""
                }

            ]

            switch (rnd) {
                case 1:
                    clientStatusData.map(status => {
                        status.color = statusColor("Pass").color
                        status.status = statusColor("Pass").status
                    })
                    this.setState({
                        clientStatus: clientStatusData
                    })
                    break;
                case 2:
                    clientStatusData.map(status => {
                        status.color = statusColor("Partial").color
                        status.status = statusColor("Partial").status
                    })
                    this.setState({
                        clientStatus: clientStatusData
                    })
                    break;
                case 3:
                    clientStatusData.map(status => {
                        status.color = statusColor("Fail").color
                        status.status = statusColor("Fail").status
                    })
                    this.setState({
                        clientStatus: clientStatusData
                    })
                    break;
            }
        }, 1000)
    }

    render() {
        const style = {
            marginLeft: 180,
            marginTop: 5
        };
        return (
            <div>
                <Segment style={{ background: "#FFFFFF" }} basic>
                    <ClientCards clients={this.props.clients} clientStatus={this.state.clientStatus} />
                </Segment>               
            </div>
        )
    }
}

