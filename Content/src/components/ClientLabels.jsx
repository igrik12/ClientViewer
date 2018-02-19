import React, { Component } from 'react'
import { List, Segment } from 'semantic-ui-react'
import ClientLabel from './ClientLabel.jsx'



export default class ClientLabels extends Component {
    render() {
        return (
            <div>
                <List >
                    {this.props.clients && this.props.clients.map((client, id) => {
                        var found = this.props.clientStatus.find(x => x.clientName === client.name)

                        var statusColor = found ? found.color : "yellow"
                        return <List.Item key={client.name}>
                            <List.Content>
                                <Segment inverted color={statusColor}>
                                    <ClientLabel client={client} name={client.name} key={id} clientStatus={this.props.clientStatus} />
                                </Segment>
                            </List.Content>
                        </List.Item>
                    })}
                </List>
            </div>
        )
    }
}
