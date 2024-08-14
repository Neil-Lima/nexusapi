import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faComments } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const MessengerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    bottom: 0;
    right: 0;
    border-radius: 10px 10px 0 0;
  }
`;

const MessengerHeader = styled.div`
  background: linear-gradient(45deg, #8e2de2, #4a00e0);
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessengerBody = styled.div`
  height: 300px;
  overflow-y: auto;
  padding: 10px;
`;

const MessengerFooter = styled.div`
  padding: 10px;
  border-top: 1px solid rgba(255,255,255,0.18);
`;

const Message = styled.div`
  background: ${props => props.sent ? 'linear-gradient(45deg, #8e2de2, #4a00e0)' : 'rgba(255,255,255,0.1)'};
  color: white;
  padding: 8px 12px;
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 80%;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #8e2de2, #4a00e0);
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #ffffff;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: linear-gradient(45deg, #7928CA, #FF0080);
  }
`;

function MessengerWindowComp() {
  const [showMessenger, setShowMessenger] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Olá! Como posso ajudar?", sent: false },
    { text: "Oi! Estou procurando informações sobre o clã Uchiha.", sent: true },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const toggleMessenger = () => setShowMessenger(!showMessenger);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sent: true }]);
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
