import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarWrapper, StyledCard, IconWrapper, StyledListGroup } from './SidebarStyle';
import { sidebarItems } from './SidebarUtil';
import { useTheme } from '../context/ContextTheme';

function SidebarComp({ show }) {
  const { theme } = useTheme();

  return (
    <SidebarWrapper show={show}>
      <StyledCard className="text-center">
        <Card.Img variant="top" src="https://3.bp.blogspot.com/-SKgOrjUtWhE/UY2-87zw1PI/AAAAAAAAAH4/oSSr-Zh-6-8/s1600/Madara+Uchiha.jpg" style={{borderRadius: '20px 20px 0 0'}} />
        <Card.Body>
          <Card.Title style={{fontSize: '24px', fontWeight: 'bold'}}>
            <span>Madara Uchiha</span>
          </Card.Title>
          <Card.Text>
            Líder do <a href="#" style={{color: '#FF0080'}}>clã Uchiha</a>, fundador da aldeia da folha, segundo sábio dos seis caminhos.
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
