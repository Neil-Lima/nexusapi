import styled from 'styled-components';

export const EmojiContainer = styled.div`
  max-width: 300px;
  max-height: 300px;
  overflow: auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 10px;
`;

export const Emoji3D = styled.span`
  font-size: 28px;
  display: inline-block;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  transform: perspective(100px) rotateX(10deg) rotateY(10deg);
  background: radial-gradient(circle at 30% 30%, #ffdf00, #ffa700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 1px rgba(0,0,0,0.5));
  
  &:hover {
    transform: perspective(100px) rotateX(0deg) rotateY(0deg) scale(1.2);
    background: radial-gradient(circle at 30% 30%, #ffe500, #ffb700);
    filter: drop-shadow(3px 3px 2px rgba(0,0,0,0.7));
  }
`;
