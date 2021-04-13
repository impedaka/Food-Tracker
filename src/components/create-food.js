import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateFood = () => {
  const [Food, setFood] = useState({
    username: "hello",
    description: "",
    calories: 0,
    date: new Date(),
  });

  const [Users, setUsers] = useState([])

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/foods/add", Food)
      .then(res => console.log(res.data));
      window.location = '/';
  };

  useEffect( () => {
     axios
      .get("http://localhost:3000/users")
      .then(res => {
        res.data.map(user => {
          setUsers(oldArray => [...oldArray, user.username])
          return 0;
        })
      })

      
  }, []);


  return (
    <div>
      <h3>Create New Food Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={Food.username}
            onChange={(e) =>
              setFood({ ...Food, username: e.target.value })
            }
          >
            {Users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={Food.description}
            onChange={(e) =>
              setFood({ ...Food, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Calories: </label>
          <input
            type="text"
            className="form-control"
            value={Food.calories}
            onChange={(e) =>
              setFood({ ...Food, calories: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={Food.date}
              onChange={(e) =>
                setFood({ ...Food, date: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Food Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateFood;
