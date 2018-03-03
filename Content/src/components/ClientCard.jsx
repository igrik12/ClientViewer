import React, { Component } from "react"
import { Label, Card, Header, Icon, Dimmer, Segment, Loader } from 'semantic-ui-react'
import FleetDescriptor from './FleetDescriptor.jsx'
import Train from 'react-icons/lib/fa/train'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import Delete from 'material-ui/svg-icons/action/delete'
import Update from 'material-ui/svg-icons/action/update'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Button, Modal } from 'semantic-ui-react'
import SearchPlugin from './SearchPlugin.jsx'
var fileDownload = require('js-file-download')
var linq = require('mini-linq-js')


export default class ClientCard extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, triggerDownload: false, openDelete: false, openRefresh: false, refreshing: false, fleets: [] }
        this.open = this.open.bind(this);
        this.openDownloadWindow = this.openDownloadWindow.bind(this);
        this.close = this.close.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
        this.refreshDatabase = this.refreshDatabase.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentWillMount() {
        this.setState({
            fleets: this.props.fleets
        })
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

    deleteClient() {
        this.setState({
            openDelete: true
        })
    }

    refreshDatabase() {
        this.setState({
            openRefresh: !this.state.openRefresh
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

    handleRefresh() {
        fetch("Database/Refresh/" + this.props.name)
            .catch(error => { console.log(error) })
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    var found = data[this.props.name];

                    if (found) {
                        this.setState({
                            fleets: found,
                            refreshing: false,
                            openRefresh: false
                        })
                    } else {
                        this.setState({
                            refreshing: false,
                            openRefresh: false
                        })
                    }
                }, 3000)

            })
        this.setState({
            refreshing: true
        })
    }


    render() {
        const { triggerDownload, openDelete, openRefresh, refreshing } = this.state

        if (refreshing) {
            return <div>
                <Modal open={refreshing}>
                    <Dimmer active>
                        <Loader size='massive'>Refreshing {this.props.name}'s database</Loader>
                    </Dimmer>
                </Modal>
            </div>
        }


        return (
            <Card fluid style={{ width: "48%", marginTop: 15 }} color="blue" >
                <Card.Content>
                    <Card.Header style={{ marginTop: 35 }}>
                        <MuiThemeProvider>
                            <FloatingActionButton onClick={this.openDownloadWindow} style={{ float: "right" }} mini={true}>
                                <FileDownload />
                            </FloatingActionButton>
                            <FloatingActionButton onClick={this.refreshDatabase} style={{ float: "right", marginRight: 6 }} mini={true}>
                                <Update />
                            </FloatingActionButton>
                            <FloatingActionButton secondary={true} onClick={this.deleteClient} style={{ float: "right", marginRight: 6 }} mini={true}>
                                <Delete />
                            </FloatingActionButton>
                        </MuiThemeProvider>
                        <div>
                            <Header as='h2' content={this.props.name} />
                        </div>
                    </Card.Header>
                    <Card.Meta style={{ marginTop: 10 }}>
                        <SearchPlugin fleets={this.state.fleets} />
                    </Card.Meta>
                    <br />
                    <hr />
                    <Card.Description>
                        <br />
                        <div>
                            <FleetDescriptor fleets={this.state.fleets} />
                        </div>
                        <Modal size={"small"} open={triggerDownload} onClose={this.close} closeIcon>
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


                        <Modal size={"small"} open={openDelete} onClose={this.closeDelete} closeIcon>
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

                        <Modal size={"small"} open={openRefresh} onClose={this.refreshDatabase} closeIcon>
                            <Modal.Header>
                                Refresh Database
                            </Modal.Header>
                            <Modal.Content>
                                <p>Are you sure you want to refresh {this.props.name} database ?</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button negative onClick={this.refreshDatabase}>
                                    No
                             </Button>
                                <Button positive onClick={this.handleRefresh} icon='checkmark' labelPosition='right' content='Yes' />
                            </Modal.Actions>
                        </Modal>
                    </Card.Description>
                </Card.Content>
            </Card>

        )
    }
}



