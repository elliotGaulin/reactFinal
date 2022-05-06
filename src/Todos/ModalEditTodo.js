import React from 'react';
import Modal from 'react-modal';
import Api from '../utlis/Api';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


class ModalEditTodo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.todo.id,
            nom: this.props.todo.nom,
            description: this.props.todo.description,
            date: this.props.todo.date,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitModal = this.submitModal.bind(this);
    }

    openModal() {
        this.props.openModal();
        this.setState({
            id: this.props.todo.id,
            nom: this.props.todo.nom,
            description: this.props.todo.description,
            date: this.props.todo.date,
        })
    }

    closeModal() {
        this.props.closeModal();
    }

    submitModal(){
        this.closeModal();
        this.props.submitModal(this.state);
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    onAfterOpen={this.openModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    appElement={document.getElementById('app')}
                >
                <div className='text-center'>
                    <h3>Edition d'un todo</h3>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label' htmlFor="nom">Nom</label>
                            <input className='form-control' type='text' name='nom' placeholder='Nom' value={this.state.nom} onChange={(e) => this.setState({nom: e.target.value})}/>
                        </div>
                        <div className='form-group mb-4'>
                            <label className='form-label' htmlFor="description">Description</label>
                            <textarea className='form-control' name='description' value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}>
                            </textarea>
                        </div>
                        <div className='form-group mb-4'>
                            <label className='form-label' htmlFor="date">Date</label>
                            <input className='form-control' type='datetime-local' name='date' value={this.state.date} onChange={(e) => {this.setState({date: e.target.value}); console.log(e.target.value)}}/>
                        </div>
                    </form>
                    <button className="btn btn-primary mr-2" onClick={this.submitModal}>Soumettre</button>
                    <button className="btn btn-cancel" onClick={this.closeModal}>Annuler</button>
                </div>
                </Modal>
            </div>
        )
    }
}

export default (ModalEditTodo);
