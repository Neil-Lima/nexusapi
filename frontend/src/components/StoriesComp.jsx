import React from 'react';
import { StoryContainer } from './StoriesStyle';
import { stories, renderStory } from './StoriesUtil';

function StoriesComp() {
  return (
    <div className="widget box">
      <div className="widget-header">
        <h4>Stories</h4>
      </div>
      <div className="widget-content-area">
        <StoryContainer>
          {stories.map((story, index) => renderStory(story, index))}
        </StoryContainer>
      </div>
    </div>
  );
}

export default StoriesComp;
