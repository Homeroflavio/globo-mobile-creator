import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export interface ProcessVideoResponse {
  videoUrl: string;
  title: string;
  description: string;
  status: string;
}

/**
 * Envia um vídeo para processamento
 * @param file - Arquivo de vídeo (.mp4, .mov, .avi)
 * @returns Dados do vídeo processado
 */
export const processVideo = async (file: File): Promise<ProcessVideoResponse> => {
  const formData = new FormData();
  formData.append('video', file);

  try {
    const response = await api.post<ProcessVideoResponse>('/process-video', formData);
    return response.data;
  } catch (error) {
    console.error('Erro ao processar vídeo:', error);
    throw new Error('Falha ao processar vídeo. Tente novamente.');
  }
};

/**
 * Mock de autenticação local
 * @param email - E-mail do usuário
 * @param password - Senha do usuário
 * @returns true se autenticado com sucesso
 */
export const login = (email: string, password: string): boolean => {
  // Mock simples: admin@teste.com / 123456
  if (email === 'admin@teste.com' && password === '123456') {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

/**
 * Faz logout do usuário
 */
export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
};
