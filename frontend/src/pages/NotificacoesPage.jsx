import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Button, ListGroup, Badge, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faTrash, faEllipsisV, faFilter, faHome, faUser, faGlobeAmericas, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { format } from 'date-fns';
import { GradientBackground, StyledCard, NotificationList, NotificationItem, StyledButton, IconWrapper, GradientText } from '../styles/NotificacoesStyle';
import { fetchNotifications } from '../utils/NotificacoesUtil';

function NotificacoesPage() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setNotifications(fetchNotifications());
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
