import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/Ui/Input";

import { login } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
/**
 * @author
 * @function
 **/

const Signin = (props) => {
  //init state of signin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth); // get state used 'useSelector' from redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.autheticating) {
      setEmail("");
      setPassword("");
    }
  }, [auth.autheticating]);

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "100px" }}>
          {/* offset = 3 để khoảng trắng 2 phía = 3 */}
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
