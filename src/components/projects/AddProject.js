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
        axios.post("http://localhost:3000/api/projects/", body)
        .then(response => {
            // limpiar el formulario.
            this.setState({
                title: '',
                description: ''
            })
            this.props.updateData()
        })

    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input type="text" 
                        name="title" 
                        value={this.state.title} 
                        onChange={this.handleChange} />

                    <label>Description</label>
                    <input type="text" 
                        name="description" 
                        value={this.state.description} 
                        onChange={this.handleChange} />
                    <input type="submit" value="Create Project" />
                </form>
            </div>
        )
    }
}

export default AddProject
