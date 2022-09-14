import { Component, useState } from "react";
import { useEffect } from "react";
import { Card, Form, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { DropDown } from "./Dropdown";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Task } from "./Task";

export const Project = () => {
  const { currentUser } = useAuth();
  const history = useNavigate();
  const userId = currentUser.uid;
  const [show, setShow] = useState(false);
  const [delteShow, setDeleteShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({});
  const projectId = localStorage.getItem("projectId");
  const [projectData, setProjectData] = useState({});
  let userTaskList = projectData.taskList;

  const addTask = () => {
    setProjectData([...projectData.taskList, `randomTask`]);
  };

  useEffect(() => {
    fetch(`https://todo-api-web.web.app/projects/${userId}/${projectId}`)
      .then((res) => res.json())
      .then((data) => setProjectData(data));
  }, []);

  const [taskList, setTaskList] = useState({});
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleTaskChange = (event) => {
    setTaskList({ ...taskList, [event.target.name]: event.target.value });
  };

  console.log(form);
  const handleSubmit = async () => {
    if (Object.keys(taskList).length > 1) {
      Object.keys(taskList).map((key) => {
        userTaskList.splice(key);
      });

      Object.values(taskList).map((task) => {
        userTaskList.push(task);
      });
    } else {
      const index = parseInt(Object.keys(taskList));
      const value = Object.values(taskList).toString();
      userTaskList[index] = value;
    }

    try {
      const results = await fetch(
        `https://todo-api-web.web.app/update-project/${userId}/${projectId}`,
        {
          method: "PUT",
          mode: "cors",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            taskList: [...userTaskList],
            projectTitle: form.projectTitle,
          }),
        }
      );
      const data = results.json();
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteShow = () => {
    setDeleteShow(true);
  };
  const handleDeleteClose = () => {
    setDeleteShow(false);
  };
  const handleDeleteSubmit = async () => {
    try {
      const results = await fetch(
        `https://todo-api-web.web.app/delete-project/${userId}/${projectId}`,
        {
          method: "DELETE",
        }
      );
      const data = results.json();
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <Card
        id="projectFullFrame"
        className="project-frame flex-row justify-content-center align-items-top tracking-normal text-white border-3 w-100 h-100 bg-transparent"
      >
        <Card.Body className="leading-7 flex-row justify-content-center align-items-top bg-tapue-gray border-4 border-white">
          <h1 className="text-4xl border-4 bg-blue border-gray-light p-2 text-center">
            {projectData.projectTitle}
          </h1>
          <button
            className="update-project bg-transparent mx-2 my-2 border-4 border-b-tapue-gray border-r-tapue-gray"
            onClick={handleShow}
          >
            Update Project
          </button>
          <button
            className="update-project bg-transparent mx-2 my-2 border-4 border-b-tapue-gray border-r-tapue-gray"
            onClick={handleDeleteShow}
          >
            Delete Project
          </button>
          <Modal show={delteShow}>
            <div className="bg-gradient-to-bl from-sea-green to-purple text-white p-4">
              <div className="border-black bg-dark-red p-2 border-4">
                <div className=" text-center  border-4 border-white p-2 font-bold bg-gradient-to-r from-dark-red to-red">
                  <p className="font-bold text-max-yellow">Warning</p>
                  <p>
                    Please make sure all tasks inside this project have been
                    completed!
                  </p>
                </div>
                <div className="flex align-items-center font-bold mt-3 text-lg justify-content-evenly">
                  <button
                    onClick={handleDeleteClose}
                    className="bg-crimson-red border-2 rounded-md p-2"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleDeleteSubmit}
                    className="bg-green border-2 rounded-md p-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          {userTaskList &&
            userTaskList.map((task, i) => {
              const taskState = localStorage.getItem(`taskState${task}`);

              return (
                <>
                  <Modal
                    className="flex justify-content-evenly align-items-center"
                    show={show}
                    onHide={handleClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Update Project Details</Modal.Title>
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
                            value={form.name}
                            defaultValue={projectData.projectTitle}
                          />
                        </Form.Group>
                        {projectData.taskList.map((item, index) => {
                          return (
                            <Form.Group>
                              <Form.Label>Project Task</Form.Label>
                              <Form.Control
                                onChange={(e) => handleTaskChange(e, index)}
                                type="text"
                                key={index}
                                value={form.name}
                                name={index}
                                placeholder="Enter task..."
                                defaultValue={userTaskList[index]}
                              />
                            </Form.Group>
                          );
                        })}
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <button onClick={handleClose}>Close</button>
                      <button onClick={handleSubmit} type="submit">
                        Submit
                      </button>
                    </Modal.Footer>
                  </Modal>
                 
                    <Task task={task} i ={i}/>
          
                </>
              );
            })}
        </Card.Body>
      </Card>
    </>
  );
};
