import { useState } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { DropDown } from "./Dropdown";


import Sidebar from "./Sidebar";

export const Project = () => {
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  console.log(userId);
  const projectId = localStorage.getItem("projectId");
  const [projectData, setProjectData] = useState({});
  console.log(projectId);
  useEffect(() => {
    fetch(
      `https://todo-api-web.web.app/projects/${userId}/${projectId}`
    )
      .then((res) => res.json())
      .then((data) => setProjectData(data));
  }, []);
  console.log(projectData);
  console.log(projectData.taskList);
  const userTaskList = projectData.taskList;
  console.log(userTaskList);
  return (
    <>
      <Sidebar />
      <Card
        id="projectFullFrame"
        className="project-frame justify-content-center align-items-top tracking-normal text-white border-3 w-100 h-100 bg-transparent"
      >
        <Card.Body className="leading-7 justify-content-center align-items-top bg-tapue-gray border-4 border-white">
          <h1 className="text-4xl border-4 bg-blue border-gray-light p-2 text-center">{projectData.projectTitle}</h1>
          <div className="w-full h-10 my-5 bg-gray text-lg text-center rounded-full">
                    <p className="text-center">percent</p>
                    </div>
          {userTaskList &&
            userTaskList.map((task, i) => {
              const taskState = localStorage.getItem(`taskState${task}`)
              console.log(taskState)
              if (taskState == 'Done') {
                
              }
              return (
                <>
                  <div className="p-5 text-center border-2 bg-blue my-3">
                    <p className="text-2xl m-3" key={i}>
                      {task}
                    </p>
                    <DropDown task={task}/>
                    
                  </div>
                </>
              );
            })}
        </Card.Body>
      </Card>
    </>
  );
};
