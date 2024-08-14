import React from 'react';
import { StoryContainer, SingleCreateStory, SingleStory, StoryAuthor, CreateStoryAuthor } from '../styles/StoriesStyle';

function StoriesComp() {
  const stories = [
    { type: 'create', name: 'Create Story', image: 'https://path-to-your-image/create-story.jpg' },
    { name: 'John Doe', image: 'https://picsum.photos/200/300?random=1' },
    { name: 'Jane Smith', image: 'https://picsum.photos/200/300?random=2' },
    { name: 'Mike Johnson', image: 'https://picsum.photos/200/300?random=3' },
    { name: 'Emily Brown', image: 'https://picsum.photos/200/300?random=4' },
  ];

  return (
    <div className="widget box">
      <div className="widget-header">
        <h4>Stories</h4>
      </div>
      <div className="widget-content-area">
        <StoryContainer>
          {stories.map((story, index) => (
            story.type === 'create' ? (
              <SingleCreateStory key={index}>
                <img className="single-create-story-bg" src={story.image} alt="Create Story" />
                <CreateStoryAuthor>
                  <p>{story.name}</p>
                </CreateStoryAuthor>
              </SingleCreateStory>
            ) : (
              <SingleStory key={index}>
                <img className="single-story-bg" src={story.image} alt={story.name} />
                <StoryAuthor>
                  <img src={story.image} alt={story.name} />
                  <p>{story.name}</p>
                </StoryAuthor>
              </SingleStory>
            )
          ))}
        </StoryContainer>
      </div>
    </div>
  );
}

export default StoriesComp;
