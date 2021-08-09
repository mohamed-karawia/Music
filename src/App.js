import { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// Pages
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Membership from './pages/Membership/Membership';
import Beats from './pages/Beats/Beats';
import Policy from './pages/Policy/Policy';
import Verify from './pages/Verify/Verify';
// Axios
import axios from 'axios';
// Redux
import * as actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authCheckState())
  }, [dispatch])

  const isAuth = useSelector(state => state.auth.token !== null);
  const token = useSelector(state => state.auth.token)

  axios.defaults.baseURL = 'https://beats-for-minds.herokuapp.com';
  if (token){
    axios.defaults.headers.common['Authorization'] = `auth ${token}`;

  }

  let routes = (
    <Switch>
        <Route path="/policy" component={Policy}></Route>
        <Route path="/beats" component={Beats}></Route>
        <Route path="/membership" component={Membership} hideMemberShipImage={false}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
  )
  if(isAuth){
    routes = (
      <Switch>
      <Route path="/verify" component={Verify}></Route>
      <Route path="/policy" component={Policy}></Route>
      <Route path="/beats" component={Beats}></Route>
      <Route path="/membership" component={Membership} hideMemberShipImage={false}></Route>
      <Redirect to="/beats?page=1&tab=home" />
    </Switch>
    )
  }

  return (
    <Router>
      {routes}
    </Router>
  );
}

export default App;
