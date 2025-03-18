
import { cn } from '@/lib/utils';

type StatusType = 'operational' | 'warning' | 'critical' | 'offline';

interface StatusIndicatorProps {
  status: StatusType;
  pulse?: boolean;
  label?: string;
  className?: string;
}

const statusClasses = {
  operational: 'bg-industrial-success',
  warning: 'bg-industrial-warning',
  critical: 'bg-industrial-danger',
  offline: 'bg-industrial-neutral'
};

const statusLabels = {
  operational: 'Operational',
  warning: 'Warning',
  critical: 'Critical',
  offline: 'Offline'
};

export const StatusIndicator = ({ 
  status, 
  pulse = false,
  label,
  className 
}: StatusIndicatorProps) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div 
        className={cn(
          "h-2.5 w-2.5 rounded-full", 
          statusClasses[status],
          { "animate-pulse": pulse }
        )} 
      />
      {label && <span className="text-sm font-medium">{label}</span>}
      {!label && <span className="text-sm font-medium">{statusLabels[status]}</span>}
    </div>
  );
};

export default StatusIndicator;
