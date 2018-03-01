import React, { Component } from 'react'
import { Modal, Button, Input } from 'semantic-ui-react'
import { List, ListItem } from 'material-ui/List';


export default class AddClientModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Modal size="tiny" open={this.props.open} closeIcon>
                    <Modal.Header>
                        Add Client
                </Modal.Header>
                    <Modal.Content>
                        <b><p>Add Client Name</p></b>
                        <Input style={{ marginTop: 5 }} ref="newClient" fluid placeholder='Client Name...' />
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
