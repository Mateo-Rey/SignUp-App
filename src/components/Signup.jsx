import { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
      <Card className="login-body mt-5 card-container border-b-4 text-white border-white rounded">
        <Card.Body>
          <h2 className="text-center text-xl mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <button disabled={loading} className="mt-3 w-100 bg-blue text-white font-bold py-2 px-4 border-b-4 border-gray-light hover:border-gray rounded-3" type="submit">
              Sign Up
            </button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-white">
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
