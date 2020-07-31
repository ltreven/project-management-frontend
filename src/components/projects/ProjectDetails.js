import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
            //                                                    {...props} => so we can have 'this.props.history' in Edit.js
            //                                                                                          ^
            //                                                                                          |
            return <EditProject theProject={this.state.project} getTheProject={this.getSingleProject} {...this.props} />

        }
    }

    getSingleProject() {
        axios.get("http://localhost:3000/api/projects/" + this.state.id)
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
        axios.delete(`http://localhost:3000/api/projects/${params.id}`)
        .then( () =>{
            this.props.history.push('/projects'); // !!!         
        })
        .catch((err)=>{
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
            <div>
                <h1>Detalles del proyecto</h1>
                <h2>{this.state.project.title}</h2>
                <p>{this.state.project.description}</p>
                <hr />
                <h3>Tasks</h3>
                <ul>
                  {tasks}
                </ul>  
                <hr/>
                <div>{this.renderEditForm()} </div>
                <hr/>
                <button className="btn btn-primary" onClick={() => this.deleteProject()}>Delete project</button>
                <div>{this.renderAddTaskForm()} </div>
                <Link to={'/projects'}>Back to projects</Link>
            </div>
        )
    }

}


export default ProjectDetails