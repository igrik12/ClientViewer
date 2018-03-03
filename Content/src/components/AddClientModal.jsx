import React, { Component } from 'react'
import { Modal, Button, Input } from 'semantic-ui-react'
import { List, ListItem } from 'material-ui/List';


export default class AddClientModal extends Component {
    render() {
        return (
            <div>
                <Modal size="mini" open={this.props.open}>
                    <Modal.Content>
                        <b><h3>Add Client</h3></b>
                        <Input icon='users' iconPosition='left' style={{ marginTop: 15 }} ref="newClient" fluid placeholder='Enter client name...' />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.props.close}>Cancel</Button>
                        <Button positive onClick={() => this.props.addClientByName(this.refs.newClient.inputRef.value)}
                            icon='checkmark'
                            labelPosition='right'
                            content='Add' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
