import React, { useState } from "react";

import { Button, Alert, Form, Table } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";
import { Message } from "../src/Interface";

export default function ChatPage() {

  const [messages, setMessages] = useState<Message[]>([]);
  const { sharedData, setSharedData } = React.useContext(DataContext);

  return (
    <Layout>
      <div id="Chat">
        <h1>RC4 Chat Room 🏠</h1>
        <Form>
          <Form.Group className="mt-3 d-flex justify-content-between">
            <Form.Group className="w-50">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={sharedData.username} onInput={(e) => {
                setSharedData({ ...sharedData, username: e.currentTarget.value });
              }} />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Key</Form.Label>
              <Form.Control type="text" placeholder="Enter key" value={sharedData.key} onInput={(e) => {
                setSharedData({ ...sharedData, key: e.currentTarget.value });
              }} />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} value={sharedData.message} onInput={(e) => {
              setSharedData({ ...sharedData, message: e.currentTarget.value });
            }} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Encrypted Message</Form.Label>
            <Form.Control as="textarea" rows={3} value={sharedData.message} disabled />
          </Form.Group>
          <Button variant="primary" className="mt-3 d-block m-auto">Send 📨</Button>
        </Form>
        <hr />
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th className="w-25">username</th>
              <th className="w-50">message</th>
              <th className="w-25">datetime</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => {
              return (
                <tr key={index}>
                  <td>{message.username}</td>
                  <td>{message.message}</td>
                  <td>{message.datetime.toString()}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};
