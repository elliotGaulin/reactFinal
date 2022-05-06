import React from 'react';
import LigneTodo from './LigneTodo';
class TableTodo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let todos = [];
        this.props.todos.forEach(todo => {
            todos.push(<LigneTodo todo={todo} key={todo.id} deleteTodo={this.props.deleteTodo} openEditModal={this.props.openEditModal}/>)
        });


        return (
            <table className='table table-striped table-bordered table-hover'>
                <thead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Nom</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Utilisateur</th>
                        <th scope='col'>Modifier</th>
                        <th scope='col'>Supprimer</th>
                    </tr>
                </thead>
                    <tbody>
                        {todos}
                    </tbody>
            </table>
        )
    }
}

export default (TableTodo);