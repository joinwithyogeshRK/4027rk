import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './ModeToggle';
import { CheckSquare } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="app-header sticky top-0 z-10 border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <CheckSquare className="mr-2 h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Simple Todo</span>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            <li>
              <NavLink to="/tasks" active={location.pathname === '/tasks'}>
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats" active={location.pathname === '/stats'}>
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" active={location.pathname === '/settings'}>
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Button
      asChild
      variant={active ? "default" : "ghost"}
      className={active ? "bg-primary text-primary-foreground" : ""}
    >
      <Link to={to}>{children}</Link>
    </Button>
  );
};

export default Navbar;