import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const FoodsList = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/foods/").then((response) => {
      response.data.map((data) => {
        setData((oldArray) => [...oldArray, data]);
        return 0;
      });
    });
  }, []);

  const deleteExercise = (id) => {
    axios.delete("http://localhost:3000/foods/" + id).then((response) => {
      console.log(response.data);
    });

    setData(Data.filter((el) => { return el._id !== id }))
  };
  return (
    <div>
      <h3>Logged Foods</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Calories</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((data, index) => (
            <tr key={index}>
              <td>{data.username}</td>
              <td>{data.description}</td>
              <td>{data.calories}</td>
              <td>{data.date.substring(0, 10)}</td>
              <td>
                <Link className="btn btn-primary" to={"/edit/" + data._id}>Edit</Link> 
                <button className="btn btn-danger"
                  href='/'
                  onClick={() => {
                    deleteExercise(data._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodsList;
