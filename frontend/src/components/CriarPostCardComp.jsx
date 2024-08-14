import React, { useState } from 'react';
import { Card, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faSmile } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import EmojiSelectorComp from './EmojiSelectorComp';
import { StyledCard, StyledButton, IconWrapper, PostInput } from '../styles/CriarPostCardStyle';

function CriarPostCardComp() {
  const { theme } = useTheme();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postText, setPostText] = useState('');

  const handleEmojiSelect = (emoji) => {
    setPostText(postText + emoji.native);
  };

  return (
    <StyledCard>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <Image src="https://picsum.photos/50/50" roundedCircle className="me-3" />
          <PostInput
            as="textarea"
            placeholder="O que está acontecendo?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <IconWrapper theme={theme} className="me-2">
              <FontAwesomeIcon icon={faImage} />
            </IconWrapper>
            <IconWrapper theme={theme} className="me-2">
              <FontAwesomeIcon icon={faVideo} />
            </IconWrapper>
            <IconWrapper theme={theme} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <FontAwesomeIcon icon={faSmile} />
            </IconWrapper>
          </div>
          <StyledButton theme={theme}>Postar</StyledButton>
        </div>
        {showEmojiPicker && <EmojiSelectorComp onEmojiSelect={handleEmojiSelect} />}
      </Card.Body>
    </StyledCard>
  );
}

export default CriarPostCardComp;
