import React, { useEffect, useRef } from 'react';
import { EmojiContainer, Emoji3D } from '../styles/EmojiSelectorStyle';
import { initializePicker } from '../utils/EmojiSelectorUtil';

const EmojiSelectorComp = ({ onEmojiSelect }) => {
  const ref = useRef(null);

  useEffect(() => {
    initializePicker(ref, onEmojiSelect, Emoji3D);
  }, [onEmojiSelect]);

  return <EmojiContainer ref={ref} />;
};

export default EmojiSelectorComp;
