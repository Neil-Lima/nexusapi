import React, { useState, useEffect, useRef } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Form, InputGroup, FormControl, Button, ListGroup, Badge, Dropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane, faEllipsisV, faPhone, faVideo, faInfoCircle, faSmile, faPaperclip, faImage, faMicrophone, faArchive, faStar, faReply } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { format } from 'date-fns';
import EmojiSelectorComp from '../components/EmojiSelectorComp';
import { GradientBackground, StyledCard, ContactList, ContactItem, MessageContainer, Message, StyledButton, MessageGroup, DateDivider, StatusIndicator, QuickReplyButton } from '../styles/MensagensStyle';
import { groupMessagesByDate, fetchContacts, fetchMessages } from '../utils/MensagensUtil';

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
    setContacts(fetchContacts());
  }, []);

  useEffect(() => {
    if (activeContact) {
      setMessages(fetchMessages());
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
