import React from 'react';
import UserItem from './UserItem';
import { Link } from 'react-router';

const UsersEdit = (props) => {
  const usersWithNone = [{ id: '', name:'None' }].concat(props.users);

  const onManagerSelect= (e) => {
    props.handleManagerSave(e.target.value, e.target.id)
  }

  const select = (employee) => (

    <div className="panel-body">
      <div className='form-group'>
        <select className='form-control' defaultValue={ employee.manager ? employee.manager.id : '' } id={ employee.id } onChange={ onManagerSelect }>
        { usersWithNone.map( (user,id) =>(
            <option key={ id } value={ user.id }>{ user.name }</option>
          ))
        }
        </select>
      </div>
      <Link to="users">Cancel</Link>
    </div>
  )


  return(
    <UserItem users={ props.users } select={ select } />
  )
}

export default UsersEdit;

/*const select = (employee) => (
      <div className="panel-body">
        <div className='form-group'>
          { employee.manager && employee.manager.id === employee.id ?
            <select className='form-control' id={ employee.id } defaultValue={ employee.id } onChange={ onManagerSelect }>
                { usersWithNone.map( (user,id) =>(
                    <option key={ id }>{ user.name }</option>
                  ))
                }
            </select>
            : <select className='form-control' value={ employee.id } id={ employee.id } onChange={ onManagerSelect }>
              { usersWithNone.map( (user,id) =>(

                      <option key={ id }>{ user.name }</option>
                  )
                )
              }
            </select>
          }
        </div>
        <Link to="users">Cancel</Link>
      </div>
    )*/


  /*const select = (employee) => (

    <div className="panel-body">
      {console.log(employee)}
      <div className='form-group'>
        <select className='form-control' id={ employee.id } onChange={ onManagerSelect }>
        { usersWithNone.map( (user,id) =>(
            employee.manager && employee.manager.id === user.id ?
                <option key={ id } value={ user.id } selected>{ user.name }</option> :
                <option key={ id } value={ user.id }>{ user.name }</option>
            )
          )
        }
        </select>
      </div>
      <Link to="users">Cancel</Link>
    </div>
  )*/
