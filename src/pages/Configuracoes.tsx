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
  const [formato, setFormato] = useState('reels');
  const [larguraCustom, setLarguraCustom] = useState('1080');
  const [alturaCustom, setAlturaCustom] = useState('1920');
  const [qualidade, setQualidade] = useState('1080p');
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
      setFormato(config.formato || 'reels');
      setLarguraCustom(config.larguraCustom || '1080');
      setAlturaCustom(config.alturaCustom || '1920');
      setQualidade(config.qualidade || '1080p');
      setAltoContraste(config.altoContraste || false);
      setFonteAumentada(config.fonteAumentada || false);
      setLegendasIA(config.legendasIA || false);
    }
  }, [navigate]);

  const handleSalvar = () => {
    const config = {
      formato,
      larguraCustom,
      alturaCustom,
      qualidade,
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
            {/* Formato do Vídeo */}
            <Card className="p-6 shadow-card animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Formato do Vídeo
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="formato">Selecione o formato</Label>
                  <Select value={formato} onValueChange={setFormato}>
                    <SelectTrigger id="formato" className="mt-2">
                      <SelectValue placeholder="Escolha o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reels">Instagram Reels (1080x1920)</SelectItem>
                      <SelectItem value="tiktok">TikTok (1080x1920)</SelectItem>
                      <SelectItem value="shorts">YouTube Shorts (1080x1920)</SelectItem>
                      <SelectItem value="custom">Tamanho Customizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formato === 'custom' && (
                  <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    <div>
                      <Label htmlFor="largura">Largura (px)</Label>
                      <Input
                        id="largura"
                        type="number"
                        value={larguraCustom}
                        onChange={(e) => setLarguraCustom(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="altura">Altura (px)</Label>
                      <Input
                        id="altura"
                        type="number"
                        value={alturaCustom}
                        onChange={(e) => setAlturaCustom(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Qualidade */}
            <Card className="p-6 shadow-card animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Qualidade do Vídeo
              </h2>
              
              <div>
                <Label htmlFor="qualidade">Resolução de saída</Label>
                <Select value={qualidade} onValueChange={setQualidade}>
                  <SelectTrigger id="qualidade" className="mt-2">
                    <SelectValue placeholder="Escolha a qualidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="720p">HD - 720p</SelectItem>
                    <SelectItem value="1080p">Full HD - 1080p</SelectItem>
                    <SelectItem value="1440p">2K - 1440p</SelectItem>
                    <SelectItem value="2160p">4K - 2160p</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

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
