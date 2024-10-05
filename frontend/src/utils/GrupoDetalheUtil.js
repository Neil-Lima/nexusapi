export const handleInvite = (event) => {
    event.preventDefault();
    // Lógica para enviar convite
    console.log('Convite enviado');
  };
  
  export const handleLike = (postId) => {
    // Lógica para dar like no post
    console.log(`Like no post ${postId}`);
  };
  
  export const handleComment = (postId, comment) => {
    // Lógica para adicionar comentário
    console.log(`Comentário "${comment}" adicionado ao post ${postId}`);
  };
  
  export const handleShare = (postId) => {
    // Lógica para compartilhar post
    console.log(`Post ${postId} compartilhado`);
  };
  
  export const handlePollVote = (postId, optionId) => {
    // Lógica para votar na enquete
    console.log(`Voto na opção ${optionId} da enquete do post ${postId}`);
  };
  
  export const group = {
    id: 1,
    name: 'Amantes de Anime',
    description: 'Grupo para discutir e compartilhar sobre anime e mangá',
    members: 1500,
    coverImage: 'https://picsum.photos/1200/400?random=1',
    privacy: 'Público',
    category: 'Entretenimento',
    createdAt: '2022-01-15',
    admins: [
      { id: 1, name: 'Naruto Uzumaki', avatar: 'https://picsum.photos/50/50?random=1' },
      { id: 2, name: 'Sasuke Uchiha', avatar: 'https://picsum.photos/50/50?random=2' }
    ],
    moderators: [
      { id: 3, name: 'Sakura Haruno', avatar: 'https://picsum.photos/50/50?random=3' },
      { id: 4, name: 'Kakashi Hatake', avatar: 'https://picsum.photos/50/50?random=4' }
    ],
    members: [
      { id: 5, name: 'Hinata Hyuga', avatar: 'https://picsum.photos/50/50?random=5' },
      { id: 6, name: 'Shikamaru Nara', avatar: 'https://picsum.photos/50/50?random=6' },
      { id: 7, name: 'Ino Yamanaka', avatar: 'https://picsum.photos/50/50?random=7' },
      { id: 8, name: 'Gaara', avatar: 'https://picsum.photos/50/50?random=8' },
      { id: 9, name: 'Rock Lee', avatar: 'https://picsum.photos/50/50?random=9' },
      { id: 10, name: 'Tenten', avatar: 'https://picsum.photos/50/50?random=10' },
    ],
    posts: [
      {
        id: 1,
        author: { id: 1, name: 'Naruto Uzumaki', avatar: 'https://picsum.photos/50/50?random=1' },
        content: 'Qual é o seu anime favorito desta temporada? Estou adorando Jujutsu Kaisen!',
        image: 'https://picsum.photos/600/400?random=5',
        likes: 145,
        comments: [
          { id: 1, author: { id: 5, name: 'Hinata Hyuga', avatar: 'https://picsum.photos/50/50?random=5' }, content: 'Também estou amando Jujutsu Kaisen! A animação está incrível!' },
          { id: 2, author: { id: 6, name: 'Shikamaru Nara', avatar: 'https://picsum.photos/50/50?random=6' }, content: 'Prefiro algo mais estratégico como Death Note.' },
          { id: 3, author: { id: 7, name: 'Ino Yamanaka', avatar: 'https://picsum.photos/50/50?random=7' }, content: 'Estou assistindo My Hero Academia e está muito bom!' }
        ],
        shares: 25,
        createdAt: '2023-06-10T14:30:00Z'
      },
      {
        id: 2,
        author: { id: 2, name: 'Sasuke Uchiha', avatar: 'https://picsum.photos/50/50?random=2' },
        content: 'Alguém aqui já assistiu todos os filmes do Studio Ghibli? Qual é o seu favorito?',
        poll: {
          question: 'Qual é o seu filme favorito do Studio Ghibli?',
          options: [
            { id: 1, text: 'A Viagem de Chihiro', votes: 42 },
            { id: 1, text: 'A Viagem de Chihiro', votes: 42 },
            { id: 2, text: 'Meu Amigo Totoro', votes: 38 },
            { id: 3, text: 'Princesa Mononoke', votes: 35 },
            { id: 4, text: 'O Castelo Animado', votes: 40 }
          ],
          totalVotes: 155
        },
        likes: 98,
        comments: [
          { id: 4, author: { id: 8, name: 'Gaara', avatar: 'https://picsum.photos/50/50?random=8' }, content: 'Meu favorito é Princesa Mononoke, a temática ambiental é muito bem trabalhada.' },
          { id: 5, author: { id: 9, name: 'Rock Lee', avatar: 'https://picsum.photos/50/50?random=9' }, content: 'Difícil escolher apenas um, mas acho que vou de A Viagem de Chihiro!' }
        ],
        shares: 15,
        createdAt: '2023-06-09T10:15:00Z'
      },
      // Additional posts can be added here
    ],
    events: [
      { id: 1, name: 'Maratona de Anime', date: '2023-07-15', time: '14:00', location: 'Online', description: 'Vamos assistir juntos os melhores episódios de diversos animes!', attendees: 120 },
      { id: 2, name: 'Cosplay Contest', date: '2023-08-01', time: '10:00', location: 'Centro de Convenções', description: 'Mostre seu melhor cosplay e concorra a prêmios incríveis!', attendees: 250 },
      { id: 3, name: 'Debate: O Impacto do Anime na Cultura Pop', date: '2023-07-22', time: '19:00', location: 'Auditório da Universidade', description: 'Venha discutir como o anime tem influenciado a cultura global nas últimas décadas.', attendees: 80 }
    ],
    discussions: [
      { id: 1, title: 'Teorias sobre o final de Attack on Titan', author: { id: 11, name: 'Eren Yeager', avatar: 'https://picsum.photos/50/50?random=11' }, replies: 78, lastReply: '2023-06-10T08:30:00Z' },
      { id: 2, title: 'Ranking dos melhores vilões de anime', author: { id: 12, name: 'Light Yagami', avatar: 'https://picsum.photos/50/50?random=12' }, replies: 56, lastReply: '2023-06-09T22:15:00Z' },
      { id: 3, title: 'Adaptações de mangá para anime: expectativas vs. realidade', author: { id: 13, name: 'Gon Freecss', avatar: 'https://picsum.photos/50/50?random=13' }, replies: 42, lastReply: '2023-06-08T14:45:00Z' }
    ],
    media: [
      { id: 1, type: 'image', url: 'https://picsum.photos/300/300?random=1', description: 'Cosplay grupal de Naruto' },
      { id: 2, type: 'image', url: 'https://picsum.photos/300/300?random=2', description: 'Fan art de My Hero Academia' },
      { id: 3, type: 'image', url: 'https://picsum.photos/300/300?random=3', description: 'Coleção de mangás' },
      { id: 4, type: 'image', url: 'https://picsum.photos/300/300?random=4', description: 'Poster do último filme de anime' },
      { id: 5, type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'AMV de Demon Slayer' },
      { id: 6, type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Trailer da nova temporada de One Piece' }
    ]
  };
  
  