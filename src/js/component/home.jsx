import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchForPosts();
  }, []);

  const fetchForPosts = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/flaviaballab-todolist"
      );
      const posts = await response.json();
      setTodos(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (data) => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/flaviaballab-todolist",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        fetchForPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteData = async (index) => {
  //   const updatedTodos = todos.filter((_, i) => i !== index);
  //   try {
  //     const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/flaviaballab-todolist`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(updatedTodos)
  //     });
  //     if (response.ok){
  //       fetchForPosts();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="text-center">
      <h1 className="list-name">todos</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <input
            className="list-group-input"
            itemType="text"
            placeholder="What needs to be done?"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === "Enter" && inputValue.trim() !== "") {
                setTodos(todos.concat(inputValue));
                setInputValue("");
                const newData = [...todos, { label: inputValue, done: false }];
                updateData(newData);
              }
            }}
          ></input>
        </li>
        {todos.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.label}
            <svg
              onClick={() => {
                // deleteData(index);
                const updatedTodos = todos.filter((_, i) => i !== index);
                updateData(updatedTodos);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          color: "black",
          paddingLeft: "18px",
          fontSize: "14px",
          color: "gray",
        }}
      >
        {todos.length} tasks
      </div>
    </div>
  );
};

export default Home;
