import React,{Component} from 'react';
import { Accordion, Icon, Label, Button } from 'semantic-ui-react'

export default class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.open ? 0 : -1,
            title: this.props.title
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, titleProps) {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
        if (this.props.opened) {
            this.props.opened(activeIndex === 0);
        }
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <Accordion fluid styled>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    {!this.props.hideIcon && <Icon name='dropdown' />}{this.props.title}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    {activeIndex === 0 && this.props.children}
                </Accordion.Content>
            </Accordion>
        );
    }
}
