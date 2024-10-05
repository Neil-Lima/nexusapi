export const initialState = {
    pageName: '',
    pageCategory: '',
    coverPhoto: null,
    profilePhoto: null,
    about: '',
    location: '',
    phone: '',
    email: '',
    website: '',
    tags: ''
  };
  
  export const handleInputChange = (event, field, setState) => {
    const value = event.target.value;
    setState(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  
  export const handlePhotoUpload = (event, photoType, setState) => {
    const file = event.target.files[0];
    setState(prevState => ({
      ...prevState,
      [photoType]: URL.createObjectURL(file)
    }));
  };
  
  export const handleSubmit = (event, state) => {
    event.preventDefault();
    // Implementar lógica para salvar os dados da página
    console.log('Página criada:', state);
  };
  