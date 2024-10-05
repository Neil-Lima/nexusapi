export const simulatedNews = [
    {
      id: 1,
      title: "Nova tecnologia revoluciona indústria de smartphones",
      summary: "Uma inovação recente promete aumentar a duração da bateria em 300%, transformando a forma como usamos nossos dispositivos móveis.",
      image: "https://picsum.photos/800/400?random=1",
      category: "Tecnologia",
      date: "2023-06-15",
      views: 1500,
      author: "João Silva",
      comments: 45,
      shares: 120
    },
    {
      id: 2,
      title: "Descoberta arqueológica revela cidade perdida",
      summary: "Arqueólogos encontram ruínas de uma civilização antiga no deserto do Saara, lançando luz sobre uma cultura até então desconhecida.",
      image: "https://picsum.photos/800/400?random=2",
      category: "História",
      date: "2023-06-14",
      views: 2300,
      author: "Maria Santos",
      comments: 67,
      shares: 89
    },
    {
      id: 3,
      title: "Novo estudo liga dieta mediterrânea a longevidade",
      summary: "Pesquisadores confirmam benefícios da dieta para saúde e longevidade, sugerindo que pode adicionar até 10 anos à expectativa de vida.",
      image: "https://picsum.photos/800/400?random=3",
      category: "Saúde",
      date: "2023-06-13",
      views: 1800,
      author: "Carlos Oliveira",
      comments: 34,
      shares: 56
    },
    {
      id: 4,
      title: "Empresa de carros elétricos anuncia modelo revolucionário",
      summary: "Novo veículo promete autonomia de 1000 km com uma única carga, desafiando os limites da tecnologia de baterias atual.",
      image: "https://picsum.photos/800/400?random=4",
      category: "Tecnologia",
      date: "2023-06-12",
      views: 3500,
      author: "Ana Rodrigues",
      comments: 89,
      shares: 145
    },
    {
      id: 5,
      title: "Cientistas descobrem novo planeta potencialmente habitável",
      summary: "Exoplaneta a 40 anos-luz da Terra apresenta condições similares ao nosso planeta, aumentando as esperanças de vida extraterrestre.",
      image: "https://picsum.photos/800/400?random=5",
      category: "Ciência",
      date: "2023-06-11",
      views: 4200,
      author: "Pedro Almeida",
      comments: 112,
      shares: 201
    },
    {
      id: 6,
      title: "Nova lei de proteção ambiental é aprovada",
      summary: "Legislação visa reduzir emissões de carbono em 50% até 2030, estabelecendo metas ambiciosas para combater as mudanças climáticas.",
      image: "https://picsum.photos/800/400?random=6",
      category: "Política",
      date: "2023-06-10",
      views: 1200,
      author: "Luísa Ferreira",
      comments: 56,
      shares: 78
    },
    {
      id: 7,
      title: "Artista usa IA para criar obras de arte surpreendentes",
      summary: "Exposição com pinturas geradas por inteligência artificial causa polêmica no mundo da arte, questionando o papel da criatividade humana.",
      image: "https://picsum.photos/800/400?random=7",
      category: "Arte",
      date: "2023-06-09",
      views: 2800,
      author: "Rafael Costa",
      comments: 78,
      shares: 134
    },
    {
      id: 8,
      title: "Novo tratamento promete cura para diabetes tipo 1",
      summary: "Terapia celular mostra resultados promissores em testes clínicos, oferecendo esperança para milhões de pessoas afetadas pela doença.",
      image: "https://picsum.photos/800/400?random=8",
      category: "Saúde",
      date: "2023-06-08",
      views: 3100,
      author: "Camila Sousa",
      comments: 91,
      shares: 167
    },
    {
      id: 9,
      title: "Startup desenvolve tecnologia de teletransporte quântico",
      summary: "Cientistas afirmam ter realizado o primeiro teletransporte quântico bem-sucedido de partículas em escala macroscópica.",
      image: "https://picsum.photos/800/400?random=9",
      category: "Tecnologia",
      date: "2023-06-07",
      views: 5600,
      author: "Fernando Gomes",
      comments: 203,
      shares: 456
    }
  ];
  
  export const simulateApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(simulatedNews);
      }, 500);
    });
  };
  