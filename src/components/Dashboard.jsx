import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Icon } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Project } from "./Project";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [projectData, setProjectData] = useState([]);
  const { currentUser, logout } = useAuth();
  const [getProject, setGetProject] = useState(false);
  const userId = 4;
  const projectId = "l4wEImA53wUhOwmeEAKh";
  const history = useNavigate();

  useEffect(() => {
    const handleGetFetch = () => {
      fetch(`https://todo-api-web.web.app/projects/${userId}`)
        .then((res) => res.json())
        .then((data) => setProjectData(data))
        .catch((err) => console.log(err));
    };
    handleGetFetch();
  }, [getProject]);
  useEffect(() => {
    const AddProject = () => {
      fetch(`todo-api-web.web.app/add-project/${userId}`).then();
    };
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

 
  
  return (
    <>
      {projectData && projectData.map((e) => {
    return <li>{e.userId}</li>
  })}
      <div className="app">
        {error && <Alert variant="danger">{error}</Alert>}
        <Sidebar handleLogout={handleLogout} error={error} />
        <div className="hero">
          <div className="tab-bar w-100px bg-blue h-100px visible">
            <button
              onClick={() => {
                setGetProject(true);
              }}
              className="add-project w-100 bg-yellow h-h-100"
            >
              hey
            </button>
            <button className="update-project"></button>
            <button className="search-bar"></button>
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
