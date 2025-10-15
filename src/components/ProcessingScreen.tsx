import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const processingSteps = [
  'Cortando vídeo para formato 9:16...',
  'Gerando legenda automática...',
  'Ajustando áudio...',
  'Otimizando para mobile...',
  'Finalizando exportação...',
];

const ProcessingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processingSteps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-8 animate-scale-in shadow-elegant">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
            <Loader2 className="w-12 h-12 text-primary-foreground animate-spin" />
          </div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-primary/20 rounded-full animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            Processando seu vídeo
          </h3>
          <p className="text-lg text-primary font-medium animate-fade-in">
            {processingSteps[currentStep]}
          </p>
        </div>

        <div className="w-full max-w-md bg-muted rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-primary animate-pulse" style={{ width: '60%' }} />
        </div>

        <p className="text-sm text-muted-foreground">
          Isso pode levar alguns minutos. Não feche esta janela.
        </p>
      </div>
    </Card>
  );
};

export default ProcessingScreen;
