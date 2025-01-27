import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';

class App extends React.Component{
  state = {userList:[],apiStatus: "Pending"}
  getUserData = async () => {
    try {const url = "https://jsonplaceholder.typicode.com/users"
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    this.setState({userList: data,apiStatus: "Success"})}
    catch (err){
      this.setState({apiStatus: "Failed"})
    }
  }

  userUpdate = async (id,name,mail) => {
    const {userList} = this.state
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    try {const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        email: mail
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    console.log(response);
    if(response.status === 200){
      const updatedList = userList.map(each => {
        if(parseInt(each.id) === parseInt(id)){
          return {...each,name:name,email:mail}
        }else{
          return each
        }
      })
      this.setState({userList: updatedList})
    }} catch (err){
      console.log(err)
    }
  }

  userDelete = async (id) => {
    const {userList} = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`
    const response = await fetch(url,{
      method: "DELETE"
    })
    console.log(response)
    if (response.status === 200){
      const filteredData = userList.filter(each => parseInt(each.id) !== parseInt(id))
      console.log(filteredData);
      this.setState({userList: filteredData})
    }
  }

  userAdd = async (name,mail) => {
    const {userList} = this.state
    try{
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url,{
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: mail,
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    let data = await response.json()
    const idList = userList.map(each => parseInt(each.id));
    let newId = idList.length;
    while (idList.includes(newId)){
      newId += 1
    };
    data = {...data,id: newId}
    this.setState({userList:[...userList,data]})
  }
  catch (err){
    console.log(err)
  }
    
   
  }

  componentDidMount = () => {
    this.getUserData()
  }

  render(){
    const {userList,apiStatus} = this.state
    return(
      <div className='app-container'>
      <Navbar/>
      <UserForm onAdd={this.userAdd} />
      {apiStatus === "Pending" && (
        <div className='loader-container'>
          <p className='loader'>Loading...</p>
        </div>)}
      {apiStatus === "Success" && <UserList onEdit={this.userUpdate} onDelete={this.userDelete} users={userList} />}
      {apiStatus === "Failed" && (
        <div className='fetch-err'>
          <p className='fetch-err-msg'>Internal Server error</p>
          <button onClick={() => this.getUserData()} className='fetch-err-btn'>Retry</button>
        </div>)}
      </div>
    )
  }
}


export default App;