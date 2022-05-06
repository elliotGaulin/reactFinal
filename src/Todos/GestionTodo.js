import axios from 'axios';
import React from 'react';
import Api from '../utlis/Api';
import FormTodo from './FormTodo';
import ModalEditTodo from './ModalEditTodo';
import TableTodo from './TableTodo.js';

class GestionTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            selectedUser: -1,
            password: '',
            openEditModal: false,
            editTodo: {},
            nouveauDescription: '',
            nouveauNom: '',
            nouveauDate: ''
        }

        this.getTodos = this.getTodos.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.closeEditModal = this.closeEditModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.submitModal = this.submitModal.bind(this);

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNomChange = this.handleNomChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.submitNewTodo = this.submitNewTodo.bind(this);
    }
    
    componentDidMount() {
        this.getTodos();
    }

    handleUserChange(username) {
        this.setState({
            selectedUser: username
        })
        if(username == -1){
            this.getTodos();
        }else{
            this.getTodosUser(username);
        }
    }

    handlePasswordChange(password) {
        this.setState({
            password: password
        })
    }

    openEditModal(todo){

        if(this.state.selectedUser == -1){
            alert("Vous devez sélectionner un utilisateur et entrer son mot de passe");
        }else if(this.state.password == ''){
            alert("Vous devez saisir un mot de passe");
        }else{
            this.setState({
                openEditModal: true,
                editTodo: todo
            })   
        }
    }

    closeEditModal(){
        console.log("closing");
        this.setState({
            openEditModal: false,
        })
    }

    submitModal(todo){
        console.log("submit");
        Api.put('/todo/'+todo.id, todo, 
            {
                auth: {
                    username: this.state.selectedUser,
                    password: this.state.password
                }
            }
        )
        .then(response => {
            console.log(response);
            if(response.status == 200){
                if(this.state.selectedUser == -1){
                    this.getTodos();
                }else{
                    this.getTodosUser(this.state.selectedUser);
                }
            } else if(response.status == 401){
                alert(response.data);
            }
        })
        .catch(error => {
            if(error.response.status == 401){
                alert(error.response.data);
            }
            console.log(error);
        })
    }

    getTodos(){
        Api.get('/todo')
        .then(response => {
            this.setState({
                todos: response.data
            })
        })
    }

    getTodosUser(username){
        Api.get('/todo?user=' + username)
        .then(response => {
            this.setState({
                todos: response.data
            })
        })
    }


    deleteTodo(id){
        Api.delete('/todo/' + id)
        .then(response => {
            this.state.selectedUser == -1 ? this.getTodos() : this.getTodosUser(this.state.selectedUser);
        })
    }

    handleDescriptionChange(description) {
        this.setState({
            nouveauDescription: description
        })
    }
    handleNomChange(nom) {
        this.setState({
            nouveauNom: nom
        })
    }
    handleDateChange(date) {
        this.setState({
            nouveauDate: date
        })
    }

    submitNewTodo(){
        if(this.state.selectedUser == -1){
            alert("Vous devez sélectionner un utilisateur");
            return;
        }
        if(this.state.nouveauNom == ''){
            alert("Vous devez saisir un nom pour le todo");
            return;
        }
        Api.request('/todo', {
            method: 'POST',
            data: {
                description: this.state.nouveauDescription,
                nom: this.state.nouveauNom,
                date: this.state.nouveauDate,
                user: this.state.selectedUser
            },
            auth: {
                username: this.state.selectedUser,
                password: this.state.password
            }
        })
        .then(response => {
            this.state.selectedUser == -1 ? this.getTodos() : this.getTodosUser(this.state.selectedUser);
        })
        .catch(error => {

            console.log("hehehe");
        })

    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        <h1>GESTION DES TODOS</h1>
                    </div>
                </div>
                <div className='row text-left'>
                    <div className='col-md-8 offset-md-2'>
                        <FormTodo 
                            handleUserChange={this.handleUserChange}
                            handlePasswordChange={this.handlePasswordChange} 
                            handleDateChange={this.handleDateChange}
                            handleNomChange={this.handleNomChange}
                            handleDescriptionChange={this.handleDescriptionChange}
                            handleSubmit={this.submitNewTodo}
                            selectedUser={this.state.selectedUser}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        <h2>Liste des todos</h2>
                        <TableTodo todos={this.state.todos} deleteTodo={this.deleteTodo} openEditModal={this.openEditModal}/>
                        <ModalEditTodo
                            openModal={this.openEditModal}
                            closeModal={this.closeEditModal}
                            isOpen={this.state.openEditModal}
                            todo={this.state.editTodo}
                            submitModal = {this.submitModal}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

export default (GestionTodo);
