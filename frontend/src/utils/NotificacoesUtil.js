export const fetchNotifications = () => {
  // Simulating API call to fetch notifications
  return [
    {
      id: 1,
      type: "like",
      user: "Alice Johnson",
      content: "liked your post",
      time: "2023-05-20T10:30:00",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      user: "Bob Smith",
      content: "commented on your photo",
      time: "2023-05-19T15:45:00",
      read: true,
    },
    {
      id: 3,
      type: "friend",
      user: "Carol Williams",
      content: "sent you a friend request",
      time: "2023-05-18T09:20:00",
      read: false,
    },
    {
      id: 4,
      type: "mention",
      user: "David Brown",
      content: "mentioned you in a comment",
      time: "2023-05-17T14:10:00",
      read: true,
    },
    {
      id: 5,
      type: "event",
      user: "Event Organizer",
      content: "invited you to an event",
      time: "2023-05-16T11:55:00",
      read: false,
    },
  ];
};
