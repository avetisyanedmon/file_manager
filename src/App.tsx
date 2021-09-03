import {FC} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Content from './pages/Content/Content';
import AddInputs from './pages/AddInputs/AddInputs';
import BreadCrumb from './components/BreadCrumb/BreadCrumb';


const App:FC = () => {


  return (
    <Router>
      <BreadCrumb/>
      <Switch>
        <Route path='/' exact component={AddInputs}/>
        <Route path='/:id' component={Content}/>
      </Switch>
    </Router>

  );
}

export default App;
