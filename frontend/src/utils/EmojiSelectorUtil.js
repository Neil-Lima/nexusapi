export const initializePicker = (ref, onEmojiSelect, Emoji3D) => {
    import('emoji-mart').then(({ Picker }) => {
      new Picker({
        data: async () => {
          const response = await fetch(
            'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
          );
          return response.json();
        },
        onEmojiSelect,
        ref,
        emojiButtonComponent: ({ emoji, emojiProps }) => (
          <Emoji3D {...emojiProps}>{emoji.native}</Emoji3D>
        ),
      });
    });
  };
  