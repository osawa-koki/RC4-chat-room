import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { Button, Alert, Form, Table } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";
import { Message } from "../src/Interface";
import { encrypt, decrypt } from "../src/RC4";
import setting from "../setting";
import GetTimeStamp from "../src/GetTimeStamp";

export default function ChatPage() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState(null);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { sharedData, setSharedData } = React.useContext(DataContext);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${setting.apiPath}/chatHub`)
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;
    connection
      .start()
      .then(() => {
        setReady(true);
      })
      .catch((err: Error) => {
        setError(`${err}`);
      });
  }, [connection]);

  useEffect(() => {
    if (!connection) return;
    console.log(1);
    connection.on("ReceiveMessage", (user: string, message: string) => {
      const newMessage = {
        username: user,
        message: message,
        datetime: new Date(),
      };
      setMessages([newMessage, ...messages]);
    });
  }, [connection, messages]);

  const Send = () => {
    if (connection === null) {
      setError("Connection is empty.");
      return;
    }
    connection
      .invoke("SendMessage", sharedData.username, encrypt(sharedData.message, sharedData.key))
      .then(() => {
      })
      .catch((err: Error) => {
        setError(`Send failed: ${err}`);
      });
  };

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
            <Form.Control as="textarea" rows={3} value={encrypt(sharedData.message, sharedData.key)} disabled />
          </Form.Group>
          <Button variant="primary" className="mt-3 d-block m-auto" onClick={Send} disabled={ready === false}>Send 📨</Button>
        </Form>
        <hr />
        {
          error !== null && (
            <Alert variant="danger">
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )
        }
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
                  <td>{decrypt(message.message, sharedData.key)}</td>
                  <td>{GetTimeStamp(message.datetime)}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};