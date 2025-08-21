import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, BarChart3, Settings } from 'lucide-react';

const MobileMenu = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full border-t border-border bg-surface md:hidden">
      <div className="flex h-16 items-center justify-around">
        <MobileNavLink 
          to="/tasks" 
          active={location.pathname === '/tasks'}
          icon={<CheckSquare className="h-6 w-6" />}
          label="Tasks"
        />
        <MobileNavLink 
          to="/stats" 
          active={location.pathname === '/stats'}
          icon={<BarChart3 className="h-6 w-6" />}
          label="Stats"
        />
        <MobileNavLink 
          to="/settings" 
          active={location.pathname === '/settings'}
          icon={<Settings className="h-6 w-6" />}
          label="Settings"
        />
      </div>
    </div>
  );
};

interface MobileNavLinkProps {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}

const MobileNavLink = ({ to, active, icon, label }: MobileNavLinkProps) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center space-y-1 rounded-md p-2 ${active ? 'text-primary' : 'text-muted-foreground'}`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export default MobileMenu;