export const handleSearch = (event, jobs, searchTerm, setFilteredJobs, setCurrentPage) => {
    event.preventDefault();
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.industry.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };
  
  export const handleFilterChange = (event, setFilters) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
  
  export const handleIndustryFilter = (industry, setFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      industry: prevFilters.industry.includes(industry)
        ? prevFilters.industry.filter(ind => ind !== industry)
        : [...prevFilters.industry, industry]
    }));
  };
  
  export const applyFilters = (jobs, filters, setFilteredJobs, setCurrentPage) => {
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
  
  export const handleJobClick = (job, setSelectedJob, setShowModal, setSkillMatchPercentage) => {
    setSelectedJob(job);
    setShowModal(true);
    setSkillMatchPercentage(Math.floor(Math.random() * 100));
  };
  
  export const handleApplyJob = (jobId, setAppliedJobs, setShowModal) => {
    setAppliedJobs(prevAppliedJobs => [...prevAppliedJobs, jobId]);
    setShowModal(false);
  };
  
  export const handleSaveJob = (jobId, setSavedJobs) => {
    setSavedJobs(prevSavedJobs => [...prevSavedJobs, jobId]);
  };
  
  export const handleShareJob = (job) => {
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
  
  export const handleNewJobChange = (event, setNewJob) => {
    const { name, value } = event.target;
    setNewJob(prevJob => ({
      ...prevJob,
      [name]: value
    }));
  };
  
  export const handleLocationChange = (event, setNewJob) => {
    const { name, value } = event.target;
    setNewJob(prevJob => ({
      ...prevJob,
      location: {
        ...prevJob.location,
        [name]: value
      }
    }));
  };
  
  export const handlePostJob = (event, newJob, jobs, setJobs, setFilteredJobs, setShowPostJobModal, setNewJob) => {
    event.preventDefault();
    const newJobWithId = {
      ...newJob,
      id: jobs.length + 1,
    };
    setJobs([...jobs, newJobWithId]);
    setFilteredJobs([...jobs, newJobWithId]);
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
  
  export const mockJobs = [
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
  
  export const careerPredictionData = {
    labels: ['2023', '2024', '2025', '2026', '2027'],
    datasets: [
      {
        label: 'Demanda de Mercado',
        data: [65, 70, 80, 85, 90],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  