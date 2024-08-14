import React, { useState, useRef, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Form, ProgressBar, Tabs, Tab, Dropdown, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCut, faClosedCaptioning, faPalette, faShare, faPlus, faMinus, faUndo, faRedo, faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import { motion } from 'framer-motion';
import { SketchPicker } from 'react-color';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StudioCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled.button`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const VideoPreview = styled.video`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const StyledTabs = styled(Tabs)`
  .nav-link {
    color: white;
    &.active {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: transparent;
    }
  }
`;

const StyledForm = styled(Form)`
  .form-control {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const EditingTools = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const TimelineContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 100px;
  margin-top: 20px;
`;

const CaptionContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const CustomizationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StyledDropdown = styled(Dropdown)`
  .dropdown-toggle {
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
  }

  .dropdown-menu {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .dropdown-item {
    color: white;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

function VideoStudioPage() {
  const { theme } = useTheme();
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [captions, setCaptions] = useState([]);
  const [customization, setCustomization] = useState({
    titleColor: '#ffffff',
    titleFont: 'Arial',
    titleSize: 24,
  });
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    const videoUrl = URL.createObjectURL(file);
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
  };

  const handleUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleTrimVideo = () => {
    console.log('Trimming video...');
  };

  const handleAddCaption = () => {
    setCaptions([...captions, { startTime: 0, endTime: 5, text: 'New caption' }]);
  };

  const handleCaptionChange = (index, field, value) => {
    const newCaptions = [...captions];
    newCaptions[index][field] = value;
    setCaptions(newCaptions);
  };

  const handleCustomizationChange = (field, value) => {
    setCustomization({ ...customization, [field]: value });
  };

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <h1 className="text-center text-white mb-5">Estúdio de Vídeo</h1>
          <Row>
            <Col md={8}>
              <StudioCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <StyledTabs defaultActiveKey="upload" id="studio-tabs">
                  <Tab eventKey="upload" title={<><FontAwesomeIcon icon={faUpload} /> Upload</>}>
                    <Form.Group>
                      <Form.Label>Selecione o vídeo para upload</Form.Label>
                      <Form.Control type="file" accept="video/*" onChange={handleFileChange} />
                    </Form.Group>
                    {videoFile && (
                      <>
                        <VideoPreview ref={videoRef} controls />
                        <StyledButton onClick={handleUpload} theme={theme}>Iniciar Upload</StyledButton>
                        <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mt-3" />
                      </>
                    )}
                  </Tab>
                  <Tab eventKey="edit" title={<><FontAwesomeIcon icon={faCut} /> Editar</>}>
                    <EditingTools>
                      <StyledButton onClick={handleTrimVideo} theme={theme}><FontAwesomeIcon icon={faCut} /> Cortar</StyledButton>
                      <StyledButton theme={theme}><FontAwesomeIcon icon={faPlus} /> Adicionar Mídia</StyledButton>
                      <StyledButton theme={theme}><FontAwesomeIcon icon={faMinus} /> Remover Seleção</StyledButton>
                      <StyledButton theme={theme}><FontAwesomeIcon icon={faUndo} /> Desfazer</StyledButton>
                      <StyledButton theme={theme}><FontAwesomeIcon icon={faRedo} /> Refazer</StyledButton>
                    </EditingTools>
                    <VideoPreview ref={videoRef} controls />
                    <TimelineContainer>
                      {/* Implementação futura do componente de linha do tempo */}
                    </TimelineContainer>
                  </Tab>
                  <Tab eventKey="captions" title={<><FontAwesomeIcon icon={faClosedCaptioning} /> Legendas</>}>
                    <StyledButton onClick={handleAddCaption} theme={theme}>Adicionar Legenda</StyledButton>
                    <CaptionContainer>
                      {captions.map((caption, index) => (
                        <div key={index}>
                          <Form.Group>
                            <Form.Label>Tempo Inicial</Form.Label>
                            <Form.Control
                              type="number"
                              value={caption.startTime}
                              onChange={(e) => handleCaptionChange(index, 'startTime', e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Tempo Final</Form.Label>
                            <Form.Control
                              type="number"
                              value={caption.endTime}
                              onChange={(e) => handleCaptionChange(index, 'endTime', e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Texto da Legenda</Form.Label>
                            <Form.Control
                              as="textarea"
                              value={caption.text}
                              onChange={(e) => handleCaptionChange(index, 'text', e.target.value)}
                            />
                          </Form.Group>
                        </div>
                      ))}
                    </CaptionContainer>
                  </Tab>
                  <Tab eventKey="customize" title={<><FontAwesomeIcon icon={faPalette} /> Personalizar</>}>
                    <CustomizationContainer>
                      <div>
                        <h4>Cor do Título</h4>
                        <SketchPicker
                          color={customization.titleColor}
                          onChange={(color) => handleCustomizationChange('titleColor', color.hex)}
                        />
                      </div>
                      <div>
                        <h4>Fonte do Título</h4>
                        <StyledDropdown theme={theme}>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {customization.titleFont}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleCustomizationChange('titleFont', 'Arial')}>Arial</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCustomizationChange('titleFont', 'Helvetica')}>Helvetica</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCustomizationChange('titleFont', 'Times New Roman')}>Times New Roman</Dropdown.Item>
                          </Dropdown.Menu>
                        </StyledDropdown>
                      </div>
                      <div>
                        <h4>Tamanho do Título</h4>
                        <Form.Control
                          type="number"
                          value={customization.titleSize}
                          onChange={(e) => handleCustomizationChange('titleSize', e.target.value)}
                        />
                      </div>
                    </CustomizationContainer>
                  </Tab>
                </StyledTabs>
              </StudioCard>
            </Col>
            <Col md={4}>
              <StudioCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-white mb-4">Detalhes do Vídeo</h3>
                <StyledForm>
                  <Form.Group>
                    <Form.Label>Título do Vídeo</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Digite o título do vídeo"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Digite a descrição do vídeo"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="text" placeholder="Adicione tags separadas por vírgulas" />
                  </Form.Group>
                  <StyledButton className="mt-3" theme={theme}>
                    <FontAwesomeIcon icon={faShare} /> Publicar Vídeo
                  </StyledButton>
                </StyledForm>
              </StudioCard>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default VideoStudioPage;
