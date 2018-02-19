import React, { Component } from 'react'
import { Sidebar, Segment, Menu, Icon, Divider } from 'semantic-ui-react'
import FleetLabels from './FleetLabels'

export default class ClientPageSideBar extends Component {
    render() {
        const style = {
            marginLeft: 180,
            marginTop: 5
        };
        return (
            <div>
                <Sidebar.Pushable as={Segment} >
                    <Sidebar as={Segment} animation='push' visible={this.props.toggle} icon='labeled' vertical >
                        <Menu vertical fluid fixed="top">
                            <Menu.Item name='client'>
                                <Icon name='users' />
                                <h2>Clients</h2>
                            </Menu.Item>
                            <Menu.Item position="left" name='clients'>
                                <FleetLabels fleets={this.props.fleets}  />
                            </Menu.Item>
                        </Menu>
                    </Sidebar>

                    <Sidebar.Pusher style={{ minHeight: 550 }}>
                        <Segment style={{ background: "#FFFFFF" }} basic>
                        
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}