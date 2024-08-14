import React, { useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { StyledCard, PostImage, ActionButton, LikeCount, CommentSection, CommentInput } from '../styles/CardPostStyle';

function CardPostComp({ post }) {
  const { theme } = useTheme();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      // Adicionar novo comentário à lista de comentários
      setNewComment('');
    }
  };

  return (
    <StyledCard>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <Image src={post.authorImage} roundedCircle style={{ width: '50px', height: '50px', marginRight: '15px' }} />
          <div>
            <h6 className="mb-0">{post.author}</h6>
            <small className="text-muted">{post.timestamp}</small>
          </div>
        </div>
        <Card.Text>{post.content}</Card.Text>
        {post.image && <PostImage src={post.image} alt="Post" />}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <ActionButton onClick={handleLike} active={liked} theme={theme}>
            <FontAwesomeIcon icon={faHeart} /> <LikeCount>{likeCount}</LikeCount>
          </ActionButton>
          <ActionButton onClick={() => setShowComments(!showComments)} theme={theme}>
            <FontAwesomeIcon icon={faComment} /> {post.comments.length}
          </ActionButton>
          <ActionButton theme={theme}>
            <FontAwesomeIcon icon={faShare} /> Share
          </ActionButton>
        </div>
        {showComments && (
          <CommentSection>
            {post.comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <strong>{comment.author}</strong>: {comment.content}
              </div>
            ))}
            <form onSubmit={handleAddComment}>
              <CommentInput
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </form>
          </CommentSection>
        )}
      </Card.Body>
    </StyledCard>
  );
}

export default CardPostComp;
