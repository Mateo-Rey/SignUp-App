import { Component, useState } from "react";
import { useEffect } from "react";
import { Card, Form, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { DropDown } from "./Dropdown";

import Sidebar from "./Sidebar";

export const Project = () => {
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [form, setForm] = useState({})
  const projectId = localStorage.getItem("projectId");
  const [projectData, setProjectData] = useState({});
  const [taskState, setTaskState] = useState();
  const [taskStateList, setTaskStateList] = useState([]);
  console.log(taskStateList)
  
  console.log(projectId);
  useEffect(() => {
    fetch(`https://todo-api-web.web.app/projects/${userId}/${projectId}`)
      .then((res) => res.json())
      .then((data) => setProjectData(data));
  }, []);

  useEffect(() => {
    fetch(`https://todo-api-web.web.app/update-project/${userId}/${projectId}`, {
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify()
    })
      
  })
  console.log(projectData);
  const userTaskList = projectData.taskList
  
  console.log(userTaskList);
 
  const [numOfTaskComplete, setNumOfTaskComplete] = useState([]);
  
  console.log(numOfTaskComplete);
  console.log(form)
  function refreshPage() {
    window.location.reload(false);
  }
  const handleFinishedTask = () => {
    setNumOfTaskComplete(numOfTaskComplete + 1);
  };
  
  const [taskList, setTaskList] = useState([])
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleTaskChange = (event) => {
    setTaskList({ ...taskList, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    
  }
  const handleSetTaskState = () => {
    setTaskState()
  }
  const handleSetTaskStateList = () => {
    setTaskStateList()
  }
  console.log(userTaskList);
  console.log(taskList)
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
                <Modal.Title>Update Project</Modal.Title>
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
                      value={projectData.projectTitle}
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
                          name={"task" + index}
                          placeholder='Enter task...'
                          defaultValue={userTaskList[index]}
                          oncompon
                        />
                      </Form.Group>
                    );
                  })}

                  <button
                    type="button"
                    className="mt-3 w-30 bg-blue text-white font-bold py-2 px-4 border-b-4 border-gray-light hover:border-gray rounded-3"
                    // onClick={addTask}
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
                  <div className="p-5 align-items-center justify-content-between text-center w-full border-2 bg-blue my-3">
                    <p className="text-2xl m-3" key={i}>
                      {task}
                    </p>

                    <DropDown
                      task={task}
                      
                    />
                  </div>
                </>
              );
            })}
        </Card.Body>
      </Card>
    </>
  );
};
