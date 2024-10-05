import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faComments } from '@fortawesome/free-solid-svg-icons';
import { MessengerWrapper, MessengerHeader, MessengerBody, MessengerFooter, Message, StyledButton } from '../styles/MessengerWindowStyles';
import { formatMessage, getInitialMessages } from '../utils/MessengerWindowUtil';

function MessengerWindowComp() {
  const [showMessenger, setShowMessenger] = useState(false);
  const [messages, setMessages] = useState(getInitialMessages());
  const [newMessage, setNewMessage] = useState("");

  const toggleMessenger = () => setShowMessenger(!showMessenger);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: formatMessage(newMessage), sent: true }]);
      setNewMessage("");
    }
  };

  return (
    <>
      <MessengerWrapper style={{ display: showMessenger ? 'block' : 'none' }}>
        <MessengerHeader>
          <h5 className="mb-0">Mensagens</h5>
          <StyledButton variant="link" onClick={toggleMessenger}>
            <FontAwesomeIcon icon={faTimes} />
          </StyledButton>
        </MessengerHeader>
        <MessengerBody>
          {messages.map((message, index) => (
            <Message key={index} sent={message.sent}>
              {message.text}
            </Message>
          ))}
        </MessengerBody>
        <MessengerFooter>
          <InputGroup>
            <FormControl
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button variant="outline-secondary" onClick={sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </InputGroup>
        </MessengerFooter>
      </MessengerWrapper>
      <StyledButton
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={toggleMessenger}
      >
        <FontAwesomeIcon icon={faComments} />
      </StyledButton>
    </>
  );
}

export default MessengerWindowComp;
