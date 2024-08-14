import React from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';

const ColorPickerCompContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ColorPickerComp = () => {
  const { theme, updateTheme } = useTheme();

  const handleColorChange = (color, type) => {
    updateTheme({ [type]: color.hex });
  };

  return (
    <ColorPickerCompContainer>
      <h5>Primary Color</h5>
      <ChromePicker
        color={theme.primaryColor}
        onChange={(color) => handleColorChange(color, 'primaryColor')}
      />
      <h5>Secondary Color</h5>
      <ChromePicker
        color={theme.secondaryColor}
        onChange={(color) => handleColorChange(color, 'secondaryColor')}
      />
    </ColorPickerCompContainer>
  );
};

export default ColorPickerComp;
