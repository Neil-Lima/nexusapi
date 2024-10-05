export const fetchVideoData = () => {
    return {
      id: 'dQw4w9WgXcQ',
      title: 'Vídeo Incrível: Explorando as Maravilhas do Mundo',
      description: 'Neste vídeo fascinante, embarcamos em uma jornada visual pelas maravilhas mais impressionantes do nosso planeta. De paisagens deslumbrantes a fenômenos naturais únicos, prepare-se para uma experiência que vai expandir seus horizontes.',
      views: 1000000,
      likes: 50000,
      uploadDate: '15 de junho de 2023',
      creator: {
        name: 'Explorador Global',
        subscribers: 500000
      }
    };
  };
  
  export const fetchComments = () => {
    return [
      {
        id: 1,
        user: 'Ana Silva',
        avatar: 'https://i.pravatar.cc/150?img=1',
        text: 'Que vídeo incrível! As imagens são de tirar o fôlego. Mal posso esperar para visitar alguns desses lugares pessoalmente.',
        date: '16 de junho de 2023'
      },
      {
        id: 2,
        user: 'Carlos Oliveira',
        avatar: 'https://i.pravatar.cc/150?img=2',
        text: 'A qualidade da produção é excepcional. Adorei a forma como cada local foi apresentado, com informações interessantes e curiosidades. Parabéns pelo trabalho!',
        date: '17 de junho de 2023'
      },
      {
        id: 3,
        user: 'Mariana Costa',
        avatar: 'https://i.pravatar.cc/150?img=3',
        text: 'Este vídeo me inspirou a planejar minha próxima viagem. Obrigada por compartilhar essas maravilhas conosco e por nos lembrar o quão belo é o nosso planeta.',
        date: '18 de junho de 2023'
      }
    ];
  };
  
  export const fetchRelatedVideos = () => {
    return [
      {
        id: 'abc123',
        title: 'As 10 Praias Mais Paradisíacas do Mundo',
        thumbnail: 'https://picsum.photos/120/68?random=1',
        uploadDate: '10 de junho de 2023',
        duration: '12:34'
      },
      {
        id: 'def456',
        title: 'Explorando as Antigas Ruínas Maias',
        thumbnail: 'https://picsum.photos/120/68?random=2',
        uploadDate: '5 de junho de 2023',
        duration: '18:45'
      },
      {
        id: 'ghi789',
        title: 'Safari Fotográfico: Os Animais Mais Raros da África',
        thumbnail: 'https://picsum.photos/120/68?random=3',
        uploadDate: '1 de junho de 2023',
        duration: '22:17'
      },
      {
        id: 'jkl012',
        title: 'As Auroras Boreais da Islândia',
        thumbnail: 'https://picsum.photos/120/68?random=4',
        uploadDate: '28 de maio de 2023',
        duration: '15:30'
      },
      {
        id: 'mno345',
        title: 'Mergulho na Grande Barreira de Coral',
        thumbnail: 'https://picsum.photos/120/68?random=5',
        uploadDate: '22 de maio de 2023',
        duration: '20:05'
      },
      {
        id: 'pqr678',
        title: 'Trekking no Himalaia: Desafiando os Limites',
        thumbnail: 'https://picsum.photos/120/68?random=6',
        uploadDate: '15 de maio de 2023',
        duration: '25:50'
      },
      {
        id: 'stu901',
        title: 'As Cataratas Mais Impressionantes do Planeta',
        thumbnail: 'https://picsum.photos/120/68?random=7',
        uploadDate: '10 de maio de 2023',
        duration: '16:40'
      },
      {
        id: 'vwx234',
        title: 'Gastronomia Mundial: Sabores Únicos',
        thumbnail: 'https://picsum.photos/120/68?random=8',
        uploadDate: '5 de maio de 2023',
        duration: '19:22'
      },
      {
        id: 'yz0567',
        title: 'As Cidades Mais Futuristas do Mundo',
        thumbnail: 'https://picsum.photos/120/68?random=9',
        uploadDate: '1 de maio de 2023',
        duration: '21:15'
      },
      {
        id: 'abc890',
        title: 'Aventuras na Amazônia: A Floresta Misteriosa',
        thumbnail: 'https://picsum.photos/120/68?random=10',
        uploadDate: '25 de abril de 2023',
        duration: '23:30'
      }
    ];
  };
  