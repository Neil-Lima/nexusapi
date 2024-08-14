import React, { useState, useRef } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Button, Modal, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShareAlt, faHome, faUser, faGlobeAmericas, faUsers, faBars, faPaperPlane, faReply, faCamera, faMagic, faPalette, faUpload } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import { ChromePicker } from 'react-color';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(Card)`
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  overflow: hidden;
`;

const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #ffffff;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;

const IconWrapper = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const SidebarWrapper = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: ${props => props.show ? '0' : '-50%'};
    width: 50%;
    height: 100vh;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255,255,255,0.18);
    transition: left 0.3s ease-in-out;
    z-index: 1000;
    overflow-y: auto;
    padding: 20px;
  }
`;

const Overlay = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => props.show ? 'block' : 'none'};
    z-index: 999;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const PhotoItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalImage = styled(Image)`
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textColor || '#ffffff'};
  font-size: 1rem;
  padding: 10px 15px;
  margin-right: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.primaryColor};
    transform: translateY(-3px);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 20px;
    color: #ffffff;
  }

  .modal-header {
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .modal-footer {
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  animation: ${fadeIn} 0.3s ease;

  .modal-dialog {
    max-width: 80%;
    width: 80%;
  }
`;

const CommentSection = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primaryColor};
    border-radius: 5px;
  }
`;

const Comment = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;

  .comment-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .comment-author {
    font-weight: bold;
    margin-left: 10px;
  }

  .comment-text {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .comment-actions {
    display: flex;
    justify-content: flex-start;
    font-size: 0.8rem;
  }
`;

const UserAvatar = styled(Image)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const MoodBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const MoodBoardItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
  cursor: move;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

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

  const photos = [
    { id: 1, url: 'https://picsum.photos/400/400?random=1', caption: 'Beautiful sunset', likes: 150, comments: [
      { id: 1, author: 'John Doe', avatar: 'https://picsum.photos/30/30?random=10', text: 'Amazing view!', likes: 5, replies: [] },
      { id: 2, author: 'Jane Smith', avatar: 'https://picsum.photos/30/30?random=11', text: 'I wish I was there!', likes: 3, replies: [] }
    ], shares: 20 },
    { id: 2, url: 'https://picsum.photos/400/400?random=2', caption: 'City lights', likes: 200, comments: [
      { id: 3, author: 'Alice Johnson', avatar: 'https://picsum.photos/30/30?random=12', text: 'The city never sleeps!', likes: 7, replies: [] },
      { id: 4, author: 'Bob Williams', avatar: 'https://picsum.photos/30/30?random=13', text: 'Great shot!', likes: 2, replies: [] }
    ], shares: 30 },
    { id: 3, url: 'https://picsum.photos/400/400?random=3', caption: 'Mountain view', likes: 180, comments: [
      { id: 5, author: 'Emma Brown', avatar: 'https://picsum.photos/30/30?random=14', text: 'I love hiking there!', likes: 4, replies: [] },
      { id: 6, author: 'Michael Davis', avatar: 'https://picsum.photos/30/30?random=15', text: 'The air must be so fresh!', likes: 6, replies: [] }
    ], shares: 25 },
    { id: 4, url: 'https://picsum.photos/400/400?random=4', caption: 'Beach day', likes: 220, comments: [
      { id: 7, author: 'Sophia Wilson', avatar: 'https://picsum.photos/30/30?random=16', text: 'Perfect weather for a beach day!', likes: 8, replies: [] },
      { id: 8, author: 'Daniel Taylor', avatar: 'https://picsum.photos/30/30?random=17', text: 'The water looks so inviting!', likes: 5, replies: [] }
    ], shares: 35 },
    { id: 5, url: 'https://picsum.photos/400/400?random=5', caption: 'Forest adventure', likes: 190, comments: [
      { id: 9, author: 'Olivia Martinez', avatar: 'https://picsum.photos/30/30?random=18', text: 'I can almost smell the fresh air!', likes: 3, replies: [] },
      { id: 10, author: 'Ethan Anderson', avatar: 'https://picsum.photos/30/30?random=19', text: 'What a peaceful scene.', likes: 4, replies: [] }
    ], shares: 28 },
    { id: 6, url: 'https://picsum.photos/400/400?random=6', caption: 'Urban exploration', likes: 210, comments: [
      { id: 11, author: 'Ava Thomas', avatar: 'https://picsum.photos/30/30?random=20', text: 'The architecture is stunning!', likes: 6, replies: [] },
      { id: 12, author: 'Noah Clark', avatar: 'https://picsum.photos/30/30?random=21', text: 'I love exploring cities like this.', likes: 5, replies: [] }
    ], shares: 32 },
  ];

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const newCommentObj = {
        id: selectedPhoto.comments.length + 1,
        author: 'You',
        avatar: 'https://picsum.photos/30/30?random=22',
        text: newComment,
        likes: 0,
        replies: []
      };
      setSelectedPhoto({
        ...selectedPhoto,
        comments: [...selectedPhoto.comments, newCommentObj]
      });
      setNewComment('');
    }
  };

  const handleCommentLike = (commentId) => {
    setSelectedPhoto({
      ...selectedPhoto,
      comments: selectedPhoto.comments.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(moodBoardItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMoodBoardItems(items);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_cloudinary_upload_preset');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
          formData
        );

        setUploadedImage(response.data.secure_url);

        // Image recognition using Cloudinary's AI capabilities
        const aiResponse = await axios.get(
          `https://api.cloudinary.com/v1_1/your_cloud_name/image/analyze?url=${response.data.secure_url}&api_key=your_api_key`
        );

        setImageLabels(aiResponse.data.tags);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

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
            <Overlay show={showSidebar} onClick={toggleSidebar} />
            <Col lg={3}>
              <SidebarWrapper show={showSidebar}>
                <LeftColumn theme={theme} />
              </SidebarWrapper>
            </Col>
            <Col lg={9}>
              <StyledButton className="d-lg-none mb-3" onClick={toggleSidebar} theme={theme}>
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
                      onChange={handleImageUpload}
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
                      <PhotoItem key={photo.id} onClick={() => handlePhotoClick(photo)}>
                        <img src={photo.url} alt={photo.caption} />
                      </PhotoItem>
                    ))}
                    {uploadedImage && (
                      <PhotoItem onClick={() => handlePhotoClick({ id: 'uploaded', url: uploadedImage, caption: 'Uploaded Image', likes: 0, comments: [], shares: 0 })}>
                        <img src={uploadedImage} alt="Uploaded" />
                      </PhotoItem>
                    )}
                  </PhotoGrid>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>

        <StyledModal show={selectedPhoto !== null} onHide={handleClose} size="xl" centered>
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
                          <ActionButton theme={theme} onClick={() => handleCommentLike(comment.id)}>
                            <FontAwesomeIcon icon={faHeart} /> {comment.likes}
                          </ActionButton>
                          <ActionButton theme={theme}>
                            <FontAwesomeIcon icon={faReply} /> Reply
                          </ActionButton>
                        </div>
                      </Comment>
                    ))}
                  </CommentSection>
                  <Form onSubmit={handleCommentSubmit} className="mt-3">
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
            <DragDropContext onDragEnd={handleDragEnd}>
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
