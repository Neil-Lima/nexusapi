import React, { useState, useRef } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Button, Modal, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShareAlt, faHome, faUser, faGlobeAmericas, faUsers, faBars, faPaperPlane, faReply, faCamera, faMagic, faPalette, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { ChromePicker } from 'react-color';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { GradientBackground, StyledCard, StyledButton, IconWrapper, GradientText, SidebarWrapper, Overlay, PhotoGrid, PhotoItem, ModalImage, ActionButton, StyledModal, CommentSection, Comment, UserAvatar, MoodBoard, MoodBoardItem } from '../styles/GaleriaFotosStyle';
import { handlePhotoClick, handleClose, toggleSidebar, handleCommentSubmit, handleCommentLike, handleDragEnd, handleImageUpload, photos } from '../utils/GaleriaFotosUtil';

function GaleriaFotosPage() {
  const { theme } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showMoodBoard, setShowMoodBoard] = useState(false);
  const [moodBoardItems, setMoodBoardItems] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageLabels, setImageLabels] = useState([]);

  const fileInputRef = useRef(null);

  const LeftColumn = ({ theme }) => (
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

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <Row>
            <Overlay show={showSidebar} onClick={() => toggleSidebar(setShowSidebar)} />
            <Col lg={3}>
              <SidebarWrapper show={showSidebar}>
                <LeftColumn theme={theme} />
              </SidebarWrapper>
            </Col>
            <Col lg={9}>
              <StyledButton className="d-lg-none mb-3" onClick={() => toggleSidebar(setShowSidebar)} theme={theme}>
                <FontAwesomeIcon icon={faBars} />
              </StyledButton>
              <StyledCard>
                <Card.Body>
                  <h2 className="mb-4">Álbum de Fotos</h2>
                  <div className="mb-3">
                    <StyledButton onClick={() => fileInputRef.current.click()} theme={theme} className="me-2">
                      <FontAwesomeIcon icon={faUpload} /> Upload Image
                    </StyledButton>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageUpload(e, setUploadedImage, setImageLabels)}
                      accept="image/*"
                    />
                    <StyledButton onClick={() => setShowMoodBoard(true)} theme={theme} className="me-2">
                      <FontAwesomeIcon icon={faMagic} /> Mood Board
                    </StyledButton>
                    <StyledButton onClick={() => setShowColorPicker(!showColorPicker)} theme={theme}>
                      <FontAwesomeIcon icon={faPalette} /> Color Picker
                    </StyledButton>
                  </div>
                  {showColorPicker && (
                    <ChromePicker
                      color={selectedColor}
                      onChange={(color) => setSelectedColor(color.hex)}
                    />
                  )}
                  <PhotoGrid>
                    {photos.map((photo) => (
                      <PhotoItem key={photo.id} onClick={() => handlePhotoClick(photo, setSelectedPhoto)}>
                        <img src={photo.url} alt={photo.caption} />
                      </PhotoItem>
                    ))}
                    {uploadedImage && (
                      <PhotoItem onClick={() => handlePhotoClick({ id: 'uploaded', url: uploadedImage, caption: 'Uploaded Image', likes: 0, comments: [], shares: 0 }, setSelectedPhoto)}>
                        <img src={uploadedImage} alt="Uploaded" />
                      </PhotoItem>
                    )}
                  </PhotoGrid>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>

        <StyledModal show={selectedPhoto !== null} onHide={() => handleClose(setSelectedPhoto)} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes da Foto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPhoto && (
              <Row>
                <Col md={6}>
                  <ModalImage src={selectedPhoto.url} alt={selectedPhoto.caption} fluid />
                </Col>
                <Col md={6}>
                  <h4>{selectedPhoto.caption}</h4>
                  <div className="d-flex justify-content-between mt-3 mb-4">
                    <ActionButton theme={theme}>
                      <FontAwesomeIcon icon={faHeart} /> {selectedPhoto.likes}
                    </ActionButton>
                    <ActionButton theme={theme}>
                      <FontAwesomeIcon icon={faComment} /> {selectedPhoto.comments.length}
                    </ActionButton>
                    <ActionButton theme={theme}>
                      <FontAwesomeIcon icon={faShareAlt} /> {selectedPhoto.shares}
                    </ActionButton>
                  </div>
                  {selectedPhoto.id === 'uploaded' && imageLabels.length > 0 && (
                    <div className="mb-3">
                      <h5>Image Labels:</h5>
                      <ul>
                        {imageLabels.map((label, index) => (
                          <li key={index}>{label}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <CommentSection theme={theme}>
                    {selectedPhoto.comments.map((comment) => (
                      <Comment key={comment.id}>
                        <div className="comment-header">
                          <UserAvatar src={comment.avatar} alt={comment.author} />
                          <span className="comment-author">{comment.author}</span>
                        </div>
                        <div className="comment-text">{comment.text}</div>
                        <div className="comment-actions">
                          <ActionButton theme={theme} onClick={() => handleCommentLike(comment.id, selectedPhoto, setSelectedPhoto)}>
                            <FontAwesomeIcon icon={faHeart} /> {comment.likes}
                          </ActionButton>
                          <ActionButton theme={theme}>
                            <FontAwesomeIcon icon={faReply} /> Reply
                          </ActionButton>
                        </div>
                      </Comment>
                    ))}
                  </CommentSection>
                  <Form onSubmit={(e) => handleCommentSubmit(e, newComment, selectedPhoto, setSelectedPhoto, setNewComment)}>
                    <InputGroup>
                      <Form.Control
                        placeholder="Adicione um comentário..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: 'none'}}
                      />
                      <StyledButton type="submit" theme={theme}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </StyledButton>
                    </InputGroup>
                  </Form>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </StyledModal>

        <Modal show={showMoodBoard} onHide={() => setShowMoodBoard(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Mood Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DragDropContext onDragEnd={(result) => handleDragEnd(result, moodBoardItems, setMoodBoardItems)}>
              <Droppable droppableId="moodboard">
                {(provided) => (
                  <MoodBoard {...provided.droppableProps} ref={provided.innerRef}>
                    {moodBoardItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided) => (
                          <MoodBoardItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <img src={item.url} alt={item.caption} />
                          </MoodBoardItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </MoodBoard>
                )}
              </Droppable>
            </DragDropContext>
            <StyledButton onClick={() => setMoodBoardItems([...moodBoardItems, ...photos.slice(0, 3)])} theme={theme}>
              Add More Photos
            </StyledButton>
          </Modal.Body>
        </Modal>
      </GradientBackground>
    </Layout>
  );
}

export default GaleriaFotosPage;
