import React, { Component } from 'react'
import { Radio, Icon, Header, Segment, Menu, Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class ClientPageHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'products'
        }
    }


    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        var styles = {
            background: "#1A80BC"
        };

        const { activeItem } = this.state

        return (
            <div >
                <Segment style={styles}>
                    <Header as='h3' icon textAlign='center'>
                        <Icon inverted name='user' circular />
                        <span style={{ color: "#FFFFFF" }}>{this.props.clientName}</span>
                    </Header>
                    <Menu pointing>
                        <Menu.Item name='products' active={activeItem === 'products'} onClick={this.handleItemClick} />
                        <Menu.Item name='frameworks' active={activeItem === 'framworks'} onClick={this.handleItemClick} />
                        <Menu.Item name='starter motors' active={activeItem === 'starter motors'} onClick={this.handleItemClick} />
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Link to="/"><Button primary>Home</Button></Link>
                                <span style={{ marginLeft: 5 }}><Input icon='search' placeholder='Search...' /></span>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <Radio toggle onClick={this.props.toggle}>Clients</Radio>
                </Segment>
            </div>)
    }
}
