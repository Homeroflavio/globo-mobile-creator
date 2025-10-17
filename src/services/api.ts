import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

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
 * @param userId - ID do usuário
 * @returns Dados do vídeo processado
 */
export const processVideo = async (file: File, userId: string): Promise<ProcessVideoResponse> => {
  const formData = new FormData();
  formData.append('video', file);

  try {
    const response = await api.post<ProcessVideoResponse>(`/videos/processar/${userId}`, formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
      throw new Error('Não foi possível conectar ao servidor. Certifique-se de que o backend está rodando em http://localhost:3001');
    }
    console.error('Erro ao processar vídeo:', error);
    throw new Error('Falha ao processar vídeo. Tente novamente.');
  }
};

/**
 * Busca lista de usuários e retorna o primeiro ID
 */
export const fetchUserId = async (): Promise<string | null> => {
  try {
    const response = await api.get('/usuarios');
    if (response.data && response.data.length > 0) {
      return response.data[0]._id;
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw new Error('Não foi possível conectar ao servidor para obter dados do usuário');
  }
};

/**
 * Autenticação real com o backend
 * @param email - E-mail do usuário
 * @param password - Senha do usuário
 * @returns true se autenticado com sucesso
 */
export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    // Configurar header para JSON
    const response = await axios.post(`${API_BASE_URL}/login`, 
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Se o login for bem-sucedido, buscar o userId
    if (response.status === 200 || response.status === 201) {
      const userId = await fetchUserId();
      if (userId) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('globo-user-id', userId);
        return true;
      }
      return false;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('E-mail ou senha inválidos. Tente novamente.');
      }
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Não foi possível conectar ao servidor. Certifique-se de que o backend está rodando em http://localhost:3001');
      }
    }
    console.error('Erro ao fazer login:', error);
    throw new Error('Falha ao fazer login. Tente novamente.');
  }
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const userId = localStorage.getItem('globo-user-id');
  return isAuth && !!userId;
};

/**
 * Retorna o ID do usuário armazenado
 */
export const getUserId = (): string | null => {
  return localStorage.getItem('globo-user-id');
};

/**
 * Faz logout do usuário
 */
export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('globo-user-id');
};

/**
 * Busca lista de vídeos do histórico
 */
export const fetchVideos = async (): Promise<any[]> => {
  try {
    const response = await api.get('/videos');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
      throw new Error('Não foi possível conectar ao servidor. Certifique-se de que o backend está rodando em http://localhost:3001');
    }
    console.error('Erro ao buscar vídeos:', error);
    throw new Error('Falha ao buscar histórico de vídeos');
  }
};
