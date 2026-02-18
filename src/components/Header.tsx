import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Header = () => {
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Plataforma interna</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
