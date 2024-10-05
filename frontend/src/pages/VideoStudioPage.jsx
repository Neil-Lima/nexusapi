import React, { useState, useRef } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Form, Tabs, Tab, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCut, faClosedCaptioning, faPalette, faShare, faPlus, faMinus, faUndo, faRedo, faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { SketchPicker } from 'react-color';
import { GradientBackground, StudioCard, StyledButton, VideoPreview, StyledTabs, StyledForm, EditingTools, TimelineContainer, CaptionContainer, CustomizationContainer, StyledDropdown } from '../styles/VideoStudioStyle';
import { handleFileChange, handleUpload, handleTrimVideo, handleAddCaption, handleCaptionChange, handleCustomizationChange } from '../utils/VideoStudioUtil';

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
                      <Form.Control type="file" accept="video/*" onChange={(e) => handleFileChange(e, setVideoFile, videoRef)} />
                    </Form.Group>
                    {videoFile && (
                      <>
                        <VideoPreview ref={videoRef} controls />
                        <StyledButton onClick={() => handleUpload(setUploadProgress)} theme={theme}>Iniciar Upload</StyledButton>
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
                    <StyledButton onClick={() => handleAddCaption(captions, setCaptions)} theme={theme}>Adicionar Legenda</StyledButton>
                    <CaptionContainer>
                      {captions.map((caption, index) => (
                        <div key={index}>
                          <Form.Group>
                            <Form.Label>Tempo Inicial</Form.Label>
                            <Form.Control
                              type="number"
                              value={caption.startTime}
                              onChange={(e) => handleCaptionChange(index, 'startTime', e.target.value, captions, setCaptions)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Tempo Final</Form.Label>
                            <Form.Control
                              type="number"
                              value={caption.endTime}
                              onChange={(e) => handleCaptionChange(index, 'endTime', e.target.value, captions, setCaptions)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Texto da Legenda</Form.Label>
                            <Form.Control
                              as="textarea"
                              value={caption.text}
                              onChange={(e) => handleCaptionChange(index, 'text', e.target.value, captions, setCaptions)}
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
                          onChange={(color) => handleCustomizationChange('titleColor', color.hex, customization, setCustomization)}
                        />
                      </div>
                      <div>
                        <h4>Fonte do Título</h4>
                        <StyledDropdown theme={theme}>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {customization.titleFont}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleCustomizationChange('titleFont', 'Arial', customization, setCustomization)}>Arial</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCustomizationChange('titleFont', 'Helvetica', customization, setCustomization)}>Helvetica</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCustomizationChange('titleFont', 'Times New Roman', customization, setCustomization)}>Times New Roman</Dropdown.Item>
                          </Dropdown.Menu>
                        </StyledDropdown>
                      </div>
                      <div>
                        <h4>Tamanho do Título</h4>
                        <Form.Control
                          type="number"
                          value={customization.titleSize}
                          onChange={(e) => handleCustomizationChange('titleSize', e.target.value, customization, setCustomization)}
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
