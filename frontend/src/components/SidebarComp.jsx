import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarWrapper, StyledCard, IconWrapper, StyledListGroup } from './SidebarStyle';
import { sidebarItems } from '../utils/SidebarUtil';
import { useTheme } from '../context/ContextTheme';

function SidebarComp({ show, userData }) {
  const { theme } = useTheme();

  return (
    <SidebarWrapper show={show}>
      <StyledCard className="text-center">
        <Card.Img variant="top" src={userData?.coverImage || "https://via.placeholder.com/500x200"} style={{borderRadius: '20px 20px 0 0'}} />
        <Card.Body>
          <Card.Title style={{fontSize: '24px', fontWeight: 'bold'}}>
            <span>{userData?.name || 'User Name'}</span>
          </Card.Title>
          <Card.Text>
            {userData?.bio || 'User bio goes here'}
          </Card.Text>
        </Card.Body>
      </StyledCard>
      <StyledListGroup className="mb-4">
        {sidebarItems.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex align-items-center">
            <IconWrapper theme={theme}>
              <FontAwesomeIcon icon={item.icon} style={{fontSize: '20px', color: '#ffffff'}} />
            </IconWrapper>
            <span style={{fontSize: '18px'}}>{item.text}</span>
          </ListGroup.Item>
        ))}
      </StyledListGroup>
    </SidebarWrapper>
  );
}

export default SidebarComp;
