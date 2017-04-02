import React from 'react';
import { Link } from 'react-router';


const UserItem = ({ users, select }) =>(
  <div>

  { users.map( (user,id) => (
      <div key={id} className="panel panel-default">
      <div className="panel-heading">{ user.name }</div>
        { !select ?
          <div className="panel-body">Managed By
            { user.manager ?
              <Link to='users/edit'> { user.manager.name }</Link> : <Link to='users/edit'> nobody</Link>
            }
          </div>
          : select(user)
        }
      </div>
      ))
  }
  </div>
)

export default UserItem;
