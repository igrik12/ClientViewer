import React, { Component } from "react"
import { Label, Card, Image, Header } from 'semantic-ui-react'
import ClientCardDescriptor from './ClientCardDescriptor.jsx'
import Train from 'react-icons/lib/fa/train'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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

                <Card style={{ width: 700, marginTop: 15 }} color="blue" >
                    <Card.Content>
                        <Card.Header style={{ marginTop: 35 }}>
                            <MuiThemeProvider>
                                <FloatingActionButton style={{float:"right"}} mini={true}>
                                    <FileDownload />
                                </FloatingActionButton>
                            </MuiThemeProvider>
                            <Header as='h2' content={this.props.name} />
                        </Card.Header>
                        <Card.Meta style={{ paddingTop: 35 }}>
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


