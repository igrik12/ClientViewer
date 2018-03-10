import React, { Component } from 'react'
import { Header, Modal,Icon} from 'semantic-ui-react'
import ReactJson from 'react-json-view'


export default class PluginModal extends Component {

    render() {
        return (
            <div>
                <Modal basic size="fullscreen" trigger={<div> {this.props.plugin.Identity.Name}</div>}>
                    <Header icon='info' content='Plugin Description' />
                    <Modal.Content image scrolling>
                        <Modal.Description>
                            <Header>
                                <span style={{color:"white"}}><h3>{this.props.plugin.Identity.Name}</h3></span>
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



