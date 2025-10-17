import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isAuthenticated } from '@/services/api';
import { Search, Plus, Trash2 } from 'lucide-react';

// Mock data para o histórico
const mockHistorico = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    titulo: 'Reportagem sobre mudanças climáticas no Brasil',
    data: '15/01/2025',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400',
    titulo: 'Entrevista com especialista em tecnologia',
    data: '14/01/2025',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=400',
    titulo: 'Cobertura especial das eleições municipais',
    data: '13/01/2025',
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
    titulo: 'Matéria sobre inovação no agronegócio',
    data: '12/01/2025',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [historico, setHistorico] = useState(mockHistorico);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleDelete = (id: number) => {
    // Por enquanto apenas visual
    console.log('Excluir vídeo:', id);
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
            {filteredHistorico.length === 0 ? (
              <Card className="p-8 text-center shadow-card animate-fade-in">
                <p className="text-muted-foreground">
                  Nenhum vídeo encontrado
                </p>
              </Card>
            ) : (
              filteredHistorico.map((item, index) => (
                <Card
                  key={item.id}
                  className="p-4 shadow-card hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Miniatura */}
                    <div className="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.thumbnail}
                        alt={item.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground truncate">
                        {item.titulo}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Convertido em {item.data}
                      </p>
                    </div>

                    {/* Botão Excluir */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
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
