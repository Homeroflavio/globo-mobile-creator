import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isConfigPage = location.pathname === '/configuracoes';

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img src={logo} alt="GloboConverte Logo" className="w-10 h-10" />
          </div>
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          GloboConverte
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        {!isConfigPage && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/configuracoes')}
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            Configurações
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
      </div>
    </header>
  );
};

export default Header;
