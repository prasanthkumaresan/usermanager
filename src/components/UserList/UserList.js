import React from 'react';
import './userlist.css'
import ListOfUsers from '../ListOfUsers/ListOfUsers';

const UserList = props => {
  return (
    <table className='list-table' style={{width:"100%"}}>
        <thead>
        <tr>
            <th style={{width:'10%'}}>id</th>
            <th style={{width:"40%"}}>Name</th>
            <th style={{width:"40%"}}>Email</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {props.users.map(each => <ListOfUsers updater={props.onEdit} key={each.id} each={each} deleter={props.onDelete}/>)}
        </tbody>

    </table>
  )
}

export default UserList
