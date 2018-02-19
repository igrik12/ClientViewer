import React, { Component } from "react";
import { Label, Card, Image, Header, Button, Modal } from 'semantic-ui-react';
import ClientCardDescriptor from './ClientCardDescriptor.jsx'



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

                <Card fluid color="blue" >
                    <Card.Content>
                        <Image rounded bordered size='small' src={'https://vignette.wikia.nocookie.net/ttte/images/1/13/RosieCGIpromo2.jpg/revision/latest/scale-to-width-down/323?cb=20111113221812'} />
                        {/* <Label attached="top right" size="big" color={this.props.clientStatus[0].color} horizontal>{this.props.clientStatus[0].status}</Label> */}
                        <Card.Header style={{ marginTop: 5 }}>
                            <Header
                                as='h2'
                                content={this.props.name}
                            />
                        </Card.Header>
                        <Card.Meta>
                            Number of Fleets: {this.props.fleets.length}
                            <Card.Content style={{ marginTop: 5 }} extra>
                                <div>
                                    <Button basic color='blue'>Edit</Button>
                                </div>
                            </Card.Content>
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


