import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

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
        <div className="">
          <Card className="outer-project-frame position-absolute bg-blue text-white border-b-4 border-r-4 border-white">
            <h2 className="text-xl">Welcome, UserName</h2>
            <Card.Body className="project-board ">
              <Card className="project-frame border-3 bg-transparent">
                <Card.Body className="singular-project leading-7 bg-tapue-gray border-4 border-white">
                  <h3>Project Title</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                </Card.Body>
              </Card>
              <Card className="project-frame border-3 leading-7 bg-transparent">
                <Card.Body className="singular-project bg-tapue-gray border-4 border-white">
                  <h3>Project Title</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                </Card.Body>
              </Card>
              <Card className="project-frame border-3 bg-transparent">
                <Card.Body className="singular-project leading-7 bg-tapue-gray border-4 border-white">
                  <h3>Project Title</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                </Card.Body>
              </Card>
              <Card className="project-frame border-3 bg-transparent">
                <Card.Body className="singular-project leading-7 bg-tapue-gray border-4 border-white">
                  <h3>Project Title</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla sit odit, deserunt quas accusamus magni itaque
                    suscipit aperiam in nobis tenetur blanditiis! Iure pariatur
                    unde consequuntur dolor quis, eaque sed?
                  </p>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
