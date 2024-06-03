"use client"
import React, { useState } from 'react';
import { Box, Grid, Paper, List, ListItem, ListItemText, TextField, IconButton, Typography, Avatar, IconButton as MuiIconButton, useMediaQuery, useTheme, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { contacts } from "../chats"
import { messagesData } from "../messagedata"

function Navbar() {
  return (
    <Paper style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#075E54', color: 'white', minWidth: 40 }}>
      <List>
        <ListItem button>
          <MuiIconButton style={{ color: 'white' }}>
            <MenuIcon />
          </MuiIconButton>
        </ListItem>
      </List>
      
      <List>
        <ListItem button>
          <MuiIconButton style={{ color: 'white' }}>
            <VideoCallIcon />
          </MuiIconButton>
        </ListItem>
        <ListItem button>
          <MuiIconButton style={{ color: 'white' }}>
            <CallIcon />
          </MuiIconButton>
        </ListItem>
        </List>
        <Box style={{ flexGrow: 1 }} />
        <List>
        <ListItem button>
          <MuiIconButton style={{ color: 'white' }}>
            <AccountCircleIcon />
          </MuiIconButton>
        </ListItem>
        <ListItem button>
          <MuiIconButton style={{ color: 'white' }}>
            <SettingsIcon />
          </MuiIconButton>
        </ListItem>
      </List>
    </Paper>
  );
}

function Sidebar({ onSelectChat }) {
  return (
    <Paper style={{ height: '100vh', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
      <Box display="flex" alignItems="center" p={2}>
        <SearchIcon />
        <InputBase
          placeholder="Search..."
          style={{ marginLeft: 8, flex: 1 }}
        />
        <IconButton>
          <Box
            component="span"
            bgcolor="green"
            color="white"
            borderRadius="50%"
            padding="4px"
            fontSize="12px"
          >
            All
          </Box>
        </IconButton>
        <IconButton>
          <Box
            component="span"
            bgcolor="green"
            color="white"
            borderRadius="50%"
            padding="4px"
            fontSize="12px"
          >
            Unread
          </Box>
        </IconButton>
        <IconButton>
          <Box
            component="span"
            bgcolor="green"
            color="white"
            borderRadius="50%"
            padding="4px"
            fontSize="12px"
          >
            Archived
          </Box>
        </IconButton>
      </Box>
      <List>
        {contacts.map(contact => (
          <ListItem button key={contact.id} onClick={() => onSelectChat(contact.id)}>
            <Avatar>{contact.name.charAt(0)}</Avatar>
            <ListItemText primary={contact.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
function ChatHeader({ sender, lastMessageTime, style }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} style={style}>
      <Box display="flex" alignItems="center">
        <Avatar>{sender.charAt(0)}</Avatar>
        <Box ml={2}>
          <Typography variant="subtitle1">{sender}</Typography>
          <Typography variant="caption" color="textSecondary">
            {lastMessageTime}
          </Typography>
        </Box>
      </Box>
      <Box>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

function ChatWindow({ messages }) {
  return (
    <Paper style={{ height: 'calc(100vh - 128px)', overflowY: 'auto', padding: 16, backgroundColor: '#ece5dd' }}>
      {messages ? (
        <>
          <ChatHeader style={{backgroundColor: "#808080"}}
            sender={messages[0].sender}
            lastMessageTime={messages[messages.length - 1].time}
          />
          {messages.map((msg, index) => (
            <Box key={index} mb={2} textAlign={msg.sender === 'You' ? 'right' : 'left'}>
              <Box display="inline-block" bgcolor={msg.sender === 'You' ? '#DCF8C6' : '#FFFFFF'} p={1} borderRadius={8}>
                <Typography variant="body2" component="span"><b>{msg.sender}</b>: {msg.message}</Typography>
              </Box>
              <Box fontSize="small" color="gray">{msg.time}</Box>
            </Box>
          ))}
        </>
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          Select a chat to view messages
        </Typography>
      )}
    </Paper>
  );
}

function MessageInputBox() {
  return (
    <Box display="flex" alignItems="center" padding={1} borderTop="1px solid #ccc" bgcolor="#f0f0f0">
      <TextField fullWidth variant="outlined" placeholder="Type a message" />
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default function Home() {
  const [selectedChat, setSelectedChat] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectChat = (id) => {
    setSelectedChat(id);
  };

  const messages = selectedChat ? messagesData[selectedChat] : null;

  return (
    <Box>
      <Grid container>
        {!isMobile && (
          <Grid item xs={1}>
            <Navbar />
          </Grid>
        )}
        <Grid item xs={isMobile ? 12 : 3}>
          <Sidebar onSelectChat={handleSelectChat} />
        </Grid>
        <Grid item xs={isMobile ? 12 : 8} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <ChatWindow messages={messages} />
          <MessageInputBox />
        </Grid>
      </Grid>
    </Box>
  );
}