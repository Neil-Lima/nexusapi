import React, { useState } from 'react';
import { Card, Image, Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { CartaoEstilizado, ImagemPost, BotaoAcao, ContagemCurtidas, SecaoComentarios, EntradaComentario, ItemComentario, ImagemPerfilComentario, BotaoMostrarMais } from '../styles/CardPostStyle';
import { formatarContagemCurtidas, obterTempoDecorrido } from '../utils/CardPostUtil';

function CardPostComp({ post, theme }) {
  const [curtido, setCurtido] = useState(false);
  const [contagemCurtidas, setContagemCurtidas] = useState(post.curtidas);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [novoComentario, setNovoComentario] = useState('');
  const [comentariosVisiveis, setComentariosVisiveis] = useState(2);
  const [mostrarModalComentarios, setMostrarModalComentarios] = useState(false);

  const lidarComCurtida = () => {
    if (curtido) {
      setContagemCurtidas(contagemCurtidas - 1);
    } else {
      setContagemCurtidas(contagemCurtidas + 1);
    }
    setCurtido(!curtido);
  };

  const lidarComAdicionarComentario = (e) => {
    e.preventDefault();
    if (novoComentario.trim() !== '') {
      if (!Array.isArray(post.comentarios)) {
        post.comentarios = [];
      }
      post.comentarios.push({
        autor: 'Usuário Atual',
        imagemPerfil: 'https://example.com/usuario-atual.jpg',
        conteudo: novoComentario,
        timestamp: new Date(),
        curtidas: 0,
        comentarios: []
      });
      setNovoComentario('');
    }
  };

  const mostrarMaisComentarios = () => {
    if (post.comentarios.length > 10) {
      setMostrarModalComentarios(true);
    } else {
      setComentariosVisiveis(comentariosVisiveis + 2);
    }
  };

  const renderizarComentario = (comentario, index) => (
    <ItemComentario key={index}>
      <div className="d-flex align-items-center">
        <ImagemPerfilComentario src={comentario.imagemPerfil} alt={comentario.autor} />
        <div>
          <strong>{comentario.autor}</strong>: {comentario.conteudo}
          <small className="text-muted d-block">{obterTempoDecorrido(comentario.timestamp)}</small>
        </div>
      </div>
      <div className="mt-2">
        <BotaoAcao onClick={() => {}/* Implementar curtida de comentário */} theme={theme}>
          <FontAwesomeIcon icon={faHeart} /> {formatarContagemCurtidas(comentario.curtidas)}
        </BotaoAcao>
        <BotaoAcao onClick={() => {}/* Implementar resposta ao comentário */} theme={theme}>
          <FontAwesomeIcon icon={faComment} /> {comentario.comentarios.length}
        </BotaoAcao>
      </div>
    </ItemComentario>
  );

  return (
    <CartaoEstilizado>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <Image src={post.imagemAutor} roundedCircle style={{width: '50px', height: '50px', marginRight: '10px'}} />
          <div>
            <h6 className="mb-0">{post.autor}</h6>
            <small>{obterTempoDecorrido(post.timestamp)}</small>
          </div>
        </div>
        <Card.Text>{post.conteudo}</Card.Text>
        {post.imagem && <ImagemPost src={post.imagem} alt="Post" />}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <BotaoAcao onClick={lidarComCurtida} $ativo={curtido} theme={theme}>
            <FontAwesomeIcon icon={faHeart} /> <ContagemCurtidas>{formatarContagemCurtidas(contagemCurtidas)}</ContagemCurtidas>
          </BotaoAcao>
          <BotaoAcao onClick={() => setMostrarComentarios(!mostrarComentarios)} theme={theme}>
            <FontAwesomeIcon icon={faComment} /> {Array.isArray(post.comentarios) ? post.comentarios.length : 0}
          </BotaoAcao>
          <BotaoAcao theme={theme}>
            <FontAwesomeIcon icon={faShare} /> Compartilhar
          </BotaoAcao>
        </div>
        {mostrarComentarios && (
          <SecaoComentarios>
            {Array.isArray(post.comentarios) && post.comentarios.slice(0, comentariosVisiveis).map(renderizarComentario)}
            {Array.isArray(post.comentarios) && post.comentarios.length > comentariosVisiveis && (
              <BotaoMostrarMais onClick={mostrarMaisComentarios}>
                Mostrar mais comentários
              </BotaoMostrarMais>
            )}
            <Form onSubmit={lidarComAdicionarComentario}>
              <EntradaComentario
                type="text"
                placeholder="Adicione um comentário..."
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
              />
              <Button type="submit" variant="primary" size="sm" className="mt-2">Comentar</Button>
            </Form>
          </SecaoComentarios>
        )}
      </Card.Body>
      <Modal show={mostrarModalComentarios} onHide={() => setMostrarModalComentarios(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Todos os comentários</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Array.isArray(post.comentarios) && post.comentarios.map(renderizarComentario)}
        </Modal.Body>
      </Modal>
    </CartaoEstilizado>
  );
}

export default CardPostComp;
