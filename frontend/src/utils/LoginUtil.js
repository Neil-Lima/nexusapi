export const handleModalClose = (setShowModal) => {
  setShowModal(false);
};

export const handleModalShow = (setShowModal) => {
  setShowModal(true);
};

export const handleLogin = (event) => {
  event.preventDefault();
  // Implementar lógica de login aqui
  console.log('Login submetido');
};

export const handleSignup = (event) => {
  event.preventDefault();
  // Implementar lógica de cadastro aqui
  console.log('Cadastro submetido');
};

export const anos = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);
export const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
export const dias = Array.from({length: 31}, (_, i) => i + 1);
