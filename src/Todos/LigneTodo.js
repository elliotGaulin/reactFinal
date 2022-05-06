import React from 'react';
class LigneTodo extends React.Component {

    constructor(props) {
        super(props);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
    }

    onClickDelete = () => {
        this.props.deleteTodo(this.props.todo.id);
    }

    onClickEdit = () => {
        this.props.openEditModal(this.props.todo);
    }
    render() {

        return (
            <tr>
                <th scope="row">{this.props.todo.id}</th>
                <td>{this.props.todo.nom}</td>
                <td>{this.props.todo.description}</td>
                <td>{this.props.todo.date}</td>
                <td>{this.props.todo.nom_utilisateur}</td>
                <td>
                    <button className='btn btn-primary btn-small mr-2' onClick={this.onClickEdit}>Modifier</button>
                </td>
                <td>
                    <button className='btn btn-danger btn-small' onClick={this.onClickDelete} >Supprimer</button>
                </td>
            </tr>
        )
    }
}

export default (LigneTodo);
