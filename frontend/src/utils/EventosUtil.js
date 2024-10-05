export const handleCreateEvent = (event, newEvent, events, setEvents, setShowModal, setNewEvent) => {
    event.preventDefault();
    const newEventWithId = { 
      ...newEvent, 
      id: events.length + 1,
      image: newEvent.image ? URL.createObjectURL(newEvent.image) : null,
      attendees: 0,
      likes: 0,
      comments: 0,
      shares: 0
    };
    setEvents([...events, newEventWithId]);
    setShowModal(false);
    setNewEvent(initialNewEvent);
  };
  
  export const handleInputChange = (e, setNewEvent) => {
    const { name, value } = e.target;
    setNewEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };
  
  export const handleDateChange = (date, setNewEvent) => {
    setNewEvent(prevEvent => ({ ...prevEvent, date }));
  };
  
  export const handleImageUpload = (e, setNewEvent) => {
    const file = e.target.files[0];
    setNewEvent(prevEvent => ({ ...prevEvent, image: file }));
  };
  
  export const toggleSidebar = (setShowSidebar) => setShowSidebar(prev => !prev);
  
  export const initialEvents = [
    {
      id: 1,
      title: 'Festival de Música',
      date: '2023-07-15',
      time: '18:00',
      location: 'Parque Central',
      attendees: 500,
      likes: 250,
      comments: 45,
      shares: 30,
      image: 'https://picsum.photos/800/400?random=1'
    },
    {
      id: 2,
      title: 'Exposição de Arte',
      date: '2023-07-22',
      time: '10:00',
      location: 'Galeria Municipal',
      attendees: 200,
      likes: 180,
      comments: 35,
      shares: 25,
      image: 'https://picsum.photos/800/400?random=2'
    },
    {
      id: 3,
      title: 'Maratona da Cidade',
      date: '2023-08-05',
      time: '07:00',
      location: 'Centro da Cidade',
      attendees: 1000,
      likes: 450,
      comments: 80,
      shares: 60,
      image: 'https://picsum.photos/800/400?random=3'
    }
  ];
  
  export const initialNewEvent = {
    title: '',
    date: new Date(),
    time: '',
    location: '',
    description: '',
    image: null
  };
  