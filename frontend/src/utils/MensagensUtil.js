import { format } from 'date-fns';

export const groupMessagesByDate = (messages) => {
  const groups = {};
  messages.forEach(message => {
    const date = format(new Date(message.time), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  return groups;
};

export const fetchContacts = () => {
  // Simulating API call to fetch contacts
  return [
    { id: 1, name: 'Alice Johnson', avatar: 'https://picsum.photos/50/50?random=1', lastMessage: 'Hey, how are you?', time: '10:30 AM', online: true, archived: false },
    { id: 2, name: 'Bob Smith', avatar: 'https://picsum.photos/50/50?random=2', lastMessage: 'Can we meet tomorrow?', time: 'Yesterday', online: false, archived: false },
    { id: 3, name: 'Carol Williams', avatar: 'https://picsum.photos/50/50?random=3', lastMessage: 'Thanks for your help!', time: 'Monday', online: true, archived: true },
  ];
};

export const fetchMessages = () => {
  // Simulating API call to fetch messages for the active contact
  return [
    { id: 1, text: 'Hey there!', sent: false, time: '2023-05-20T10:30:00' },
    { id: 2, text: 'Hi! How are you?', sent: true, time: '2023-05-20T10:31:00' },
    { id: 3, text: 'I\'m doing great, thanks for asking. How about you?', sent: false, time: '2023-05-20T10:32:00' },
    { id: 4, text: 'I\'m good too. Just working on some new designs.', sent: true, time: '2023-05-20T10:33:00' },
    { id: 5, text: 'That sounds interesting! Can\'t wait to see them.', sent: false, time: '2023-05-20T10:34:00' },
  ];
};
