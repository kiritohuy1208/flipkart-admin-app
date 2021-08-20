import React from "react";
import { Jumbotron } from "react-bootstrap";

import Layout from "../../components/Layout/index";

import "./style.css";
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <Layout sidebar>
      <Jumbotron
        style={{ margin: "2.6rem", background: "#b7d2f5" }}
        className="text-center"
      >
        <h1>Welcome to Admin Dashboard</h1>
      </Jumbotron>
    </Layout>

    // <Layout>
    // </Layout>
  );
};

export default Home;
