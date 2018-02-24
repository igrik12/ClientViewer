import React, { Component } from 'react'
import { Header, Image, Modal, Grid, Search } from 'semantic-ui-react'
import { List, ListItem } from 'material-ui/List'
import ReactJson from 'react-json-view'
import _ from 'lodash'


export default class PluginModal extends Component {

    render() {
        return (
            <div>
                <Modal size="fullscreen" trigger={<div><ListItem><b>Plugin:</b> {this.props.plugin.Identity.Name}</ListItem></div>}>
                    <Header icon='info' content='Plugin Description' />
                    <Modal.Content image scrolling>
                        <Modal.Description>
                            <Header>
                                <h2>{this.props.plugin.Identity.Name}</h2>
                            </Header>
                            <ReactJson src={this.props.plugin} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}



