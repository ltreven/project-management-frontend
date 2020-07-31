import React, { Component } from 'react'

export class FileUpload extends Component {

    render() {
        return (
            <div>
                <h1>File Upload</h1>
                <form>
                    <input type="text" name="name" />
                    <input type="text" name="description" />
                    <input type="file" name="imageUrl" />
                    <input type="submit"  value="Save" />
                </form>
            </div>
        )
    }
}

export default FileUpload
