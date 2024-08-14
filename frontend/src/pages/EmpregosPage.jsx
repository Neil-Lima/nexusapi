import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Form, Card, Badge, Button, Pagination, Modal, ListGroup, Tabs, Tab, ProgressBar, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faBookmark, faBriefcase, faMapMarkerAlt, faDollarSign, faBuilding, faClock, faChevronDown, faChevronUp, faUser, faEnvelope, faPhone, faGlobe, faCheckCircle, faTimesCircle, faGraduationCap, faHandshake, faChartLine, faComments, faLightbulb, faTrophy, faCalendarAlt, faVrCardboard, faRobot, faPuzzlePiece, faCode, faCubes, faCommentDots, faUsers, faGamepad, faFileAlt, faShare, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(motion.div)`
  border-radius: 15px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  color: #ffffff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
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

const SearchBar = styled(Form)`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 10px;
  margin-bottom: 20px;
`;

const FilterSection = styled(StyledCard)`
  padding: 20px;
  margin-bottom: 20px;
`;

const JobCard = styled(StyledCard)`
  padding: 20px;
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

const JobInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #ffffff;

  svg {
    margin-right: 10px;
    color: ${props => props.theme.secondaryColor};
  }
`;

const StyledBadge = styled(Badge)`
  margin-right: 10px;
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 20px;
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  color: #ffffff;
`;

const ProfileSection = styled(StyledCard)`
  padding: 20px;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid ${props => props.theme.primaryColor};
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
    color: #ffffff;
  }

  .modal-header, .modal-footer {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .close {
    color: #ffffff;
  }
`;

const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: none;
    margin-bottom: 10px;
    border-radius: 10px;
  }
`;

const StyledTabs = styled(Tabs)`
  .nav-link {
    color: #ffffff;
    &.active {
      background-color: ${props => props.theme.primaryColor};
      color: #ffffff;
    }
  }
`;

const StyledPagination = styled(Pagination)`
  .page-item .page-link {
    background-color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.secondaryColor};
    color: #ffffff;
  }

  .page-item.active .page-link {
    background-color: ${props => props.theme.secondaryColor};
    border-color: ${props => props.theme.primaryColor};
  }
`;

const StyledDatePicker = styled(DatePicker)`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${props => props.theme.primaryColor};
  border-radius: 5px;
  color: #ffffff;
  padding: 10px;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.secondaryColor};
  }
`;

const StyledForm = styled(Form)`
  .form-control, .form-select {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid ${props => props.theme.primaryColor};
    color: #ffffff;

    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 0 2px ${props => props.theme.secondaryColor};
    }
  }

  .form-label {
    color: #ffffff;
  }
`;

const StyledSelect = styled(Form.Select)`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${props => props.theme.primaryColor};
  color: #ffffff;
  padding: 10px;

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 2px ${props => props.theme.secondaryColor};
  }

  option {
    background-color: ${props => props.theme.primaryColor};
    color: #ffffff;
  }
`;

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
    const mockJobs = [
      {
        id: 1,
        title: 'Gerente de Projetos',
        company: 'TechCorp',
        location: {
          country: 'Brasil',
          state: 'São Paulo',
          city: 'São Paulo'
        },
        salary: 'R$ 8.000 - R$ 12.000',
        type: 'Remoto',
        experience: '3-5 anos',
        description: 'Estamos procurando um gerente de projetos experiente para liderar nossa equipe...',
        requirements: ['Experiência em gestão de projetos', 'Conhecimento em metodologias ágeis', 'Habilidades de comunicação'],
        benefits: ['Plano de saúde', 'Vale refeição', 'Horário flexível', 'Gympass'],
        industry: ['Tecnologia', 'Gestão']
      },
      {
        id: 2,
        title: 'Designer de Produto',
        company: 'DesignHub',
        location: {
          country: 'Brasil',
          state: 'Rio de Janeiro',
          city: 'Rio de Janeiro'
        },
        salary: 'R$ 6.000 - R$ 9.000',
        type: 'Híbrido',
        experience: '2-4 anos',
        description: 'Procuramos um designer de produto criativo para ajudar a moldar a experiência do usuário em nossos produtos...',
        requirements: ['Experiência em design de produto', 'Conhecimento em UX/UI', 'Habilidades em prototipagem'],
        benefits: ['Plano de saúde', 'Vale transporte', 'Cursos de design', 'Home office parcial'],
        industry: ['Design', 'Tecnologia']
      },
    ];

    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.industry.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleIndustryFilter = (industry) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      industry: prevFilters.industry.includes(industry)
        ? prevFilters.industry.filter(ind => ind !== industry)
        : [...prevFilters.industry, industry]
    }));
  };

  const applyFilters = () => {
    let filtered = jobs;
    if (filters.jobType) {
      filtered = filtered.filter(job => job.type === filters.jobType);
    }
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        job.location.state.toLowerCase().includes(filters.location.toLowerCase()) ||
        job.location.country.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.salary) {
      filtered = filtered.filter(job => {
        const [min, max] = job.salary.replace(/[^0-9,-]/g, '').split('-').map(Number);
        const [filterMin, filterMax] = filters.salary.split('-').map(Number);
        return min >= filterMin && max <= filterMax;
      });
    }
    if (filters.experience) {
      filtered = filtered.filter(job => job.experience === filters.experience);
    }
    if (filters.industry.length > 0) {
      filtered = filtered.filter(job => 
        filters.industry.some(ind => job.industry.includes(ind))
      );
    }
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    setSkillMatchPercentage(Math.floor(Math.random() * 100));
  };

  const handleApplyJob = (jobId) => {
    setAppliedJobs([...appliedJobs, jobId]);
    setShowModal(false);
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs([...savedJobs, jobId]);
  };

  const handleShareJob = (job) => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Confira esta vaga de ${job.title} na ${job.company}!`,
        url: window.location.href,
      })
        .then(() => console.log('Vaga compartilhada com sucesso'))
        .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      alert('Compartilhamento não suportado neste navegador');
    }
  };

  const careerPredictionData = {
    labels: ['2023', '2024', '2025', '2026', '2027'],
    datasets: [
      {
        label: 'Demanda de Mercado',
        data: [65, 70, 80, 85, 90],
        fill: false,
        borderColor: theme.primaryColor,
      },
    ],
  };

  // Paginação
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNewJobChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevJob => ({
      ...prevJob,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevJob => ({
      ...prevJob,
      location: {
        ...prevJob.location,
        [name]: value
      }
    }));
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const newJobWithId = {
      ...newJob,
      id: jobs.length + 1,
    };
    setJobs([...jobs, newJobWithId]);
    setFilteredJobs([...filteredJobs, newJobWithId]);
    setShowPostJobModal(false);
    setNewJob({
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
  };

  return (
    <Layout>
       
      <GradientBackground theme={theme}>
        <Container>
        
          <h1 className="text-center mb-5" style={{color: '#ffffff'}}>Encontre seu Emprego Ideal</h1>
          <Row>
            <Col md={8}>
              <SearchBar onSubmit={handleSearch}>
                <Form.Group controlId="searchJobs">
                  <Form.Control 
                    type="text" 
                    placeholder="Busque por cargo, empresa ou indústria" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff'}}
                  />
                </Form.Group><br/>
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
                    <StyledButton theme={theme} onClick={() => handleJobClick(job)} className="me-2">
                      Ver Detalhes
                    </StyledButton>
                    <StyledButton variant="outline-primary" theme={theme} onClick={() => handleSaveJob(job.id)} className="me-2">
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
              </StyledButton><br /><br />
              <FilterSection theme={theme}>
                <h3 style={{color: '#ffffff'}}>Filtros</h3>
                <StyledForm>
                  <Form.Group controlId="jobType">
                    <Form.Label>Tipo de Trabalho</Form.Label>
                    <StyledSelect name="jobType" onChange={handleFilterChange}>
                      <option value="">Todos</option>
                      <option value="Remoto">Remoto</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Híbrido">Híbrido</option>
                    </StyledSelect>
                  </Form.Group>
                  <Form.Group controlId="location">
                    <Form.Label>Localização</Form.Label>
                    <Form.Control type="text" name="location" onChange={handleFilterChange} placeholder="Digite a cidade, estado ou país" />
                  </Form.Group>
                  <Form.Group controlId="salary">
                    <Form.Label>Faixa Salarial</Form.Label>
                    <StyledSelect name="salary" onChange={handleFilterChange}>
                      <option value="">Todos</option>
                      <option value="0-3000">Até R$ 3.000</option>
                      <option value="3000-6000">R$ 3.000 - R$ 6.000</option>
                      <option value="6000-9000">R$ 6.000 - R$ 9.000</option>
                      <option value="9000-">Acima de R$ 9.000</option>
                    </StyledSelect>
                  </Form.Group>
                  <Form.Group controlId="experience">
                    <Form.Label>Experiência</Form.Label>
                    <StyledSelect name="experience" onChange={handleFilterChange}>
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
                          onChange={() => handleIndustryFilter(ind)}
                          style={{color: '#ffffff'}}
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <StyledButton onClick={applyFilters} theme={theme} className="mt-3">
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

              <ProfileSection theme={theme}>
                <h3 style={{color: '#ffffff'}}>Recursos Inovadores</h3>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faVrCardboard} />
                  <StyledButton onClick={() => setShowARTour(true)} theme={theme}>Tour Virtual AR</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faRobot} />
                  <StyledButton onClick={() => setShowAIRecommendations(true)} theme={theme}>Recomendações IA</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faPuzzlePiece} />
                  <StyledButton onClick={() => setShowCollaborativeProjects(true)} theme={theme}>Projetos Colaborativos</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faHandshake} />
                  <StyledButton onClick={() => setShowFreelanceMarketplace(true)} theme={theme}>Marketplace Freelance</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faCubes} />
                  <StyledButton onClick={() => setShowBlockchainReputation(true)} theme={theme}>Reputação Blockchain</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faChartLine} />
                  <StyledButton onClick={() => setShowCareerPrediction(true)} theme={theme}>Previsão de Carreira</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faCommentDots} />
                  <StyledButton onClick={() => setShowVirtualCoaching(true)} theme={theme}>Coaching Virtual</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faUsers} />
                  <StyledButton onClick={() => setShowNetworking(true)} theme={theme}>Networking Inteligente</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faGamepad} />
                  <StyledButton onClick={() => setShowGamification(true)} theme={theme}>Gamificação</StyledButton>
                </JobInfo>
                <JobInfo theme={theme}>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <StyledButton onClick={() => setShowVRPortfolio(true)} theme={theme}>Portfólio VR</StyledButton>
                </JobInfo>
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
          <StyledButton onClick={() => handleApplyJob(selectedJob?.id)} theme={theme}>
            Aplicar para esta vaga
          </StyledButton>
        </Modal.Footer>
      </StyledModal>

      <StyledModal show={showPostJobModal} onHide={() => setShowPostJobModal(false)} size="xl" centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Anunciar Nova Vaga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledForm onSubmit={handlePostJob}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="jobTitle">
                  <Form.Label>Título da Vaga</Form.Label>
                  <Form.Control type="text" name="title" value={newJob.title} onChange={handleNewJobChange} required />
                </Form.Group>
                <Form.Group controlId="jobCompany">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control type="text" name="company" value={newJob.company} onChange={handleNewJobChange} required />
                </Form.Group>
                <Form.Group controlId="jobCountry">
                  <Form.Label>País</Form.Label>
                  <Form.Control type="text" name="country" value={newJob.location.country} onChange={handleLocationChange} required />
                </Form.Group>
                <Form.Group controlId="jobState">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control type="text" name="state" value={newJob.location.state} onChange={handleLocationChange} required />
                </Form.Group>
                <Form.Group controlId="jobCity">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control type="text" name="city" value={newJob.location.city} onChange={handleLocationChange} required />
                </Form.Group>
                <Form.Group controlId="jobSalary">
                  <Form.Label>Faixa Salarial</Form.Label>
                  <Form.Control type="text" name="salary" value={newJob.salary} onChange={handleNewJobChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="jobType">
                  <Form.Label>Tipo de Trabalho</Form.Label>
                  <StyledSelect name="type" value={newJob.type} onChange={handleNewJobChange} required>
                    <option value="">Selecione</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                  </StyledSelect>
                </Form.Group>
                <Form.Group controlId="jobExperience">
                  <Form.Label>Experiência Necessária</Form.Label>
                  <StyledSelect name="experience" value={newJob.experience} onChange={handleNewJobChange} required>
                    <option value="">Selecione</option>
                    <option value="Estágio">Estágio</option>
                    <option value="Júnior">Júnior</option>
                    <option value="Pleno">Pleno</option>
                    <option value="Sênior">Sênior</option>
                  </StyledSelect>
                </Form.Group>
                <Form.Group controlId="jobDescription">
                  <Form.Label>Descrição da Vaga</Form.Label>
                  <Form.Control as="textarea" rows={4} name="description" value={newJob.description} onChange={handleNewJobChange} required />
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

      {/* Modais para recursos inovadores */}
      <StyledModal show={showARTour} onHide={() => setShowARTour(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Tour Virtual em Realidade Aumentada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Bem-vindo ao tour virtual em AR da {selectedJob?.company}! Use seu dispositivo móvel para explorar nosso escritório em 360°. Você verá nossa área de trabalho colaborativa, salas de reunião modernas e nosso espaço de lazer.</p>
          <div style={{width: '100%', height: '300px', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff'}}>
            [Simulação de visualização AR]
          </div>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showAIRecommendations} onHide={() => setShowAIRecommendations(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Recomendações de IA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Com base no seu perfil, estas são as vagas recomendadas para você:</p>
          <StyledListGroup theme={theme}>
            <ListGroup.Item>Gerente de Marketing Digital - TechCorp</ListGroup.Item>
            <ListGroup.Item>Especialista em Mídias Sociais - SocialBoost</ListGroup.Item>
            <ListGroup.Item>Analista de Marketing - DataDriven Inc.</ListGroup.Item>
          </StyledListGroup>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showCollaborativeProjects} onHide={() => setShowCollaborativeProjects(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Projetos Colaborativos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Participe de projetos reais propostos por empresas:</p>
          <StyledListGroup theme={theme}>
            <ListGroup.Item>Campanha de marketing para app de sustentabilidade - GreenTech</ListGroup.Item>
            <ListGroup.Item>Estratégia de lançamento para novo produto - InnovaCorp</ListGroup.Item>
            <ListGroup.Item>Otimização de funil de vendas - E-commerce Solutions</ListGroup.Item>
          </StyledListGroup>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showFreelanceMarketplace} onHide={() => setShowFreelanceMarketplace(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Marketplace de Freelancers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Ofereça seus serviços ou encontre freelancers para seus projetos:</p>
          <StyledListGroup theme={theme}>
            <ListGroup.Item>Criação de conteúdo para redes sociais - R$ 2.000</ListGroup.Item>
            <ListGroup.Item>Planejamento de campanha de e-mail marketing - R$ 1.500</ListGroup.Item>
            <ListGroup.Item>Análise de métricas de marketing - R$ 200/hora</ListGroup.Item>
          </StyledListGroup>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showBlockchainReputation} onHide={() => setShowBlockchainReputation(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Reputação Blockchain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Sua reputação profissional validada por blockchain:</p>
          <StyledListGroup theme={theme}>
            <ListGroup.Item>Habilidades verificadas: Marketing Digital, SEO, Análise de Dados</ListGroup.Item>
            <ListGroup.Item>Projetos concluídos: 15</ListGroup.Item>
            <ListGroup.Item>Avaliação média: 4.8/5</ListGroup.Item>
            <ListGroup.Item>Recomendações: 12</ListGroup.Item>
          </StyledListGroup>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showCareerPrediction} onHide={() => setShowCareerPrediction(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Previsão de Carreira</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Tendências futuras para sua carreira:</p>
          <Line data={careerPredictionData} options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: '#ffffff' }
              },
              x: {
                ticks: { color: '#ffffff' }
              }
            },
            plugins: {
              legend: {
                labels: { color: '#ffffff' }
              }
            }
          }} />
          <p style={{color: '#ffffff', marginTop: '20px'}}>Baseado nas tendências atuais, sua área de atuação deve experimentar um crescimento significativo nos próximos 5 anos. Recomendamos focar em habilidades de marketing digital e análise de dados para maximizar suas oportunidades.</p>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showVirtualCoaching} onHide={() => setShowVirtualCoaching(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Coaching Virtual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Seu assistente virtual de carreira está pronto para ajudar:</p>
          <div style={{background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px'}}>
            <p style={{color: '#ffffff'}}>Olá João! Baseado na sua experiência e interesses, sugiro que você considere se especializar em marketing de conteúdo e estratégias de growth hacking. Isso complementaria bem suas habilidades atuais e abriria novas oportunidades de carreira. Que tal começarmos a traçar um plano de estudos?</p>
          </div>
          <StyledButton theme={theme} style={{marginTop: '20px'}}>Iniciar Sessão de Coaching</StyledButton>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showNetworking} onHide={() => setShowNetworking(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Networking Inteligente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Conecte-se com profissionais que compartilham seus interesses:</p>
          <StyledListGroup theme={theme}>
            <ListGroup.Item>
              <strong>Maria Silva</strong> - Gerente de Marketing na TechCorp
              <StyledButton theme={theme} size="sm" style={{float: 'right'}}>Conectar</StyledButton>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Carlos Oliveira</strong> - Especialista em SEO na DigitalBoost
              <StyledButton theme={theme} size="sm" style={{float: 'right'}}>Conectar</StyledButton>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Ana Santos</strong> - Analista de Mídias Sociais na SocialPro
              <StyledButton theme={theme} size="sm" style={{float: 'right'}}>Conectar</StyledButton>
            </ListGroup.Item>
          </StyledListGroup>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showGamification} onHide={() => setShowGamification(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Gamificação de Carreira</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Acompanhe seu progresso e ganhe recompensas:</p>
          <ProgressBar now={75} label={`Nível 7 - 750 XP`} style={{marginBottom: '20px'}} />
          <h5 style={{color: '#ffffff'}}>Conquistas Desbloqueadas:</h5>
          <StyledListGroup theme={theme}>
            <ListGroup.Item>
              <FontAwesomeIcon icon={faTrophy} style={{color: 'gold', marginRight: '10px'}} />
              Mestre do Marketing Digital
            </ListGroup.Item>
            <ListGroup.Item>
              <FontAwesomeIcon icon={faTrophy} style={{color: 'silver', marginRight: '10px'}} />
              Explorador de SEO
            </ListGroup.Item>
            <ListGroup.Item>
              <FontAwesomeIcon icon={faTrophy} style={{color: 'bronze', marginRight: '10px'}} />
              Iniciante em Analytics
            </ListGroup.Item>
          </StyledListGroup>
          <StyledButton theme={theme} style={{marginTop: '20px'}}>Ver Todas as Conquistas</StyledButton>
        </Modal.Body>
      </StyledModal>

      <StyledModal show={showVRPortfolio} onHide={() => setShowVRPortfolio(false)} centered theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#ffffff'}}>Portfólio em Realidade Virtual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: '#ffffff'}}>Crie e visualize seu portfólio em realidade virtual:</p>
          <div style={{width: '100%', height: '300px', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff'}}>
            [Simulação de visualização VR do Portfólio]
          </div>
          <StyledButton theme={theme} style={{marginTop: '20px'}}>Editar Portfólio VR</StyledButton>
        </Modal.Body>
      </StyledModal>
    </Layout>
  );
}

export default EmpregosPage;
