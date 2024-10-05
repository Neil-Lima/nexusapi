import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Form, Pagination, Modal, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faBookmark, faShare, faPlus, faBuilding, faMapMarkerAlt, faDollarSign, faBriefcase, faClock } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { GradientBackground, StyledCard, StyledButton, SearchBar, FilterSection, JobCard, JobTitle, JobInfo, StyledBadge, ProfileSection, ProfilePicture, StyledModal, StyledListGroup, StyledTabs, StyledPagination, StyledDatePicker, StyledForm, StyledSelect } from '../styles/EmpregosStyle';
import { handleSearch, handleFilterChange, handleIndustryFilter, applyFilters, handleJobClick, handleApplyJob, handleSaveJob, handleShareJob, handleNewJobChange, handleLocationChange, handlePostJob, mockJobs, careerPredictionData } from '../utils/EmpregosUtil';

function EmpregosPage() {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    salary: '',
    experience: '',
    industry: []
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [skillMatchPercentage, setSkillMatchPercentage] = useState(0);
  const [showARTour, setShowARTour] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showCollaborativeProjects, setShowCollaborativeProjects] = useState(false);
  const [showFreelanceMarketplace, setShowFreelanceMarketplace] = useState(false);
  const [showBlockchainReputation, setShowBlockchainReputation] = useState(false);
  const [showCareerPrediction, setShowCareerPrediction] = useState(false);
  const [showVirtualCoaching, setShowVirtualCoaching] = useState(false);
  const [showNetworking, setShowNetworking] = useState(false);
  const [showGamification, setShowGamification] = useState(false);
  const [showVRPortfolio, setShowVRPortfolio] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [interviewDate, setInterviewDate] = useState(new Date());
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: {
      country: '',
      state: '',
      city: ''
    },
    salary: '',
    type: '',
    experience: '',
    description: '',
    requirements: [],
    benefits: [],
    industry: []
  });

  useEffect(() => {
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <h1 className="text-center mb-5" style={{color: '#ffffff'}}>Encontre seu Emprego Ideal</h1>
          <Row>
            <Col md={8}>
              <SearchBar onSubmit={(e) => handleSearch(e, jobs, searchTerm, setFilteredJobs, setCurrentPage)}>
                <Form.Group controlId="searchJobs">
                  <Form.Control 
                    type="text" 
                    placeholder="Busque por cargo, empresa ou indústria" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff'}}
                  />
                </Form.Group>
                <br/>
                <StyledButton type="submit" theme={theme}>
                  <FontAwesomeIcon icon={faSearch} /> Buscar
                </StyledButton>
              </SearchBar>

              {currentJobs.map(job => (
                <JobCard key={job.id} theme={theme} whileHover={{ scale: 1.03 }}>
                  <JobTitle theme={theme}>{job.title}</JobTitle>
                  <JobInfo theme={theme}>
                    <FontAwesomeIcon icon={faBuilding} />
                    {job.company}
                  </JobInfo>
                  <JobInfo theme={theme}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {`${job.location.city}, ${job.location.state}, ${job.location.country}`}
                  </JobInfo>
                  <JobInfo theme={theme}>
                    <FontAwesomeIcon icon={faDollarSign} />
                    {job.salary}
                  </JobInfo>
                  <JobInfo theme={theme}>
                    <FontAwesomeIcon icon={faBriefcase} />
                    {job.type}
                  </JobInfo>
                  <JobInfo theme={theme}>
                    <FontAwesomeIcon icon={faClock} />
                    {job.experience}
                  </JobInfo>
                  <p>{job.description}</p>
                  <div>
                    {job.industry.map((ind, index) => (
                      <StyledBadge key={index} theme={theme}>{ind}</StyledBadge>
                    ))}
                  </div>
                  <div className="mt-3">
                    <StyledButton theme={theme} onClick={() => handleJobClick(job, setSelectedJob, setShowModal, setSkillMatchPercentage)} className="me-2">
                      Ver Detalhes
                    </StyledButton>
                    <StyledButton variant="outline-primary" theme={theme} onClick={() => handleSaveJob(job.id, setSavedJobs)} className="me-2">
                      <FontAwesomeIcon icon={faBookmark} /> Salvar
                    </StyledButton>
                    <StyledButton variant="outline-primary" theme={theme} onClick={() => handleShareJob(job)}>
                      <FontAwesomeIcon icon={faShare} /> Compartilhar
                    </StyledButton>
                  </div>
                </JobCard>
              ))}

              <StyledPagination className="justify-content-center" theme={theme}>
                {[...Array(Math.ceil(filteredJobs.length / jobsPerPage)).keys()].map(number => (
                  <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                    {number + 1}
                  </Pagination.Item>
                ))}
              </StyledPagination>
            </Col>
            <Col md={4}>
              <StyledButton onClick={() => setShowPostJobModal(true)} theme={theme} className="w-100 mt-3">
                <FontAwesomeIcon icon={faPlus} /> Anunciar Nova Vaga
              </StyledButton>
              <br /><br />
              <FilterSection theme={theme}>
                <h3 style={{color: '#ffffff'}}>Filtros</h3>
                <StyledForm>
                  <Form.Group controlId="jobType">
                    <Form.Label>Tipo de Trabalho</Form.Label>
                    <StyledSelect name="jobType" onChange={(e) => handleFilterChange(e, setFilters)}>
                      <option value="">Todos</option>
                      <option value="Remoto">Remoto</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Híbrido">Híbrido</option>
                    </StyledSelect>
                  </Form.Group>
                  <Form.Group controlId="location">
                    <Form.Label>Localização</Form.Label>
                    <Form.Control type="text" name="location" onChange={(e) => handleFilterChange(e, setFilters)} placeholder="Digite a cidade, estado ou país" />
                  </Form.Group>
                  <Form.Group controlId="salary">
                    <Form.Label>Faixa Salarial</Form.Label>
                    <StyledSelect name="salary" onChange={(e) => handleFilterChange(e, setFilters)}>
                      <option value="">Todos</option>
                      <option value="0-3000">Até R$ 3.000</option>
                      <option value="3000-6000">R$ 3.000 - R$ 6.000</option>
                      <option value="6000-9000">R$ 6.000 - R$ 9.000</option>
                      <option value="9000-">Acima de R$ 9.000</option>
                    </StyledSelect>
                  </Form.Group>
                  <Form.Group controlId="experience">
                    <Form.Label>Experiência</Form.Label>
                    <StyledSelect name="experience" onChange={(e) => handleFilterChange(e, setFilters)}>
                      <option value="">Todos</option>
                      <option value="Estágio">Estágio</option>
                      <option value="Júnior">Júnior</option>
                      <option value="Pleno">Pleno</option>
                      <option value="Sênior">Sênior</option>
                    </StyledSelect>
                  </Form.Group>
                  <Form.Group controlId="industry">
                    <Form.Label>Indústria</Form.Label>
                    <div>
                      {['Tecnologia', 'Saúde', 'Educação', 'Finanças', 'Marketing'].map(ind => (
                        <Form.Check
                          key={ind}
                          type="checkbox"
                          label={ind}
                          onChange={() => handleIndustryFilter(ind, setFilters)}
                          style={{color: '#ffffff'}}
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <StyledButton onClick={() => applyFilters(jobs, filters, setFilteredJobs, setCurrentPage)} theme={theme} className="mt-3">
                    <FontAwesomeIcon icon={faFilter} /> Aplicar Filtros
                  </StyledButton>
                </StyledForm>
              </FilterSection>

              <ProfileSection theme={theme}>
                <h3 style={{color: '#ffffff'}}>Seu Perfil</h3>
                <ProfilePicture src="https://via.placeholder.com/100" alt="Foto de Perfil" theme={theme} />
                <h4 style={{color: '#ffffff'}}>João Silva</h4>
                <p style={{color: '#ffffff'}}>Profissional de Marketing</p>
                <StyledButton theme={theme}>Editar Perfil</StyledButton>
                <hr />
                <h5 style={{color: '#ffffff'}}>Vagas Salvas</h5>
                <p style={{color: '#ffffff'}}>Você tem {savedJobs.length} vagas salvas</p>
                <StyledButton theme={theme}>Ver Vagas Salvas</StyledButton>
                <hr />
                <h5 style={{color: '#ffffff'}}>Vagas Aplicadas</h5>
                <p style={{color: '#ffffff'}}>Você aplicou para {appliedJobs.length} vagas</p>
                <StyledButton theme={theme}>Ver Vagas Aplicadas</StyledButton>
              </ProfileSection>
            </Col>
          </Row>
        </Container>
      </GradientBackground>

      <StyledModal show={showModal} onHide={() => setShowModal(false)} size="lg" centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>{selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledTabs defaultActiveKey="details" theme={theme}>
            <Tab eventKey="details" title="Detalhes da Vaga">
              <JobInfo theme={theme}>
                <FontAwesomeIcon icon={faBuilding} />
                {selectedJob?.company}
              </JobInfo>
              <JobInfo theme={theme}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {`${selectedJob?.location.city}, ${selectedJob?.location.state}, ${selectedJob?.location.country}`}
              </JobInfo>
              <JobInfo theme={theme}>
                <FontAwesomeIcon icon={faDollarSign} />
                {selectedJob?.salary}
              </JobInfo>
              <JobInfo theme={theme}>
                <FontAwesomeIcon icon={faBriefcase} />
                {selectedJob?.type}
              </JobInfo>
              <JobInfo theme={theme}>
                <FontAwesomeIcon icon={faClock} />
                {selectedJob?.experience}
              </JobInfo>
              <h5 style={{color: '#ffffff', marginTop: '20px'}}>Descrição da Vaga</h5>
              <p style={{color: '#ffffff'}}>{selectedJob?.description}</p>
              <h5 style={{color: '#ffffff'}}>Requisitos</h5>
              <StyledListGroup theme={theme}>
                {selectedJob?.requirements.map((req, index) => (
                  <ListGroup.Item key={index}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{marginRight: '10px', color: theme.primaryColor}} />
                    {req}
                  </ListGroup.Item>
                ))}
              </StyledListGroup>
              <h5 style={{color: '#ffffff', marginTop: '20px'}}>Benefícios</h5>
              <StyledListGroup theme={theme}>
                {selectedJob?.benefits.map((benefit, index) => (
                  <ListGroup.Item key={index}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{marginRight: '10px', color: theme.primaryColor}} />
                    {benefit}
                  </ListGroup.Item>
                ))}
              </StyledListGroup>
            </Tab>
            <Tab eventKey="company" title="Sobre a Empresa">
              <h5 style={{color: '#ffffff'}}>Cultura da Empresa</h5>
              <p style={{color: '#ffffff'}}>A {selectedJob?.company} valoriza a inovação, colaboração e o crescimento contínuo de seus funcionários. Nosso ambiente de trabalho é dinâmico e desafiador, proporcionando oportunidades para o desenvolvimento profissional e pessoal.</p>
              <h5 style={{color: '#ffffff'}}>Projetos Recentes</h5>
              <p style={{color: '#ffffff'}}>Recentemente, a {selectedJob?.company} lançou uma plataforma inovadora e está trabalhando em soluções para otimizar processos internos.</p>
            </Tab>
            <Tab eventKey="interview" title="Preparação para Entrevista">
              <h5 style={{color: '#ffffff'}}>Dicas para Entrevista</h5>
              <StyledListGroup theme={theme}>
                <ListGroup.Item>Pesquise sobre a {selectedJob?.company} e seus produtos/serviços</ListGroup.Item>
                <ListGroup.Item>Prepare exemplos de projetos relevantes que você realizou</ListGroup.Item>
                <ListGroup.Item>Esteja pronto para discutir suas habilidades e experiências em profundidade</ListGroup.Item>
                <ListGroup.Item>Prepare perguntas sobre a cultura da empresa e oportunidades de crescimento</ListGroup.Item>
              </StyledListGroup>
              <h5 style={{color: '#ffffff', marginTop: '20px'}}>Agendar Entrevista</h5>
              <StyledDatePicker
                selected={interviewDate}
                onChange={(date) => setInterviewDate(date)}
                showTimeSelect
                dateFormat="Pp"
                theme={theme}
              />
              <StyledButton theme={theme} style={{marginTop: '20px'}}>
                Confirmar Agendamento
              </StyledButton>
            </Tab>
          </StyledTabs>
        </Modal.Body>
        <Modal.Footer>
          <div style={{color: '#ffffff', marginRight: 'auto'}}>
            Compatibilidade de Habilidades: {skillMatchPercentage}%
          </div>
          <StyledButton onClick={() => setShowModal(false)} theme={theme}>
            Fechar
          </StyledButton>
          <StyledButton onClick={() => handleApplyJob(selectedJob?.id, setAppliedJobs, setShowModal)} theme={theme}>
            Aplicar para esta vaga
          </StyledButton>
        </Modal.Footer>
      </StyledModal>

      <StyledModal show={showPostJobModal} onHide={() => setShowPostJobModal(false)} size="xl" centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Anunciar Nova Vaga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledForm onSubmit={(e) => handlePostJob(e, newJob, jobs, setJobs, setFilteredJobs, setShowPostJobModal, setNewJob)}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="jobTitle">
                  <Form.Label>Título da Vaga</Form.Label>
                  <Form.Control type="text" name="title" value={newJob.title} onChange={(e) => handleNewJobChange(e, setNewJob)} required />
                </Form.Group>
                <Form.Group controlId="jobCompany">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control type="text" name="company" value={newJob.company} onChange={(e) => handleNewJobChange(e, setNewJob)} required />
                </Form.Group>
                <Form.Group controlId="jobCountry">
                  <Form.Label>País</Form.Label>
                  <Form.Control type="text" name="country" value={newJob.location.country} onChange={(e) => handleLocationChange(e, setNewJob)} required />
                </Form.Group>
                <Form.Group controlId="jobState">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control type="text" name="state" value={newJob.location.state} onChange={(e) => handleLocationChange(e, setNewJob)} required />
                </Form.Group>
                <Form.Group controlId="jobCity">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control type="text" name="city" value={newJob.location.city} onChange={(e) => handleLocationChange(e, setNewJob)} required />
                </Form.Group>
                <Form.Group controlId="jobSalary">
                  <Form.Label>Faixa Salarial</Form.Label>
                  <Form.Control type="text" name="salary" value={newJob.salary} onChange={(e) => handleNewJobChange(e, setNewJob)} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="jobType">
                  <Form.Label>Tipo de Trabalho</Form.Label>
                  <StyledSelect name="type" value={newJob.type} onChange={(e) => handleNewJobChange(e, setNewJob)} required>
                    <option value="">Selecione</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                  </StyledSelect>
                </Form.Group>
                <Form.Group controlId="jobExperience">
                  <Form.Label>Experiência Necessária</Form.Label>
                  <StyledSelect name="experience" value={newJob.experience} onChange={(e) => handleNewJobChange(e, setNewJob)} required>
                    <option value="">Selecione</option>
                    <option value="Estágio">Estágio</option>
                    <option value="Júnior">Júnior</option>
                    <option value="Pleno">Pleno</option>
                    <option value="Sênior">Sênior</option>
                  </StyledSelect>
                </Form.Group>
                <Form.Group controlId="jobDescription">
                  <Form.Label>Descrição da Vaga</Form.Label>
                  <Form.Control as="textarea" rows={4} name="description" value={newJob.description} onChange={(e) => handleNewJobChange(e, setNewJob)} required />
                </Form.Group>
                <Form.Group controlId="jobRequirements">
                  <Form.Label>Requisitos (separados por vírgula)</Form.Label>
                  <Form.Control type="text" name="requirements" value={newJob.requirements.join(', ')} onChange={(e) => setNewJob({...newJob, requirements: e.target.value.split(',')})} required />
                </Form.Group>
                <Form.Group controlId="jobBenefits">
                  <Form.Label>Benefícios (separados por vírgula)</Form.Label>
                  <Form.Control type="text" name="benefits" value={newJob.benefits.join(', ')} onChange={(e) => setNewJob({...newJob, benefits: e.target.value.split(',')})} required />
                </Form.Group>
                <Form.Group controlId="jobIndustry">
                  <Form.Label>Indústria (separadas por vírgula)</Form.Label>
                  <Form.Control type="text" name="industry" value={newJob.industry.join(', ')} onChange={(e) => setNewJob({...newJob, industry: e.target.value.split(',')})} required />
                </Form.Group>
              </Col>
            </Row>
            <StyledButton type="submit" theme={theme} className="mt-3">
              Publicar Vaga
            </StyledButton>
          </StyledForm>
        </Modal.Body>
      </StyledModal>
    </Layout>
  );
}

export default EmpregosPage;

