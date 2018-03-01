import React, { Component } from "react"
import { Label, Card, Image, Header } from 'semantic-ui-react'
import ClientCardDescriptor from './ClientCardDescriptor.jsx'
import Train from 'react-icons/lib/fa/train'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import Delete from 'material-ui/svg-icons/action/delete'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Button, Modal } from 'semantic-ui-react'
var fileDownload = require('js-file-download');


export default class ClientCard extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, triggerDownload: false, openDelete: false }
        this.open = this.open.bind(this)
        this.openDownloadWindow = this.openDownloadWindow.bind(this)
        this.close = this.close.bind(this)
        this.handleDownload = this.handleDownload.bind(this)
        this.closeDelete = this.closeDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.promptClientDelete = this.promptClientDelete.bind(this);
    }

    open() {
        this.setState({
            open: !this.state.open
        })
    }

    close() {
        this.setState({ triggerDownload: false })
    }

    closeDelete() {
        this.setState({ openDelete: false })
    }

    handleDelete() {
        this.props.deleteClient(this.props.name);
        this.setState({
            openDelete: false
        })
    }

    promptClientDelete() {
        this.setState({
            openDelete: true
        })
    }

    openDownloadWindow() {
        this.setState({
            triggerDownload: true
        })
    }

    handleDownload() {
        fileDownload(JSON.stringify(this.props.fleets, null, 2), this.props.name + ".json");
        this.setState({
            triggerDownload: false
        })
    }


    render() {
        const { triggerDownload, openDelete } = this.state
        return (
            <Card fluid style={{ width: "48%", marginTop: 15 }} color="blue" >
                <Card.Content>
                    <Card.Header style={{ marginTop: 35 }}>
                        <MuiThemeProvider>
                            <FloatingActionButton onClick={this.openDownloadWindow} style={{ float: "right" }} mini={true}>
                                <FileDownload />
                            </FloatingActionButton>
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <FloatingActionButton onClick={this.promptClientDelete} style={{ float: "right", marginRight: 10 }} mini={true}>
                                <Delete />
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
                        <Modal size={"mini"} open={triggerDownload} onClose={this.close}>
                            <Modal.Header>
                                Download database
                          </Modal.Header>
                            <Modal.Content>
                                <p>Are you sure you want to download {this.props.name} database?</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button negative onClick={this.close}>
                                    No
                             </Button>
                                <Button positive onClick={this.handleDownload} icon='checkmark' labelPosition='right' content='Yes' />
                            </Modal.Actions>
                        </Modal>


                        <Modal size={"mini"} open={openDelete} onClose={this.closeDelete}>
                            <Modal.Header>
                                Delete {this.props.name}
                            </Modal.Header>
                            <Modal.Content>
                                <p>Are you sure you want to delete {this.props.name} client?</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button negative onClick={this.closeDelete}>
                                    No
                             </Button>
                                <Button positive onClick={this.handleDelete} icon='checkmark' labelPosition='right' content='Yes' />
                            </Modal.Actions>
                        </Modal>
                    </Card.Description>
                </Card.Content>
            </Card>

        )
    }
}



