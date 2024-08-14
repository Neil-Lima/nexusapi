import styled from 'styled-components';

export const StoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const SingleCreateStory = styled.div`
  height: 175px;
  width: 110px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
  background: #e4e4e4;
  text-align: center;

  img.single-create-story-bg {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }
`;

export const SingleStory = styled.div`
  height: 175px;
  width: 110px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-image: linear-gradient(rgba(255, 0, 0, 0), black);
  }

  img.single-story-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StoryAuthor = styled.div`
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  right: 0px;
  text-align: center;
  z-index: 99;
  cursor: pointer;

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 1px solid white;
    padding: 4px;
  }

  p {
    color: #fff;
    width: 100%;
    margin: 5px 0px 0px 0px;
    font-weight: 600;
    font-size: 12px;
  }
`;

export const CreateStoryAuthor = styled.div`
  p {
    margin: 0px;
    font-size: 13px;
    font-weight: 500;
  }
`;
