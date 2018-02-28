import React, { PropTypes, Component } from 'react'
import { Button } from 'semantic-ui-react';


class FileOpener extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        fetch(e.value)
            .then((res) => res.json())
            .then((data) => {
                console.log('data:', data);
            })
        console.log(this.refs.fileUploader.click());
    }

    handleChange(files){
        console.log(files)
        var reader = new FileReader();

        reader.onload = (file) => {
            console.log(file.target.result)
        }

        reader.readAsText(files[0]);
        // fetch(files[0])
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log('data:', data);
        //     })
    }
    render() {
        return (

            <div className="add-media" onClick={this.handleClick.bind(this)}>
                <Button orimary>Click Me</Button>
                <input type="file" id="file" ref="fileUploader" onChange={ (e) => this.handleChange(e.target.files).bind(this) } style={{ display: "none" }} />
            </div>
        )
    }
}

export default FileOpener