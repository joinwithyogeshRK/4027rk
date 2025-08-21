import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = ({ message, subMessage, action }: EmptyStateProps) => {
  return (
    <div className="empty-state my-12 rounded-lg border border-dashed border-border p-8">
      <ClipboardList className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium text-foreground">{message}</h3>
      {subMessage && <p className="mb-4 text-muted-foreground">{subMessage}</p>}
      {action && (
        <Button 
          onClick={action.onClick}
          className="bg-primary text-primary-foreground hover:bg-primary-600"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;