import React, { Component } from 'react'
import { Header, Image, Modal} from 'semantic-ui-react'
import { List, ListItem } from 'material-ui/List'
import ReactJson from 'react-json-view'


export default class PluginModal extends Component {
    render() {
        return (
            <div>
                <Modal trigger={<div><ListItem><b>Plugin:</b> {this.props.plugin.Identity.Name}</ListItem></div>}>
                    <Modal.Header>Plugin Description</Modal.Header>
                    <Modal.Content image scrolling>
                        <Modal.Description>
                            <Header><h3>{this.props.plugin.Identity.Name}</h3></Header>
                            <ReactJson src={this.props.plugin} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}


