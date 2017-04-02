import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
import axios from 'axios';
import Home from './Home';
import Users from './Users';
import UsersEdit from './UsersEdit';


class App extends React.Component{
  constructor(props){
    super();
    this.state = {
      users: []
    }
    this.handleManagerSave = this.handleManagerSave.bind(this);
  }

  componentDidMount(){
    axios.get('/api/users')
    .then( response => response.data)
    .then( users => this.setState( { users } ))
  }

  handleManagerSave(selectedManager, employeeId){

    selectedManager === '' ? selectedManager=null : selectedManager;
    //console.log('manager:',selectedManager,'employee:', employeeId)
    axios.put(`/api/users/${ employeeId }`,{ managerId: selectedManager })
    .then( response => response.data)
    .then( users => this.setState({ users }))
    .then( () => this.props.router.push('/users'))
  }

  render(){
    const obj = Object.assign({}, this.state, { handleManagerSave: this.handleManagerSave });
    const pathName = this.props.router.location.pathname;
    const activePage = pathName === '/';

    return(
      <div className="container">
        <h3>Users Managers React</h3><br/>
        <ul className="nav nav-tabs" style={{ marginBottom: '10px' }}>
          <li className={ activePage ? 'active' : '' }>
            <Link  to="/">Home</Link>
          </li>
          <li className={ !activePage ? 'active' : '' }>
            <Link to="users">Users ({ this.state.users.length })</Link>
          </li>
        </ul>
        { this.props.children && React.cloneElement(this.props.children, obj )}

      </div>
    )
  }

  }

const route = (
  <Router history={hashHistory}>
    <Route path="/" component = { App }>
      <IndexRoute component = { Home }/>
      <Route path="users" component = { Users }/>
      <Route path="users/edit" component= { UsersEdit } />
    </Route>
  </Router>
)

render(route, document.getElementById('root'));
