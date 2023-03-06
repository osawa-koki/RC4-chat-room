import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { Button, Alert, Form, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";
import { Message } from "../src/Interface";
import { encrypt, decrypt } from "../src/RC4";
import setting from "../setting";
import GetTimeStamp from "../src/GetTimeStamp";
import CheckAllStringsAreNonEmpty from "../src/CheckAllStringsAreNonEmpty";

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
          <div className="d-flex justify-content-center">
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => {
                return (
                  ready === false || CheckAllStringsAreNonEmpty(sharedData.username, sharedData.message) === false ? (
                    <Tooltip {...props}>
                      {ready === false && <div>Connection is not ready.</div>}
                      {CheckAllStringsAreNonEmpty(sharedData.username) === false && <div>Username is empty.</div>}
                      {CheckAllStringsAreNonEmpty(sharedData.message) === false && <div>Message is empty.</div>}
                    </Tooltip>
                  ) : (<></>)
                )
              }}
            >
              <div>
              <Button variant="primary" className="mt-3 m-auto" onClick={Send} disabled={
                ready === false || CheckAllStringsAreNonEmpty(sharedData.username, sharedData.message) === false
              }>Send 📨</Button>
              </div>
            </OverlayTrigger>
          </div>
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
