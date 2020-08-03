import React, { Component } from 'react';
import axios from 'axios';

class AddTask extends Component {
    constructor(props) {
        super(props);          
        this.state = { 
            title: "", 
            description: "", 
            isShowing: false
        };
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const projectID = this.props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
        // it has to be the 'id' because we are referencing project 
        // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})

        // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route, 
        // so the names have to match
        axios.post("http://localhost:5000/api/tasks", { title, description, projectID })
        .then(() => {
            // after submitting the form, retrieve project one more time so the new task is displayed as well 
            //              |
            this.props.getTheProject();
            this.setState({ title: "", description: "" });
        })
        .catch(error => console.log(error))
        this.toggleForm()
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggleForm = () => {
        if (!this.state.isShowing) {
            this.setState({ isShowing: true });
        } else {
            this.setState({ isShowing: false });
        }
    }

    showAddTaskForm = () => {
        if(this.state.isShowing){
        return (
            <div>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Task</h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input type="text" 
                                        className="form-control"
                                        name="title" 
                                        value={this.state.title} 
                                        onChange={e => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea name="description" 
                                        className="form-control"
                                        value={this.state.description} 
                                        onChange={e => this.handleChange(e)} />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" onClick={() => this.toggleForm()}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
    }

    render() {
        return (
            <div>
                <button 
                    className="btn btn-info" 
                    onClick={() => this.toggleForm()}>Add task</button>
                {this.showAddTaskForm()}
            </div>
        )
    }
}

export default AddTask;