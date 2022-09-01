import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Icon } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Project } from "./Project";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();
  const AddProject = ( ) => {
    useEffect(() => {
      fetch()
      
    },[])
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
          <div className="tab-bar w-100px bg-blue background-re h-100px visible">
            <button className="add-project"></button>
            <button className="update-project"></button>
            <button className="search-bar"></button>
          </div>
        </div>
        <div className="">
          <Card className="outer-project-frame position-absolute bg-blue text-white border-b-4 border-r-4 border-white">
            <h2 className="text-xl">Welcome, Strawberry</h2>
            <Card.Body className="project-board ">
              <Project/>
              <Project/>
              <Project/>
              <Project/>
              <Project/>
              <Project/>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
