import logo from './logo.svg';
import './App.css';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import { Route ,Switch } from 'react-router';



function App() {
  return (
    <div className="App">
  
      <Route exact path="/" component={CustomerForm}></Route>
      <Route exact path="/show" component={CustomerTable}></Route>
    
    
    </div>
  );
}

export default App;
