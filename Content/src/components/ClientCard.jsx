import React, { Component } from "react"
import { Label, Card, Image, Header } from 'semantic-ui-react'
import ClientCardDescriptor from './ClientCardDescriptor.jsx'
import Train from 'react-icons/lib/fa/train'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Button, Modal } from 'semantic-ui-react'

export default class ClientCard extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, triggerDownload: false }
        this.open = this.open.bind(this)
        this.handleDownload = this.handleDownload.bind(this)
        this.close = this.close.bind(this)
    }

    open() {
        this.setState({
            open: !this.state.open
        })
    }

    close() {
        this.setState({ triggerDownload: false })
    }


    handleDownload(name) {
        console.log(name)
        this.setState({
            triggerDownload: true
        })
    }

    render() {
        const { triggerDownload } = this.state
        var divStyle = {
            marginLeft: '30px'
        };

        return (
            <div style={divStyle}>
                <Card style={{ width: 700, marginTop: 15 }} color="blue" >
                    <Card.Content>
                        <Card.Header style={{ marginTop: 35 }}>
                            <MuiThemeProvider>
                                <FloatingActionButton onClick={() => this.handleDownload(this.props.name)} style={{ float: "right" }} mini={true}>
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

                <Modal size={"mini"} open={triggerDownload} onClose={this.close}>
                    <Modal.Header>
                        Download database
                     </Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to download {this.props.name} database?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative>
                            No
                       </Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}



