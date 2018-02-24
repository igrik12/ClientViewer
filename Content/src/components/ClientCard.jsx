import React, { Component } from "react";
import { Label, Card, Image, Header } from 'semantic-ui-react';
import ClientCardDescriptor from './ClientCardDescriptor.jsx'
import Train from 'react-icons/lib/fa/train';

export default class ClientCard extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
        this.open = this.open.bind(this)
    }

    open() {
        this.setState({
            open: !this.state.open
        })
    }

    some(deleteFunc, open) {
        deleteFunc
        open
    }
	
    render() {
        var divStyle = {
            marginLeft: '30px'
        };

        return (
            <div style={divStyle}>

                <Card style={{width:450}} color="blue" >
                    <Card.Content>
                        <Card.Header style={{ marginTop: 5 }}>
                            <Header
                                as='h2'
                                content={this.props.name}
                            />
                        </Card.Header>
                        <Card.Meta>
                            Number of Fleets: {this.props.fleets.length}
                        </Card.Meta>
                        <hr />
                        <Card.Description>
                            <br />
                            <div>
                                <ClientCardDescriptor fleets={this.props.fleets} />
                            </div>
                        </Card.Description>
                    </Card.Content>

                </Card>
            </div>
        )
    }
}


