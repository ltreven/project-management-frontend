import React, { Component } from 'react'
import axios from 'axios'
import EditProject from './EditProject';
import AddTask from './AddTask';

class ProjectDetails extends Component {

    constructor(props) {
        super(props)

        console.log("props: ", props)

        this.state = {
            id: props.match.params.id,
            project: {}
        }

        this.getSingleProject = this.getSingleProject.bind(this)

    }

    renderEditForm = () => {
        if (!this.state.project.title) {
            this.getSingleProject();
        } else {
            return <EditProject
                theProject={this.state.project}
                getTheProject={this.getSingleProject}
                {...this.props} />

        }
    }

    getSingleProject() {
        axios.get("http://localhost:5000/api/projects/" + this.state.id)
            .then(response => {
                this.setState({
                    project: response.data
                })
            })

    }

    renderAddTaskForm = () => {
        if (!this.state.project.title) {
            this.getSingleProject();
        } else {
            // pass the project and method getSingleProject() as a props down to AddTask component
            return <AddTask theProject={this.state.project} getTheProject={this.getSingleProject} />
        }
    }

    componentDidMount() {
        this.getSingleProject()
    }

    deleteProject = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5000/api/projects/${params.id}`)
            .then(() => {
                this.props.history.push('/projects'); // !!!         
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        let tasks = ""
        if (this.state.project.tasks) {
            tasks = this.state.project.tasks.map((task, index) =>
                <li key={index}>{task.title}</li>)
        }
        return (
            <div className="container">
                <div style={{ width: '60%', float: "left" }}>
                    <h1>Detalles del proyecto</h1>
                    <h2>Title: {this.state.project.title}</h2>
                    <p><strong>Description:</strong> {this.state.project.description}</p>

                    <h3>Task List</h3>
                    <ul>
                        {tasks}
                    </ul>

                    <div>{this.renderAddTaskForm()} </div>

                </div>

                <div style={{ width: '40%', float: "right" }}>
                    <div>{this.renderEditForm()}</div>
                    <hr />
                    <button className="btn btn-danger" onClick={() => this.deleteProject()}>Delete project</button>
                </div>

            </div>
        )
    }

}


export default ProjectDetails