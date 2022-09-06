import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Icon } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Project } from "./Project";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [addProject, setAddProject] = useState();
  const { currentUser, logout } = useAuth();
  const [updateProject, setUpdateProject] = useState();
  const userId = 1;
  const projectId = "l4wEImA53wUhOwmeEAKh";
  const history = useNavigate();

  const handleGetFetch = () => {
    fetch(`https://todo-api-web.web.app/projects/${userId}`)
      .then((res) => res.json())
      .then((data) => setProjectData(data))
      .catch((err) => console.log(err));
  };

  async function docAdd() {
    try {
      const results = await fetch(
        `todo-api-web.web.app/add-project/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      const data = results.json(addProject);
      window.location.reload(false);
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

  return (
    <>
      <div className="app">
        {error && <Alert variant="danger">{error}</Alert>}
        <Sidebar handleLogout={handleLogout} error={error} />
        <div className="hero">
          <div className="tab-bar flex-1 flex-md-row bg-blue text-white justify-content-evenly align-items-center m-2 text-xl ">
            <button
              className="add-project bg-transparent mx-2 my-2 border-4 border-b-tapue-gray border-r-tapue-gray"
              onClick={() => {
                setAddProject();
              }}
            >
              Add Project
            </button>
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
