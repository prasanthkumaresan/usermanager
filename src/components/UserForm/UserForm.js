import React from 'react'
import './userform.css'

class UserForm extends React.Component{
state = {errorObj: {}}
handleSubmit = event => {
    event.preventDefault();
    let newErrorObj = {};
    if (event.target.name.value.length <= 0){
        newErrorObj.name = "*Name is required"
    }
    if (event.target.email.value.length <= 0){
        newErrorObj.mail = "*Email is required"
    }
    if (Object.keys(newErrorObj).length === 0){
        this.props.onAdd(event.target.name.value,event.target.email.value);
        event.target.name.value="";
        event.target.email.value = "";
        this.setState({errorObj: {}})
    }else {
        this.setState({errorObj: newErrorObj})
    }
}

    render(){
        const {errorObj} = this.state
        console.log(errorObj.name)
        return(
            <form onSubmit={this.handleSubmit} className='addform-container'>
                <h2 className='form-header'>Add User</h2>
                <div>
                    <label>Name: </label>
                    <input className='form-name' name='name' placeholder='Name'/>
                    {errorObj.name && <p className='form-error'>{errorObj.name}</p>}
                </div>
                <div>
                    <label>Email: </label>
                    <input className='form-name' name='email' placeholder='Email'/>
                    {errorObj.mail && <p className='form-error'>{errorObj.mail}</p>}
                </div>
                <button className='formsubmit-btn' type='submit'>Add User</button>
            </form>
        )
    }
}

export default UserForm
