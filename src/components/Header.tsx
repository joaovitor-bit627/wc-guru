import { Link } from "react-router-dom";
import { Search, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-raised/95 backdrop-blur supports-[backdrop-filter]:bg-surface-raised/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">LM</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-base font-bold leading-tight text-foreground">
              Consulta Técnica
            </h1>
            <p className="text-xs text-muted-foreground">Assentos Sanitários</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Plataforma interna</span>
          </div>
          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-1.5 text-primary hover:underline font-medium">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
          {!user && (
            <Link to="/login" className="text-muted-foreground hover:text-foreground text-xs">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
