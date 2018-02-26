import React, { Component } from 'react'
import ClientPageHeader from './ClientPageHeader'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import ClientPageSideMenu from './ClientPageSideMenu'

export default class ClientPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle:false
        }
        this.toggleSide = this.toggleSide.bind(this)
    }

    toggleSide(){
        this.setState({
            toggle:!this.state.toggle
        })
    }

    render() {
        return (
            <div>
                <ClientPageHeader clientName ={this.props.location.state.ClientName} toggle={this.toggleSide} />
                <ClientPageSideMenu fleets={this.props.location.state.Fleets} toggle={this.state.toggle}/>
            </div>
        )
    }
}