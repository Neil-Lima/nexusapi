import React, { useState } from 'react';
import { Card, InputGroup, FormControl, Image, Popover, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faSmile } from '@fortawesome/free-solid-svg-icons';
import { StyledCard, StyledButton } from '../styles/CriarPostCardStyle';
import { handleEmojiSelect } from '../utils/CriarPostCard';
import EmojiSelectorComp from './EmojiSelectorComp';

function CriarPostCardComp({ theme }) {
  const [showEmojis, setShowEmojis] = useState(false);
  const [postText, setPostText] = useState('');

  const emojiPopover = (
    <Popover id="emoji-popover" style={{ maxWidth: 'none' }}>
      <Popover.Body>
        <EmojiSelectorComp onEmojiSelect={(emoji) => handleEmojiSelect(emoji, postText, setPostText)} />
      </Popover.Body>
    </Popover>
  );

  return (
    <StyledCard theme={theme}>
      <Card.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-transparent border-0">
            <Image src="https://3.bp.blogspot.com/-SKgOrjUtWhE/UY2-87zw1PI/AAAAAAAAAH4/oSSr-Zh-6-8/s1600/Madara+Uchiha.jpg" roundedCircle style={{width: '40px', height: '40px'}} />
          </InputGroup.Text>
          <FormControl 
            placeholder="Compartilhe seus pensamentos" 
            className="border-0 bg-transparent" 
            style={{color: theme.textColor}}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </InputGroup>
        <div className="d-flex justify-content-between">
          <StyledButton variant="light" className="flex-grow-1 me-2" theme={theme}><FontAwesomeIcon icon={faImage} className="me-2" /> Foto</StyledButton>
          <StyledButton variant="light" className="flex-grow-1 me-2" theme={theme}><FontAwesomeIcon icon={faVideo} className="me-2" /> Video</StyledButton>
          <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={emojiPopover}
            show={showEmojis}
            onToggle={() => setShowEmojis(!showEmojis)}
          >
            <StyledButton variant="light" className="flex-grow-1" theme={theme}>
              <FontAwesomeIcon icon={faSmile} className="me-2" /> Sentimento
            </StyledButton>
          </OverlayTrigger>
        </div>
      </Card.Body>
    </StyledCard>
  );
}

export default CriarPostCardComp;
