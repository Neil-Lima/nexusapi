export const stories = [
    { type: 'create', name: 'Create Story', image: 'https://path-to-your-image/create-story.jpg' },
    { name: 'John Doe', image: 'https://picsum.photos/200/300?random=1' },
    { name: 'Jane Smith', image: 'https://picsum.photos/200/300?random=2' },
    { name: 'Mike Johnson', image: 'https://picsum.photos/200/300?random=3' },
    { name: 'Emily Brown', image: 'https://picsum.photos/200/300?random=4' },
  ];
  
  export const renderStory = (story, index) => {
    if (story.type === 'create') {
      return (
        <SingleCreateStory key={index}>
          <img className="single-create-story-bg" src={story.image} alt="Create Story" />
          <CreateStoryAuthor>
            <p>{story.name}</p>
          </CreateStoryAuthor>
        </SingleCreateStory>
      );
    } else {
      return (
        <SingleStory key={index}>
          <img className="single-story-bg" src={story.image} alt={story.name} />
          <StoryAuthor>
            <img src={story.image} alt={story.name} />
            <p>{story.name}</p>
          </StoryAuthor>
        </SingleStory>
      );
    }
  };
  