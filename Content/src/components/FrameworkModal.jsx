import React, { Component } from 'react'
import { Header, Image, Modal} from 'semantic-ui-react'
import StarterMotorConfigurations from './StarterMotorConfigurations.jsx'

export default class FrameworkModal extends Component {
    render() {
        return (
            <div>
                {/* <Modal trigger={<div>{this.props.product.Identity.Name}</div>}>
                    <Modal.Header>Product Description</Modal.Header>
                    <Modal.Content image scrolling>
                        <Image
                            size='medium'
                            src='/assets/images/image.png'
                            wrapped
                        />

                        <Modal.Description>
                            <Header><h2>{this.props.product.Identity.Name}</h2></Header>
                                {this.props.product.Frameworks.map(framework => {
                                    return <div key={framework.Identity.Name}>
                                            <b>Framework</b>: {framework.Identity.Name}
                                            <br />
                                            <hr />
                                            {<StarterMotorConfigurations key={framework.Identity.Id} configurations ={framework.StarterMotorConfigurations}/>}
                                    </div>
                                })}
                        </Modal.Description>
                    </Modal.Content>
                </Modal> */}
            </div>
        )
    }
}


