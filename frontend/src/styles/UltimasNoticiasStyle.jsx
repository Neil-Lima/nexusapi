import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
`;

export const NewsItem = styled.div`
  margin-bottom: 10px;

  h6 {
    margin-bottom: 0;
  }

  small {
    color: #aaa;
  }
`;
