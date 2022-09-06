import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Alert, Form, Icon } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Project } from "./Project";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0)
  const userId = 1;
  const index = (Math.floor(Math.random()*100000))

  const [form, setForm] = useState({})
  const [newTask, setNewTask] = useState([{id:`${index}`}]);
  const [projectData, setProjectData] = useState([]);
  const [addProject, setAddProject] = useState();
  const { currentUser, logout } = useAuth();
  const [updateProject, setUpdateProject] = useState();
 
  const projectId = "l4wEImA53wUhOwmeEAKh";
  const history = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGetFetch = () => {
    fetch(`https://todo-api-web.web.app/projects/${userId}`)
      .then((res) => res.json())
      .then((data) => setProjectData(data))
      .catch((err) => console.log(err));
  };

  async function docAdd() {
    try {
      const results = await fetch(
        `https://todo-api-web.web.app/add-project/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form), 
        }
      );
      const data = results.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const addTask = () => {
    
    if (newTask.length < 1) {
      return setNewTask({id:`${index}`})
    }else {
     setCount(count+1)
    return setNewTask([...newTask, {id:`${index}`}]);
    }
    
  };
  console.log(count)

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value })
  }

  
  console.log(form)

  const handleSubmit = (e) => {
    e.preventDefault();
    docAdd(e)
  };
  
  return (
    <>
      <div className="app">
        {error && <Alert variant="danger">{error}</Alert>}
        <Sidebar handleLogout={handleLogout} error={error} />
        <div className="hero">
          <div className="tab-bar flex-1 flex-md-row bg-blue text-white justify-content-evenly align-items-center m-2 text-xl ">
            <button
              className="add-project bg-transparent mx-2 my-2 border-4 border-b-tapue-gray border-r-tapue-gray"
              onClick={handleShow}
            >
              Add Project
            </button>
            <Modal className="flex justify-content-evenly align-items-center" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="flex justify-content-between align-items-flex-start flex-md-column" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="">Project Title</Form.Label>
                    <Form.Control onChange={handleChange} name='projTitle' type="text" placeholder="Enter title..." value={form.name} />
                  </Form.Group>
                  {newTask.map(() => {
                    
                    return (
                    <Form.Group>
                    <Form.Label>Project Task</Form.Label>
                    <Form.Control onChange={handleChange} type="text" value={form.name} name={'task'+newTask[(0+count)].id} placeholder="Enter task..." />
                  </Form.Group>
                    )

                  })}
                  
                  <button
                    className="mt-3 w-30 bg-blue text-white font-bold py-2 px-4 border-b-4 border-gray-light hover:border-gray rounded-3"
                    onClick={addTask}
                  >
                    Add Task
                  </button>
                  <Form.Group>
                    <Form.Label>User Id</Form.Label>
                    <Form.Control onChange={handleChange} value={form.name} name='uuid' type="text" placeholder="Enter email..." />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleClose}>Close</button>
                <button onClick={handleSubmit}type='submit'>Submit</button>
              </Modal.Footer>
            </Modal>
            <button
              className="update-project bg-transparent mx-2 my-2 border-4 border-b-tapue-gray border-r-tapue-gray"
              onClick={() => {
                setUpdateProject();
              }}
            >
              Update Project
            </button>

            <input
              className="search-bar bg-transparent mx-2 my-2 border-4 border-b-tapue-gray border-r-tapue-gray"
              placeholder="Search..."
            ></input>
          </div>
        </div>
        <div className="">
          <Card className="outer-project-frame position-absolute bg-blue text-white border-b-4 border-r-4 border-white">
            <h2 className="text-xl">Welcome, Strawberry</h2>
            <Card.Body className="project-board ">
              <Project />
              <Project />
              <Project />
              <Project />
              <Project />
              <Project />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );

}
