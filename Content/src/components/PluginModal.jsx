import React, { Component } from 'react'
import { Header, Image, Modal} from 'semantic-ui-react'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ReactJson from 'react-json-view'

export default class PluginModal extends Component {
    render() {
        return (
            <div>
                <Modal trigger={<div>{this.props.plugin.Identity.Name}</div>}>
                    <Modal.Header>Plugin Description</Modal.Header>
                    <Modal.Content image scrolling>
                        <Image
                            size='medium'
                            src={<ActionInfo />}
                            wrapped
                        />

                        <Modal.Description>
                            <Header><h2>{this.props.plugin.Identity.Name}</h2></Header>
                            <ReactJson src={this.props.plugin} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}


