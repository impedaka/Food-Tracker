import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateFood extends Component {
    constructor(props) {
      super(props);
  
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangecalories = this.onChangecalories.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        username: '',
        description: '',
        calories: 0,
        date: new Date(),
        users: []
      }
    }
  
    componentDidMount() {
      axios.get('http://localhost:3000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  
    }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      })
    }
  
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      })
    }
  
    onChangecalories(e) {
      this.setState({
        calories: e.target.value
      })
    }
  
    onChangeDate(date) {
      this.setState({
        date: date
      })
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      const food = {
        username: this.state.username,
        description: this.state.description,
        calories: this.state.calories,
        date: this.state.date
      }
  
      console.log(food);
  
      axios.post('http://localhost:3000/foods/add', food)
        .then(res => console.log(res.data));
  
      window.location = '/';
    }
  
    render() {
      return (
      <div>
        <h3>Create New Food Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Calories: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.calories}
                onChange={this.onChangecalories}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
  
          <div className="form-group">
            <input type="submit" value="Create Food Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
      )
    }
  }

{/* const CreateFood = () => {
    const [postData, setPostData] = useState({ username: '', description: '', calories: 0, date: new Date(), users: []})

    const handleSubmit = () => {

    }
    return (
        <div>
          <h3>Create New Food Log</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={postData.username}
                  onChange={(e) =>  setPostData({ ...postData, username: e.target.value})}>
                  {
                    users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={description}
                  onChange={(e) =>  setPostData({ ...postData, description: e.target.value})}
                  />
            </div>
            <div className="form-group">
              <label>Calories: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={calories}
                  onChange={(e) =>  setPostData({ ...postData, calories: e.target.value})}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={date}
                  onChange={(e) =>  setPostData({ ...postData, date: e.target.value})}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Create Food Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }

useEffect(() => {
    axios.get('http://localhost:3000/users/')
    .then(response => {
      if (response.data.length > 0) {
        setPostData({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })

  }, []);

export default CreateFood; */}