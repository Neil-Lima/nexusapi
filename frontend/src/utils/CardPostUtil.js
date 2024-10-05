export const formatarContagemCurtidas = (contagem) => {
  if (contagem >= 1000000) {
    return (contagem / 1000000).toFixed(1) + 'M';
  } else if (contagem >= 1000) {
    return (contagem / 1000).toFixed(1) + 'K';
  }
  return contagem;
};

export const obterTempoDecorrido = (timestamp) => {
  const agora = new Date();
  const tempoPost = new Date(timestamp);
  const diferenca = agora - tempoPost;
  const minutos = Math.floor(diferenca / 60000);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (dias > 0) return `${dias}d atrás`;
  if (horas > 0) return `${horas}h atrás`;
  if (minutos > 0) return `${minutos}m atrás`;
  return 'Agora mesmo';
};

export const postsExemplo = [
  {
    id: 1,
    autor: 'Naruto Uzumaki',
    imagemAutor: 'https://example.com/naruto.jpg',
    conteudo: 'Acredite! O caminho para se tornar Hokage é longo, mas eu nunca desisto!',
    imagem: 'https://example.com/konoha.jpg',
    curtidas: 15000,
    comentarios: [
      {
        autor: 'Sasuke Uchiha',
        imagemPerfil: 'https://example.com/sasuke.jpg',
        conteudo: 'Hmpf, continua sonhando, perdedor.',
        timestamp: new Date(2023, 5, 10, 14, 30),
        curtidas: 500,
        comentarios: []
      },
      {
        autor: 'Sakura Haruno',
        imagemPerfil: 'https://example.com/sakura.jpg',
        conteudo: 'Você consegue, Naruto!',
        timestamp: new Date(2023, 5, 10, 15, 0),
        curtidas: 300,
        comentarios: []
      }
    ],
    timestamp: new Date(2023, 5, 10, 12, 0)
  },
  {
    id: 2,
    autor: 'Kakashi Hatake',
    imagemAutor: 'https://example.com/kakashi.jpg',
    conteudo: 'Lembrem-se, aqueles que quebram as regras são lixo, mas aqueles que abandonam seus amigos são piores que lixo.',
    imagem: 'https://example.com/team7.jpg',
    curtidas: 8500,
    comentarios: [
      {
        autor: 'Might Guy',
        imagemPerfil: 'https://example.com/guy.jpg',
        conteudo: 'Isso é o poder da juventude!',
        timestamp: new Date(2023, 5, 11, 9, 15),
        curtidas: 250,
        comentarios: []
      }
    ],
    timestamp: new Date(2023, 5, 11, 8, 0)
  },
  {
    id: 3,
    autor: 'Itachi Uchiha',
    imagemAutor: 'https://example.com/itachi.jpg',
    conteudo: 'O verdadeiro poder não está nos olhos, mas no coração.',
    imagem: 'https://example.com/sharingan.jpg',
    curtidas: 20000,
    comentarios: [
      {
        autor: 'Kisame Hoshigaki',
        imagemPerfil: 'https://example.com/kisame.jpg',
        conteudo: 'Profundo como sempre, Itachi.',
        timestamp: new Date(2023, 5, 12, 11, 45),
        curtidas: 800,
        comentarios: []
      },
      {
        autor: 'Sasuke Uchiha',
        imagemPerfil: 'https://example.com/sasuke.jpg',
        conteudo: '...',
        timestamp: new Date(2023, 5, 12, 12, 30),
        curtidas: 1500,
        comentarios: []
      }
    ],
    timestamp: new Date(2023, 5, 12, 10, 0)
  }
];

