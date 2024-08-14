import React from 'react';
import { StyledButton } from '../styles/BotaoCarregarMaisStyle';

function BotaoCarregarMaisComp({ onClick }) {
  return (
    <StyledButton onClick={onClick}>
      Carregar Mais
    </StyledButton>
  );
}

export default BotaoCarregarMaisComp;
