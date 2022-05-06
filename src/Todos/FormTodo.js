import React from 'react';
import Api from '../utlis/Api';

class FormTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
    handleSelectChange(event) {
        this.props.handleUserChange(event.target.value);
    }

    handlePasswordChange(event) {
        this.props.handlePasswordChange(event.target.value);
    }

    componentDidMount() {
        //get users
        Api.get('/users')
        .then(response => {
            this.setState({
                users: response.data
            })
        })
    }

    render() {
        //create a select line
        let userOptions = [];
        this.state.users.forEach(user => {
            userOptions.push(<option value={user.nom} key={user.id}>{user.nom}</option>)
        });


        return (
            <form>
                <div className='form-group mb-2'>    
                    <select className="form-control" name="user" id="user" onChange={this.handleSelectChange}>
                        <option value={-1}>Tous les utilisateurs</option>
                        {userOptions}
                    </select>
                </div>
                <div className='form-group mb-4'>    
                    <label className='form-label' htmlFor="password">Mot de passe</label>
                    <input className='form-control' type='password' name='password' placeholder='Mot de passe' onChange={this.handlePasswordChange}/>
                </div>
                <h2>Nouveau Todo</h2>
                <div className='form-group mb-4'>
                    <label className='form-label' htmlFor="nom">Nom</label>
                    <input className='form-control' type='text' name='nom' placeholder='Nom' value={this.props.nom} onChange={(e) => this.props.handleNomChange(e.target.value)}/>
                </div>
                <div className='form-group mb-4'>
                    <label className='form-label' htmlFor="description">Description</label>
                    <textarea className='form-control' name='description' value={this.props.description} onChange={(e) => this.props.handleDescriptionChange(e.target.value)}>
                    </textarea>
                </div>
                <div className='form-group mb-4'>
                    <label className='form-label' htmlFor="date">Date</label>
                    <input className='form-control' type='datetime-local' name='date' value={this.props.date} onChange={(e) => this.props.handleDateChange(e.target.value)}/>
                </div>     
                <div className='form-group mb-4'>
                    <button type='button' className='btn btn-primary' onClick={this.props.handleSubmit}>Enregistrer</button>
                </div>
            </form>
        )
    }
}

export default (FormTodo);
