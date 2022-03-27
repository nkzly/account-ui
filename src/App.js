import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Customer from "./Customer";
import Account from "./Account";

function App() {
  return (
          <Router>
              <Switch>
                  <Route path='/' exact component={Customer}/>
                  <Route path='/account/:id' exact component={Account}/>
              </Switch>
          </Router>
  );
}

export default App;
