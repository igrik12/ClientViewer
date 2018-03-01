import React, { Component } from 'react'
import { Header, Image, Modal, Grid, Search } from 'semantic-ui-react'
import { List, ListItem } from 'material-ui/List'
import ReactJson from 'react-json-view'
import _ from 'lodash'


export default class PluginModal extends Component {

    render() {
        return (
            <div>
                <Modal basic size="fullscreen" trigger={<div> {this.props.plugin.name}</div>}>
                    <Header icon='info' content='Plugin Description' />
                    <Modal.Content image scrolling>
                        <Modal.Description>
                            <Header>
                                <span style={{color:"white"}}><h3>{this.props.plugin.name}</h3></span>
                            </Header>
                            <ReactJson
                                theme="google"
                                iconStyle="triangle"
                                displayDataTypes={false}
                                displayObjectSize={false}
                                src={this.props.plugin} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}



