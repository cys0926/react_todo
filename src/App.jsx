import React, { useState, useCallback } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {
    const [todoData, setTodoData] = useState(initialTodoData);
    const [value, setValue] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        let newTodo = {
            id: Date.now(),
            title: value,
            complete: false,
        };
        setTodoData((prev) => [...prev, newTodo]);
        localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));

        setValue("");
    };

    const handleClick = useCallback(
        (id) => {
            let newTodoData = todoData.filter((data) => data.id !== id);
            console.log(newTodoData);
            setTodoData(newTodoData);
            localStorage.setItem("todoData", JSON.stringify(newTodoData));
        },
        [todoData]
    );

    const handleRemoveClick = (event) => {
        setTodoData([]);
        localStorage.setItem("todoData", JSON.stringify([]));
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-blue-400">
            <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
                <div className="flex justify-between mb-3">
                    <h1>할 일 목록</h1>
                    <button onClick={handleRemoveClick}>Delete All</button>
                </div>

                <Lists
                    handleClick={handleClick}
                    todoData={todoData}
                    setTodoData={setTodoData}
                />

                <Form
                    value={value}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}
