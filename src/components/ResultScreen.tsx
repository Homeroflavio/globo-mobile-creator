import { Download, RefreshCw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';

interface ResultScreenProps {
  videoUrl: string;
  title: string;
  description: string;
  onNewVideo: () => void;
}

const ResultScreen = ({ videoUrl, title, description, onNewVideo }: ResultScreenProps) => {
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'video_mobile.mp4';
    link.click();
    toast.success('Download iniciado!');
  };

  const copyToClipboard = (text: string, type: 'title' | 'description') => {
    navigator.clipboard.writeText(text);
    if (type === 'title') {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    } else {
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 2000);
    }
    toast.success('Copiado para a área de transferência!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 shadow-elegant">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Vídeo Pronto! 🎉</h2>
          <Button onClick={onNewVideo} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Novo vídeo
          </Button>
        </div>

        <div className="rounded-lg overflow-hidden bg-black mb-6">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full max-h-[600px] object-contain"
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>

        <Button onClick={handleDownload} className="w-full gap-2 bg-gradient-primary shadow-elegant">
          <Download className="w-5 h-5" />
          Baixar Vídeo Final
        </Button>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Título Sugerido</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(title, 'title')}
              className="hover:bg-accent"
            >
              {copiedTitle ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-muted-foreground">{title}</p>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Descrição para Redes</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(description, 'description')}
              className="hover:bg-accent"
            >
              {copiedDesc ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </Card>
      </div>
    </div>
  );
};

export default ResultScreen;
