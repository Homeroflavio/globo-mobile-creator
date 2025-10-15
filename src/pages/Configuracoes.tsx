import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, ArrowLeft } from 'lucide-react';
import { isAuthenticated } from '@/services/api';
import { useEffect } from 'react';

const Configuracoes = () => {
  const navigate = useNavigate();
  const [altoContraste, setAltoContraste] = useState(false);
  const [fonteAumentada, setFonteAumentada] = useState(false);
  const [legendasIA, setLegendasIA] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }

    // Carregar configurações salvas
    const configSalvas = localStorage.getItem('globoconverteConfig');
    if (configSalvas) {
      const config = JSON.parse(configSalvas);
      setAltoContraste(config.altoContraste || false);
      setFonteAumentada(config.fonteAumentada || false);
      setLegendasIA(config.legendasIA || false);
    }
  }, [navigate]);

  const handleSalvar = () => {
    const config = {
      altoContraste,
      fonteAumentada,
      legendasIA,
    };

    localStorage.setItem('globoconverteConfig', JSON.stringify(config));
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          </div>

          <div className="space-y-6">
            {/* Acessibilidade */}
            <Card className="p-6 shadow-card animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Modo Acessibilidade
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="alto-contraste" className="text-base">
                      Alto Contraste
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Aumenta o contraste das cores na interface
                    </p>
                  </div>
                  <Switch
                    id="alto-contraste"
                    checked={altoContraste}
                    onCheckedChange={setAltoContraste}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fonte-aumentada" className="text-base">
                      Aumentar Fontes
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Aumenta o tamanho das fontes na interface
                    </p>
                  </div>
                  <Switch
                    id="fonte-aumentada"
                    checked={fonteAumentada}
                    onCheckedChange={setFonteAumentada}
                  />
                </div>
              </div>
            </Card>

            {/* IA (desativado) */}
            <Card className="p-6 shadow-card animate-fade-in opacity-60">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Recursos de IA
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  (Em breve)
                </span>
              </h2>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="legendas-ia" className="text-base">
                    Gerar Legendas Automáticas
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Utiliza IA para criar legendas sincronizadas
                  </p>
                </div>
                <Switch
                  id="legendas-ia"
                  checked={legendasIA}
                  onCheckedChange={setLegendasIA}
                  disabled
                />
              </div>
            </Card>

            {/* Botão Salvar */}
            <Button
              onClick={handleSalvar}
              className="w-full gap-2 bg-gradient-primary shadow-elegant text-lg py-6"
              size="lg"
            >
              <Save className="w-5 h-5" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Configuracoes;
