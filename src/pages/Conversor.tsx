import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import VideoUpload from '@/components/VideoUpload';
import ProcessingScreen from '@/components/ProcessingScreen';
import ResultScreen from '@/components/ResultScreen';
import { Button } from '@/components/ui/button';
import { processVideo, isAuthenticated, getUserId } from '@/services/api';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';
import { useEffect } from 'react';

type DashboardState = 'upload' | 'processing' | 'result';

interface VideoResult {
  videoUrl: string;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [state, setState] = useState<DashboardState>('upload');
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [result, setResult] = useState<VideoResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleProcessVideo = async () => {
    if (!selectedVideo) {
      toast.error('Por favor, selecione um vídeo primeiro');
      return;
    }

    const userId = getUserId();
    if (!userId) {
      toast.error('Sessão expirada. Faça login novamente.');
      navigate('/login');
      return;
    }

    setState('processing');

    try {
      // Simula o processamento por 8 segundos antes de chamar a API
      // Isso dá tempo para o usuário ver as animações
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      const response = await processVideo(selectedVideo, userId);
      setResult({
        videoUrl: response.videoUrl,
        title: response.title,
        description: response.description,
      });
      setState('result');
      toast.success('Vídeo processado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao processar:', error);
      toast.error(error.message || 'Erro ao processar vídeo. Tente novamente.');
      setState('upload');
    }
  };

  const handleNewVideo = () => {
    setState('upload');
    setSelectedVideo(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {state === 'upload' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Converta seu vídeo para mobile
                </h2>
                <p className="text-muted-foreground">
                  Faça upload do seu vídeo e transforme-o em formato vertical com legendas automáticas
                </p>
              </div>

              <VideoUpload
                onVideoSelect={setSelectedVideo}
                selectedVideo={selectedVideo}
              />

              {selectedVideo && (
                <Button
                  onClick={handleProcessVideo}
                  className="w-full gap-2 bg-gradient-primary shadow-elegant text-lg py-6"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Gerar Versão Mobile
                </Button>
              )}
            </div>
          )}

          {state === 'processing' && <ProcessingScreen />}

          {state === 'result' && result && (
            <ResultScreen
              videoUrl={result.videoUrl}
              title={result.title}
              description={result.description}
              onNewVideo={handleNewVideo}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
