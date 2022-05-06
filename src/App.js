import logo from './logo.svg';
import './App.css';
import GestionTodo from './Todos/GestionTodo';
import RandomXkcd from './RandomXkcd';
import ModalEditTodo from './Todos/ModalEditTodo';

function App() {
  
  return (  
    <div className="App p-3" id='app'>
      <GestionTodo/>
      <h1>XKCD aléatoire:</h1>
      <RandomXkcd/>
    </div>
  );
}

export default App;
