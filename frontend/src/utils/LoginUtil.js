import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import api, { getCsrfToken } from "../api/api";
import * as Yup from "yup";

const login = async (credentials) => {
  await getCsrfToken();
  const response = await api.post("/login", credentials);
  return response.data;
};

const register = async (userData) => {
  await getCsrfToken();
  const response = await api.post("/register", userData);
  return response.data;
};

export const useLoginForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultModalContent, setResultModalContent] = useState({
    title: "",
    message: "",
    isSuccess: true,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/home");
    },
    onError: (error) => {
      console.error("Erro no login:", error);
      setError("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
    },
  });

  const registerMutation = useMutation(register, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/home");
    },
    onError: (error) => {
      console.error("Erro no registro:", error);
      setError(
        "Ocorreu um erro ao criar sua conta. Por favor, tente novamente."
      );
    },
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });

  const signupSchema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    sobrenome: Yup.string().required("Sobrenome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    senha: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
    pais: Yup.string().required("País é obrigatório"),
    estado: Yup.string().required("Estado é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatória"),
    dia: Yup.string().required("Dia é obrigatório"),
    mes: Yup.string().required("Mês é obrigatório"),
    ano: Yup.string().required("Ano é obrigatório"),
    genero: Yup.string().required("Gênero é obrigatório"),
  });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginSchema.validate(
        Object.fromEntries(new FormData(event.target)),
        { abortEarly: false }
      );
      const result = await loginMutation.mutateAsync(
        Object.fromEntries(new FormData(event.target))
      );
      setResultModalContent({
        title: "Login bem-sucedido",
        message: "Você foi autenticado com sucesso!",
        isSuccess: true,
      });
      setShowResultModal(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.errors.join(", "));
      } else {
        setError("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
      }
      setResultModalContent({
        title: "Erro no login",
        message: error,
        isSuccess: false,
      });
      setShowResultModal(true);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      await signupSchema.validate(
        Object.fromEntries(new FormData(event.target)),
        { abortEarly: false }
      );
      const result = await registerMutation.mutateAsync(
        Object.fromEntries(new FormData(event.target))
      );
      setResultModalContent({
        title: "Registro bem-sucedido",
        message: "Sua conta foi criada com sucesso!",
        isSuccess: true,
      });
      setShowResultModal(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.errors.join(", "));
      } else {
        setError(
          "Ocorreu um erro ao criar sua conta. Por favor, tente novamente."
        );
      }
      setResultModalContent({
        title: "Erro no registro",
        message: error,
        isSuccess: false,
      });
      setShowResultModal(true);
    }
  };

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return {
    showModal,
    setShowModal,
    profileImage,
    setProfileImage,
    coverImage,
    setCoverImage,
    handleModalClose,
    handleModalShow,
    handleLoginSubmit,
    handleSignupSubmit,
    handleImageUpload,
    isLoading: loginMutation.isLoading || registerMutation.isLoading,
    error,
    showResultModal,
    setShowResultModal,
    resultModalContent,
  };
};

export const anos = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);
export const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
export const dias = Array.from({ length: 31 }, (_, i) => i + 1);
