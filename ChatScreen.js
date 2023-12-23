import styled from "styled-components";
import React, { useEffect} from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  Timestamp,
  addDoc,
  where,
} from "firebase/firestore";
import Message from "./Message";
import { useRef, useState } from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function Chatscreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    query(
      collection(db, `chats/${router.query.id}/messages`),
      orderBy("timestamp", "asc")
    )
  );
  const updateLastSeen = async () => {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { lastSeen: Timestamp.now() }, { merge: true });
  };
  const recipientEmail = getRecipientEmail(chat.users, user);
  const [recipientSnapshot] = useCollection(
    query(collection(db, "users"), where("email", "==", recipientEmail))
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
        
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
    updateLastSeen();
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const docRef = doc(db, `chats/${user.uid}`);
    setDoc(
      docRef,
      {
        lastSeen: Timestamp.now(),
      },
      { merge: true }
    );

    const colRef = collection(db, `chats/${chat.id}/messages`);
    addDoc(colRef, {
      timestamp: Timestamp.now(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  useEffect(() => {
    // Update the lastSeen timestamp when opening the chat
    updateLastSeen();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar />

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active :{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading last active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            {/* <AttachFileIcon /> */}
          </IconButton>
          <IconButton>
            {/* <MoreVertIcon /> */}
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer>
        <IconButton>
          {/* <InsertEmoticonIcon /> */}
        </IconButton>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <SendButton type="submit" onClick={sendMessage}>
    ✅
  </SendButton>
        <IconButton>
          {/* <MicIcon /> */}
        </IconButton>
      </InputContainer>
    </Container>
  );
}

export default Chatscreen;



const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;

 
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
  
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;

  @media (max-width: 480px) {
    /* Adjust styles for screens up to 768px wide */
   width: 250px;
    
  }
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;

  @media (max-width: 768px) {
    /* Adjust styles for screens up to 768px wide */
    padding: 8px;
  }
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;

  @media (max-width: 768px) {
    /* Adjust styles for screens up to 768px wide */
    padding: 16px;
  }
`;
const SendButton = styled.button`
  background: none;
  border: none;
  font-size: large;
  color: blue;
`;