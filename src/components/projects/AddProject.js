import React, { Component } from 'react'
import axios from 'axios'

export class AddProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            title: this.state.title,
            description: this.state.description
        }
        axios.post("http://localhost:5000/api/projects/", body)
            .then(response => {
                // limpiar el formulario.
                this.setState({
                    title: '',
                    description: ''
                })
                this.props.updateData()
            })

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text"
                            name="title"
                            value={this.state.title}
                            className="form-control"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                            name="description"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleChange} />
                        <br />
                        <input type="submit" 
                            className="btn btn-primary"
                            value="Create Project" />
                    </div>
                </form>
            </div>
        )
    }
}

export default AddProject
