import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Button, ListGroup, Badge, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faTrash, faEllipsisV, faFilter, faHome, faUser, faGlobeAmericas, faUsers } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';
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
`;

const NotificationList = styled(ListGroup)`
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

const NotificationItem = styled(ListGroup.Item)`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
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

const IconWrapper = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

function NotificacoesPage() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulating API call to fetch notifications
    const fetchedNotifications = [
      { id: 1, type: 'like', user: 'Alice Johnson', content: 'liked your post', time: '2023-05-20T10:30:00', read: false },
      { id: 2, type: 'comment', user: 'Bob Smith', content: 'commented on your photo', time: '2023-05-19T15:45:00', read: true },
      { id: 3, type: 'friend', user: 'Carol Williams', content: 'sent you a friend request', time: '2023-05-18T09:20:00', read: false },
      { id: 4, type: 'mention', user: 'David Brown', content: 'mentioned you in a comment', time: '2023-05-17T14:10:00', read: true },
      { id: 5, type: 'event', user: 'Event Organizer', content: 'invited you to an event', time: '2023-05-16T11:55:00', read: false },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return '👍';
      case 'comment': return '💬';
      case 'friend': return '👥';
      case 'mention': return '@';
      case 'event': return '🎉';
      default: return '🔔';
    }
  };

  const LeftColumn = ({ theme }) => (
    <>
      <StyledCard className="text-center">
        <Card.Img variant="top" src="https://3.bp.blogspot.com/-SKgOrjUtWhE/UY2-87zw1PI/AAAAAAAAAH4/oSSr-Zh-6-8/s1600/Madara+Uchiha.jpg" style={{borderRadius: '20px 20px 0 0'}} />
        <Card.Body>
          <Card.Title style={{fontSize: '24px', fontWeight: 'bold'}}>
            <GradientText theme={theme}>Madara Uchiha</GradientText>
          </Card.Title>
          <Card.Text>
            Líder do <a href="#" style={{color: '#FF0080'}}>clã Uchiha</a>, fundador da aldeia da folha, segundo sábio dos seis caminhos.
          </Card.Text>
        </Card.Body>
      </StyledCard>
      <ListGroup className="mb-4">
        {[
          { icon: faHome, text: 'Feed', color: '#FF0080' },
          { icon: faUser, text: 'Conexões', color: '#7928CA' },
          { icon: faGlobeAmericas, text: 'Ultimas noticias', color: '#4a00e0' },
          { icon: faUsers, text: 'Grupos', color: '#8e2de2' }
        ].map((item, index) => (
          <ListGroup.Item key={index} className="border-0 d-flex align-items-center" style={{backgroundColor: 'transparent', color: '#ffffff', padding: '15px 0'}}>
            <IconWrapper theme={theme}>
              <FontAwesomeIcon icon={item.icon} style={{fontSize: '20px', color: '#ffffff'}} />
            </IconWrapper>
            <span style={{fontSize: '18px'}}>{item.text}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <Row>
            <Col lg={3}>
              <LeftColumn theme={theme} />
            </Col>
            <Col lg={9}>
              <StyledCard>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h4><FontAwesomeIcon icon={faBell} className="mr-2" /> Notificações</h4>
                  <div>
                    <Dropdown className="d-inline-block mr-2">
                      <Dropdown.Toggle as={StyledButton} theme={theme}>
                        <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filtrar
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setFilter('all')}>Todas</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('unread')}>Não lidas</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('like')}>Curtidas</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('comment')}>Comentários</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('friend')}>Solicitações de amizade</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('mention')}>Menções</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('event')}>Eventos</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="d-inline-block">
                      <Dropdown.Toggle as={StyledButton} theme={theme}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleMarkAllAsRead}><FontAwesomeIcon icon={faCheck} className="mr-2" /> Marcar todas como lidas</Dropdown.Item>
                        <Dropdown.Item onClick={handleDeleteAll}><FontAwesomeIcon icon={faTrash} className="mr-2" /> Excluir todas</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Card.Header>
                <Card.Body>
                  <NotificationList>
                    {filteredNotifications.map(notif => (
                      <NotificationItem key={notif.id} className={notif.read ? 'text-muted' : ''}>
                        <div className="d-flex align-items-center">
                          <div className="mr-3 fs-4">{getNotificationIcon(notif.type)}</div>
                          <div className="flex-grow-1">
                            <strong>{notif.user}</strong> {notif.content}
                            <div><small>{format(new Date(notif.time), 'PPpp')}</small></div>
                          </div>
                          <div>
                            {!notif.read && (
                              <StyledButton size="sm" className="mr-2" onClick={() => handleMarkAsRead(notif.id)} theme={theme}>
                                <FontAwesomeIcon icon={faCheck} />
                              </StyledButton>
                            )}
                            <StyledButton size="sm" variant="danger" onClick={() => handleDelete(notif.id)} theme={theme}>
                              <FontAwesomeIcon icon={faTrash} />
                            </StyledButton>
                          </div>
                        </div>
                      </NotificationItem>
                    ))}
                  </NotificationList>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default NotificacoesPage;
                    