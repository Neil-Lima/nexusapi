import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faGlobeAmericas, faUsers } from '@fortawesome/free-solid-svg-icons';
import { StyledCard, IconWrapper, GradientText } from '../styles/GruposStyle';

export const handleCreateGroup = (event, newGroup, setNewGroup, groups, setShowModal) => {
  event.preventDefault();
  const newGroupWithId = { 
    ...newGroup, 
    id: groups.length + 1,
    members: 1,
    image: newGroup.image ? URL.createObjectURL(newGroup.image) : 'https://picsum.photos/800/400?random=' + (groups.length + 1)
  };
  groups.push(newGroupWithId);
  setShowModal(false);
  setNewGroup({
    name: '',
    description: '',
    category: '',
    image: null
  });
};

export const handleInputChange = (e, setNewGroup) => {
  const { name, value } = e.target;
  setNewGroup(prevState => ({ ...prevState, [name]: value }));
};

export const handleImageUpload = (e, setNewGroup) => {
  const file = e.target.files[0];
  setNewGroup(prevState => ({ ...prevState, image: file }));
};

export const groups = [
  {
    id: 1,
    name: 'Amantes de Anime',
    description: 'Grupo para discutir e compartilhar sobre anime e mangá',
    members: 1500,
    image: 'https://picsum.photos/800/400?random=1',
    category: 'Entretenimento'
  },
  {
    id: 2,
    name: 'Desenvolvedores React',
    description: 'Comunidade para desenvolvedores React compartilharem conhecimento',
    members: 3000,
    image: 'https://picsum.photos/800/400?random=2',
    category: 'Tecnologia'
  },
  {
    id: 3,
    name: 'Fotografia Urbana',
    description: 'Grupo para entusiastas de fotografia urbana',
    members: 800,
    image: 'https://picsum.photos/800/400?random=3',
    category: 'Arte'
  }
];

export const LeftColumn = ({ theme }) => (
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
