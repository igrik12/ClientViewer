import React, { Component } from 'react'
import { Modal, Button, Input } from 'semantic-ui-react'
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//Temp for testing 
import ContentSend from 'material-ui/svg-icons/content/send';
import { fetchFleets } from '../helpers/jsonUrlLoader';


export default class AddClientModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientFleets: []
        }
        this.initialized = false
        this.urls = []
        this.addUrl = this.addUrl.bind(this)
        // this.validURL = this.validURL.bind(this)
    }

    addUrl(url) {
        // if(!this.validURL(url)){
        //     return
        // }
        this.urls.push(url.includes("http://") || url.includes("https://") ? url : "http://" + url)
        var fleets = this.state.clientFleets
        fleets.push(url)
        this.setState({
            clientFleets: fleets
        })
    }

    handleAddNewClient(name) {
        var urls = this.urls.slice()
        this.urls = []
        if(urls.length === 0){
            return
        }
        this.props.composeClient(name, urls)

    }

    close() {
        this.setState({
            open: !this.state.open
        })
    }

    validURLOld(str) {
        var url_pattern = new RegExp("([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");
        if (!url_pattern.test(str)) {
            alert("Please enter a valid URL.");
            return false;
        } else {
            return true;
        }
    }

    // validURL(textval) {
    //     var urlregex = /^(https?| http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    //     var localHostRegex = /^https?:\/\/\w/; // probably temp check
    //     if(!urlregex.test(textval)&&!localHostRegex.test(textval)){
    //         alert("Please enter a valid URL.");
    //         return false;
    //     }
    //     return true;
    // }

    render() {
        return (
            <div>
                <Modal size="tiny" open={this.props.open} >
                    <Modal.Header>
                        Add Client
                </Modal.Header>
                    <Modal.Content>
                        <Input ref="clientName" fluid placeholder='Client Name...' />
                        <br />
                        <b><p>Add Fleet Url</p></b>
                        <Input style={{ marginTop: 5 }} ref="newClient" fluid label='http://' placeholder='fleet url' />
                        <FleetList urls={this.urls} />
                        <Button style={{ marginTop: 5, marginLeft: 430 }} primary onClick={() => this.addUrl(this.refs.newClient.inputRef.value)}>Add</Button>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.props.close}>Cancel</Button>
                        <Button positive onClick={() => { this.handleAddNewClient(this.refs.clientName.inputRef.value) }}
                            icon='checkmark'
                            labelPosition='right'
                            content='Save' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

class FleetList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <List>
                        {this.props.urls.map((url, id) => {
                            if (!url || /^\s*$/.test(url) || url === "http://") {
                                return
                            }
                            return <ListItem key={id} primaryText={url} leftIcon={<ContentSend />} />
                        })}
                    </List>
                </MuiThemeProvider>
            </div>
        )
    }
}
