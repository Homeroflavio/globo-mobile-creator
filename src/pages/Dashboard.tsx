import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isAuthenticated, fetchVideos } from '@/services/api';
import { Search, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Video {
  _id: string;
  titulo: string;
  descricao?: string;
  videoUrl?: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [historico, setHistorico] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const loadVideos = async () => {
      try {
        setIsLoading(true);
        const videos = await fetchVideos();
        setHistorico(videos);
      } catch (error: any) {
        toast.error(error.message || 'Erro ao carregar histórico de vídeos');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [navigate]);

  const handleDelete = (id: string) => {
    // Por enquanto apenas visual
    console.log('Excluir vídeo:', id);
    toast.info('Funcionalidade de exclusão em desenvolvimento');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const filteredHistorico = historico.filter((item) =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Histórico de Recortes
              </h1>
              <p className="text-muted-foreground mt-2">
                Visualize e gerencie seus vídeos convertidos
              </p>
            </div>
            <Button
              onClick={() => navigate('/conversor')}
              className="gap-2 bg-gradient-primary shadow-elegant"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Converter novo vídeo
            </Button>
          </div>

          {/* Campo de Pesquisa */}
          <Card className="p-4 mb-6 shadow-card animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Pesquisar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Lista de Vídeos */}
          <div className="space-y-4">
            {isLoading ? (
              <Card className="p-8 flex justify-center items-center shadow-card animate-fade-in">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </Card>
            ) : filteredHistorico.length === 0 ? (
              <Card className="p-8 text-center shadow-card animate-fade-in">
                <p className="text-muted-foreground">
                  {searchTerm ? 'Nenhum vídeo encontrado' : 'Nenhum vídeo convertido ainda. Comece enviando seu primeiro vídeo!'}
                </p>
              </Card>
            ) : (
              filteredHistorico.map((item, index) => (
                <Card
                  key={item._id}
                  className="p-4 shadow-card hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Miniatura */}
                    <div className="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-muted">
                      {item.videoUrl ? (
                        <video
                          src={item.videoUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground text-xs">Sem preview</span>
                        </div>
                      )}
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground truncate">
                        {item.titulo}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Convertido em {formatDate(item.createdAt)}
                      </p>
                    </div>

                    {/* Botão Excluir */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item._id)}
                      className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
