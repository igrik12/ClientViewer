import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import ClientCard from './ClientCard.jsx'


export default class ClientCards extends Component {
    render() {
        return (
            <div>
                <Card.Group>
                    {this.props.clients.map((client) => {

                        return <ClientCard 
                        name={client.name} 
                        fleets={client.fleets} 
                        key={client.name} 
                        deleteClient = {this.props.deleteClient}
                        clientStatus ={this.props.clientStatus}/>
                    })}
                </Card.Group>
            </div>
        )
    }
}

