import React,{useState} from 'react';
import './index.css'

const ListOfUsers = ({each,deleter,updater}) => {
    const [isEdit,setIsEdit] = useState(false)
    const [name,setName] = useState('')
    const [mail,setMail] = useState('')
    const handleUpdate = event => {
        if (name && mail){
        updater(event.target.id,name,mail)
        setIsEdit(false)
        }
    }
    const handleEdit = event => {
        setIsEdit(true)
        setName(each.name)
        setMail(each.email)
        // props.onEdit(event.target.id,"prasa","yter")
    }
  return (
    <tr key={each.id}>
        <td>{each.id}</td>
        <td>{isEdit? <input className='update-input' onChange={e => setName(e.target.value)} type='text' value={name}/>:each.name}</td>
        <td>{isEdit? <input className='update-input' onChange={e => setMail(e.target.value)} type='text' value={mail}/>:each.email}</td>
        <td>
            {isEdit? <button className='update-btn' id={each.id} onClick={handleUpdate}>Update</button>: <button className='edit-btn' id={each.id} onClick={handleEdit}>Edit</button>}
            <button className='delete-btn' id={each.id} onClick={event => deleter(event.target.id)}>Delete</button>
        </td>
    </tr>
  )
}

export default ListOfUsers
