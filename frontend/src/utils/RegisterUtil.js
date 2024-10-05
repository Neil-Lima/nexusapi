export const generateYears = () => {
    return Array.from({ length: 2023 - 1990 + 1 }, (_, index) => 1990 + index);
  };
  
  export const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  export const generateDays = () => {
    return Array.from({ length: 31 }, (_, index) => index + 1);
  };
  