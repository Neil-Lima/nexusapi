import React, { useState, useEffect, useRef } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Form, InputGroup, FormControl, Button, ListGroup, Badge, Dropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane, faEllipsisV, faPhone, faVideo, faInfoCircle, faSmile, faPaperclip, faImage, faMicrophone, faArchive, faStar, faReply } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import EmojiSelectorComp from '../components/EmojiSelectorComp';
import { format } from 'date-fns';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(Card)`
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  overflow: hidden;
  height: calc(100vh - 100px);
`;

const ContactList = styled(ListGroup)`
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const ContactItem = styled(ListGroup.Item)`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover, &.active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MessageContainer = styled.div`
  height: calc(100vh - 280px);
  overflow-y: auto;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const Message = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  ${props => props.sent ? `
    background-color: ${props.theme.primaryColor};
    color: #ffffff;
    align-self: flex-end;
    border-bottom-right-radius: 0;
  ` : `
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    align-self: flex-start;
    border-bottom-left-radius: 0;
  `}
`;

const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #ffffff;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const MessageGroup = styled.div`
  margin-bottom: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

const DateDivider = styled.div`
  text-align: center;
  margin: 20px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
  
  span {
    background: rgba(0, 0, 0, 0.5);
    padding: 0 10px;
    position: relative;
    color: #ffffff;
  }
`;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.online ? '#4CAF50' : '#9E9E9E'};
  margin-left: 10px;
`;

const QuickReplyButton = styled(Button)`
  margin-right: 10px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

