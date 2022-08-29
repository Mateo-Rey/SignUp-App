import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="profile">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
            <div className="w-100 text-center mt-2">
              <Button
                className="log-out"
                variant="navigate"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </Card>
        </div>
        <div>
          <Card className="outer-project-frame">
            <h2>Welcome, UserName</h2>
            <Card.Body className="project-board">
              <Card className="project-frame">
                <Card.Body className="singular-project">
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
              <Card className="project-frame">
                <Card.Body className="singular-project">
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
              <Card className="project-frame">
                <Card.Body className="singular-project">
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
              <Card className="project-frame">
                <Card.Body className="singular-project">
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
