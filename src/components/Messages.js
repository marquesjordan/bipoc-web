import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const socket = io(process.env.REACT_APP_HOST_URL);

function Messages() {
  const [chat, setChat] = useState([]);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('OEOEOO ');
    socket.emit('start_chat');

    socket.on('init', (msgs) => {
      console.log('Clint init msgs ', msgs);
      // let msgReversed = msg.reverse();
      setChat(msgs.reverse());
    });

    // Update the chat if a new message is broadcasted.
    socket.on('push', (msg) => {
      console.log('ADD ', (chat) => [...chat, msg]);

      setChat((chat) => [...chat, msg]);
    });
  }, []);

  function handleSubmit() {
    // Send the new message to the server.
    socket.emit('message', {
      name,
      content,
    });

    setChat([
      ...chat,
      {
        name,
        content,
      },
    ]);
    setContent('');
  }

  return (
    <Card sx={{ marginY: 2, minHeight: 200 }}>
      <List
        id="chat-box"
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        style={{ height: 200, overflowY: 'scroll' }}>
        {chat.map((item) => (
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary">
                    {item.name}
                  </Typography>
                  {item.content}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <div
        style={{ padding: 15, borderTop: '1px solid lightgrey', marginTop: 5 }}>
        <TextField
          id="standard-textarea"
          label="Message"
          placeholder=""
          multiline
          variant="standard"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          style={{ width: '100%' }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button size="small" onClick={handleSubmit}>
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default Messages;
