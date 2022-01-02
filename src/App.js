import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/HomeComoponents/Home/Home';
import AuthProvider from './context/AuthProvider'
import Bikes from './Pages/BikeComponents/Bikes/Bikes'
import Register from './Pages/Login/Register/Register';
import Signin from './Pages/Login/Signin/Signin';
import Dashboard from './Pages/Dashboard/Dashboard';
import Purchase from './Pages/Purchase/Purchase';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/bikes">
            <Bikes />
          </Route>
          <Route exact path="/login">
            <Signin />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute  path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/purchase/:id">
            <Purchase />
          </PrivateRoute>

        </Switch>

      </BrowserRouter>
    </AuthProvider>
  </div>
  );
}

export default App;
