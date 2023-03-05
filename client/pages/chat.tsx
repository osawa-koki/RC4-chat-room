import React, { useContext, useState } from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from '../components/DataContext';

export default function HelloWorld() {

  const { sharedData, setSharedData } = useContext(DataContext);

  return (
    <Layout>
      <div id="Chat">
        <Form.Group className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={sharedData.username} onInput={(e) => {
            setSharedData({ ...sharedData, username: e.currentTarget.value });
          }} />
          <Form.Text>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      </div>
    </Layout>
  );
};
