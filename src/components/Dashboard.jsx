import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Alert, Form, Icon } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Project } from "./Project";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [dataInit, setDataInit] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [form, setForm] = useState({});
  const [newTask, setNewTask] = useState([{ id: "" }]);
  const [projectData, setProjectData] = useState([]);
  const [addProject, setAddProject] = useState();
  const { currentUser, logout } = useAuth();
  const [updateProject, setUpdateProject] = useState();
  const [userProjectId, setUserProjectId] = useState();
  const userId = currentUser.uid;
  const history = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectIds, setProjectIds] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState("");
  console.log(currentProjectId);
  console.log(currentUser.email)
  

  useEffect(() => {
    fetch(`https://todo-api-web.web.app/projectIds/${userId}`)
      .then((res) => res.json())
      .then((data) => setProjectIds(data))
      .catch((err) => console.log(err));
  }, []);

  async function docAdd() {
    setForm();
    try {
      const results = await fetch(
        `https://todo-api-web.web.app/add-project/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            ["taskList"]: Object.values(taskList),
          }),
        }
      );
      const data = results.json();
      console.log(data);
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetch(`https://todo-api-web.web.app/projects/${userId}`)
      .then((res) => res.json())
      .then((data) => setProjectData(data))
      .catch((err) => console.log(err));
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const addTask = (index) => {
    if (newTask.length < 1) {
      return setNewTask({ id: `${index}` });
    } else {
      setCount(count + 1);
      return setNewTask([...newTask, { id: `${index}` }]);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleTaskChange = (event) => {
    setTaskList({ ...taskList, [event.target.name]: event.target.value });
  };
  console.log(taskList);

  const handleSubmit = (e) => {
    setForm({ [userId]: userId, ...form });
    e.preventDefault();
    docAdd(e);
  };

  for (let i = 0; i < projectData.length; i++) {
    projectData[i].projectId = projectIds[i];
  }
  console.log(form);
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
            <Modal
              className="flex justify-content-evenly align-items-center"
              show={show}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  className="flex justify-content-between align-items-flex-start flex-md-column"
                  onSubmit={(e) => e.preventDefault}
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="">Project Title</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="projectTitle"
                      type="text"
                      placeholder="Enter title..."
                      value={form.name}
                    />
                  </Form.Group>
                  {newTask.map((item, index) => {
                    return (
                      <Form.Group>
                        <Form.Label>Project Task</Form.Label>
                        <Form.Control
                          onChange={(e) => handleTaskChange(e, index)}
                          type="text"
                          key={index}
                          value={form.name}
                          name={"task" + index}
                          placeholder="Enter task..."
                        />
                      </Form.Group>
                    );
                  })}

                  <button
                    type="button"
                    className="mt-3 w-30 bg-blue text-white font-bold py-2 px-4 border-b-4 border-gray-light hover:border-gray rounded-3"
                    onClick={addTask}
                  >
                    Add Task
                  </button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleClose}>Close</button>
                <button onClick={handleSubmit} type="submit">
                  Submit
                </button>
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
          <Card className="outer-project-frame min-w-max position-absolute bg-blue text-white border-b-4 border-r-4 border-white">
            <h2 className="text-xl">Projects</h2>
            <Card.Body className="project-board min-h-max max-w-5xl flex flex-wrap overflow-hidden">
              {console.log(projectData)}
              {projectData &&
                projectData.map((doc) => {
                  const handleProjectIdChange = () => {
                    localStorage.setItem("projectId", `${doc.projectId}`);
                    console.log(localStorage);
                    history("/project");
                  };
                  console.log(doc.projectId);

                  return (
                    <div>
                      <button onClick={handleProjectIdChange}>
                        <div className="singular-project p-2 text-xl leading-7 bg-tapue-gray border-4 border-white">
                          {doc.projectTitle}
                        </div>
                      </button>
                    </div>
                  );
                })}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