function MensagensPage() {
  const { theme } = useTheme();
  const [activeContact, setActiveContact] = useState(null);
  const [message, setMessage] = useState('');
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Simulating API call to fetch contacts
    const fetchedContacts = [
      { id: 1, name: 'Alice Johnson', avatar: 'https://picsum.photos/50/50?random=1', lastMessage: 'Hey, how are you?', time: '10:30 AM', online: true, archived: false },
      { id: 2, name: 'Bob Smith', avatar: 'https://picsum.photos/50/50?random=2', lastMessage: 'Can we meet tomorrow?', time: 'Yesterday', online: false, archived: false },
      { id: 3, name: 'Carol Williams', avatar: 'https://picsum.photos/50/50?random=3', lastMessage: 'Thanks for your help!', time: 'Monday', online: true, archived: true },
    ];
    setContacts(fetchedContacts);
  }, []);

  useEffect(() => {
    if (activeContact) {
      // Simulating API call to fetch messages for the active contact
      const fetchedMessages = [
        { id: 1, text: 'Hey there!', sent: false, time: '2023-05-20T10:30:00' },
        { id: 2, text: 'Hi! How are you?', sent: true, time: '2023-05-20T10:31:00' },
        { id: 3, text: 'I\'m doing great, thanks for asking. How about you?', sent: false, time: '2023-05-20T10:32:00' },
        { id: 4, text: 'I\'m good too. Just working on some new designs.', sent: true, time: '2023-05-20T10:33:00' },
        { id: 5, text: 'That sounds interesting! Can\'t wait to see them.', sent: false, time: '2023-05-20T10:34:00' },
      ];
      setMessages(fetchedMessages);
    }
  }, [activeContact]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sent: true,
        time: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prevMessage => prevMessage + emoji.native);
    setShowEmojiSelector(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (showArchived ? contact.archived : !contact.archived)
  );

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = format(new Date(message.time), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const renderMessageGroups = () => {
    const groups = groupMessagesByDate(messages);
    return Object.entries(groups).map(([date, messages]) => (
      <MessageGroup key={date}>
        <DateDivider>
          <span>{format(new Date(date), 'MMMM d, yyyy')}</span>
        </DateDivider>
        {messages.map(msg => (
          <Message key={msg.id} sent={msg.sent} theme={theme}>
            {msg.text}
            <div><small>{format(new Date(msg.time), 'HH:mm')}</small></div>
          </Message>
        ))}
      </MessageGroup>
    ));
  };

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container fluid>
          <Row>
            <Col md={4} lg={3}>
              <StyledCard>
                <Card.Body>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Pesquisar contatos"
                      aria-label="Pesquisar contatos"
                      value={searchTerm}
                      onChange={handleSearch}
                      style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: 'none' }}
                    />
                    <Button variant="outline-secondary">
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </InputGroup>
                  <div className="d-flex justify-content-between mb-3">
                    <StyledButton onClick={() => setShowArchived(!showArchived)} theme={theme}>
                      {showArchived ? 'Show Active' : 'Show Archived'}
                    </StyledButton>
                  </div>
                  <ContactList>
                    {filteredContacts.map(contact => (
                      <ContactItem
                        key={contact.id}
                        active={activeContact && activeContact.id === contact.id}
                        onClick={() => setActiveContact(contact)}
                      >
                        <div className="d-flex align-items-center">
                          <Image src={contact.avatar} roundedCircle style={{ width: '50px', height: '50px', marginRight: '15px' }} />
                          <div className="flex-grow-1">
                            <h6 className="mb-0">{contact.name}</h6>
                            <small>{contact.lastMessage}</small>
                          </div>
                          <div className="text-right">
                            <small>{contact.time}</small>
                            <StatusIndicator online={contact.online} />
                          </div>
                        </div>
                      </ContactItem>
                    ))}
                  </ContactList>
                </Card.Body>
              </StyledCard>
            </Col>
            <Col md={8} lg={9}>
              <StyledCard>
                {activeContact ? (
                  <>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Image src={activeContact.avatar} roundedCircle style={{ width: '50px', height: '50px', marginRight: '15px' }} />
                        <h5 className="mb-0">{activeContact.name}</h5>
                      </div>
                      <div>
                        <StyledButton className="mr-2" theme={theme} onClick={() => setShowVideoCall(true)}><FontAwesomeIcon icon={faVideo} /></StyledButton>
                        <StyledButton className="mr-2" theme={theme}><FontAwesomeIcon icon={faPhone} /></StyledButton>
                        <Dropdown>
                          <Dropdown.Toggle as={StyledButton} theme={theme}>
                            <FontAwesomeIcon icon={faEllipsisV} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item><FontAwesomeIcon icon={faArchive} className="mr-2" /> Archive Chat</Dropdown.Item>
                            <Dropdown.Item><FontAwesomeIcon icon={faStar} className="mr-2" /> Mark as Favorite</Dropdown.Item>
                            <Dropdown.Item><FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> View Info</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <MessageContainer>
                        {renderMessageGroups()}
                        <div ref={messageEndRef} />
                      </MessageContainer>
                      <Form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                        <InputGroup>
                          <Button variant="outline-secondary" onClick={() => setShowEmojiSelector(!showEmojiSelector)}>
                            <FontAwesomeIcon icon={faSmile} />
                          </Button>
                          <Button variant="outline-secondary">
                            <FontAwesomeIcon icon={faPaperclip} />
                          </Button>
                          <FormControl
                            placeholder="Digite sua mensagem..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: 'none' }}
                          />
                          <Button variant="outline-secondary">
                            <FontAwesomeIcon icon={faImage} />
                          </Button>
                          <Button variant="outline-secondary">
                            <FontAwesomeIcon icon={faMicrophone} />
                          </Button>
                          <StyledButton type="submit" theme={theme}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </StyledButton>
                        </InputGroup>
                      </Form>
                      {showEmojiSelector && (
                        <div style={{ position: 'absolute', bottom: '100px', right: '20px' }}>
                          <EmojiSelectorComp onEmojiSelect={handleEmojiSelect} />
                        </div>
                      )}
                    </Card.Body>
                  </>
                ) : (
                  <Card.Body className="d-flex justify-content-center align-items-center">
                    <h4>Selecione um contato para iniciar uma conversa</h4>
                  </Card.Body>
                )}
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
      <Modal show={showVideoCall} onHide={() => setShowVideoCall(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Video Call with {activeContact?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ background: '#000', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h3 style={{ color: '#fff' }}>Video call functionality would be implemented here</h3>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default MensagensPage;
