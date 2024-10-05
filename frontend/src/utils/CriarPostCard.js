export const handleEmojiSelect = (emoji, postText, setPostText) => {
    setPostText(postText + emoji.native);
  };
  