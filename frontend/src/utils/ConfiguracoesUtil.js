import { faUser, faLock, faBell, faGlobe, faPalette, faLanguage, faUniversalAccess, faShieldAlt, faUserSecret } from '@fortawesome/free-solid-svg-icons';

export const settingsSections = [
  {
    id: 'profile',
    title: 'Configurações de Perfil',
    icon: faUser,
    fields: [
      { type: 'text', label: 'Nome', placeholder: 'Seu nome' },
      { type: 'email', label: 'Email', placeholder: 'seu@email.com' },
      { type: 'textarea', label: 'Bio', placeholder: 'Fale sobre você' },
      { type: 'text', label: 'Localização', placeholder: 'Sua cidade' }
    ],
    buttonText: 'Salvar Alterações'
  },
  {
    id: 'security',
    title: 'Configurações de Segurança',
    icon: faLock,
    fields: [
      { type: 'password', label: 'Senha Atual', placeholder: 'Senha atual' },
      { type: 'password', label: 'Nova Senha', placeholder: 'Nova senha' },
      { type: 'password', label: 'Confirmar Nova Senha', placeholder: 'Confirmar nova senha' },
      { type: 'switch', label: 'Ativar autenticação de dois fatores' }
    ],
    buttonText: 'Atualizar Segurança'
  },
  {
    id: 'notifications',
    title: 'Configurações de Notificações',
    icon: faBell,
    fields: [
      { type: 'switch', label: 'Notificações por email' },
      { type: 'switch', label: 'Notificações push' },
      { type: 'switch', label: 'Notificações de mensagens' },
      { type: 'switch', label: 'Notificações de novos seguidores' }
    ],
    buttonText: 'Salvar Preferências'
  },
  {
    id: 'privacy',
    title: 'Configurações de Privacidade',
    icon: faUserSecret,
    fields: [
      { type: 'select', label: 'Quem pode ver meu perfil', options: ['Todos', 'Apenas amigos', 'Ninguém'] },
      { type: 'select', label: 'Quem pode me enviar mensagens', options: ['Todos', 'Apenas amigos', 'Ninguém'] },
      { type: 'switch', label: 'Tornar minha conta privada' },
      { type: 'switch', label: 'Permitir que me encontrem por email' }
    ],
    buttonText: 'Atualizar Privacidade'
  },
  {
    id: 'appearance',
    title: 'Aparência',
    icon: faPalette,
    fields: [
      { type: 'select', label: 'Tema', options: ['Claro', 'Escuro', 'Sistema'] },
      { type: 'select', label: 'Cor principal', options: ['Azul', 'Verde', 'Roxo', 'Vermelho'] },
      { type: 'switch', label: 'Ativar modo de alto contraste' }
    ],
    buttonText: 'Aplicar Mudanças'
  },
  {
    id: 'language',
    title: 'Idioma e Região',
    icon: faLanguage,
    fields: [
      { type: 'select', label: 'Idioma', options: ['Português', 'English', 'Español', '日本語'] },
      { type: 'select', label: 'Região', options: ['Brasil', 'Estados Unidos', 'Espanha', 'Japão'] },
      { type: 'select', label: 'Formato de data', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] }
    ],
    buttonText: 'Salvar Preferências'
  },
  {
    id: 'accessibility',
    title: 'Acessibilidade',
    icon: faUniversalAccess,
    fields: [
      { type: 'switch', label: 'Ativar leitor de tela' },
      { type: 'select', label: 'Tamanho da fonte', options: ['Pequeno', 'Médio', 'Grande', 'Extra grande'] },
      { type: 'switch', label: 'Ativar legendas automáticas' }
    ],
    buttonText: 'Atualizar Configurações'
  },
  {
    id: 'dataUsage',
    title: 'Uso de Dados',
    icon: faShieldAlt,
    fields: [
      { type: 'switch', label: 'Modo de economia de dados' },
      { type: 'switch', label: 'Reprodução automática de vídeos' },
      { type: 'select', label: 'Qualidade de imagem', options: ['Baixa', 'Média', 'Alta', 'Original'] }
    ],
    buttonText: 'Salvar Configurações'
  }
];
