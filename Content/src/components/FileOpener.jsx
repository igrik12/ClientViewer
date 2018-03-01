import React, { PropTypes, Component } from 'react'
import { Button } from 'semantic-ui-react';


class FileOpener extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.refs.fileOpener.click();
    }

    handleChange(files) {
        var reader = new FileReader();

        reader.onload = (file) => {
        }
        reader.readAsText(files[0]);
    }
    render() {
        return (
            <div >
                <Button primary onClick={this.handleClick.bind(this)}>ADD CLIENT</Button>
                <input type="file" id="file" ref="fileOpener" onChange={(e) => this.handleChange(e.target.files).bind(this)} style={{ display: "none" }} />
            </div>
        )
    }
}

export default FileOpener