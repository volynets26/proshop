import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen({ location, history }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(value.email, value.password));
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Meta title="Login" />
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger" children={error} />}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={value.email}
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="passworf">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={value.password}
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
}

export default LoginScreen;
