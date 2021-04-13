import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";


const EditFood = () => {
  const { id } = useParams();
  const [Food, setFood] = useState({
    username: "",
    description: "",
    calories: 0,
    date: new Date(),
  });

  const [Users, setUsers] = useState([])

  const onSubmit = () => {
    axios
      .post("http://localhost:3000/foods/update/"+id, Food)
  };

  useEffect( () => {

    axios.get('http://localhost:3000/foods/'+id)
      .then(response => {
        setFood({
          username: response.data.username,
          description: response.data.description,
          calories: response.data.calories,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

     axios
      .get("http://localhost:3000/users")
      .then(res => {
        console.log(res)
        res.data.map(user => {
          setUsers(oldArray => [...oldArray, user.username])
          return 0;
        })
      })

      
  }, [id]);


  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditFood;
