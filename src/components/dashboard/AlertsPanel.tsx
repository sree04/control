
import { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

// Mock alert data
const initialAlerts = [
  {
    id: 'alert-001',
    type: 'warning',
    message: 'Temperature above threshold on Assembly Line A',
    time: '10 minutes ago',
    dismissed: false
  },
  {
    id: 'alert-002',
    type: 'critical',
    message: 'Pressure drop detected on Hydraulic Press C',
    time: '35 minutes ago',
    dismissed: false
  },
  {
    id: 'alert-003',
    type: 'info',
    message: 'Scheduled maintenance for CNC Machine B in 2 days',
    time: '2 hours ago',
    dismissed: false
  },
  {
    id: 'alert-004',
    type: 'success',
    message: 'Production target achieved for Line A',
    time: '4 hours ago',
    dismissed: false
  }
];

// Alert type icon mapping
const alertIcons = {
  warning: <AlertTriangle size={18} className="text-industrial-warning" />,
  critical: <AlertTriangle size={18} className="text-industrial-danger" />,
  info: <Info size={18} className="text-industrial-accent" />,
  success: <CheckCircle size={18} className="text-industrial-success" />
};

export const AlertsPanel = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  
  // Function to dismiss an alert
  const dismissAlert = (id: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, dismissed: true } : alert
      )
    );
    
    // Remove the alert from state after animation
    setTimeout(() => {
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    }, 300);
  };
  
  // Simulate new random alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddAlert = Math.random() < 0.3; // 30% chance to add a new alert
      
      if (shouldAddAlert && alerts.length < 8) {
        const alertTypes = ['warning', 'critical', 'info', 'success'];
        const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        const alertMessages = {
          warning: [
            'Temperature above threshold on Assembly Line C',
            'Low material level detected on Production Line B',
            'Minor voltage fluctuation in Power Distribution Unit'
          ],
          critical: [
            'Emergency stop activated on Production Line D',
            'Critical pressure drop in Hydraulic System',
            'Machine fault detected on CNC Router'
          ],
          info: [
            'System update scheduled for tonight at 2 AM',
            'New production order added to queue',
            'Shift change in 30 minutes'
          ],
          success: [
            'Daily production target achieved',
            'Maintenance completed successfully',
            'System optimization complete, efficiency improved by 5%'
          ]
        };
        
        const randomMessage = alertMessages[randomType as keyof typeof alertMessages][
          Math.floor(Math.random() * alertMessages[randomType as keyof typeof alertMessages].length)
        ];
        
        const newAlert = {
          id: `alert-${Date.now()}`,
          type: randomType,
          message: randomMessage,
          time: 'Just now',
          dismissed: false
        };
        
        setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
      }
    }, 20000);
    
    return () => clearInterval(interval);
  }, [alerts]);
  
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">System Alerts</h2>
        <div className="text-sm font-medium text-industrial-accent hover:underline cursor-pointer">
          View all
        </div>
      </div>
      
      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-industrial-neutral">
          <CheckCircle size={40} className="mb-2 text-industrial-success" />
          <p>No active alerts</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`
                flex items-start p-3 rounded-lg border-l-4 bg-white
                ${alert.type === 'warning' ? 'border-industrial-warning' : ''}
                ${alert.type === 'critical' ? 'border-industrial-danger' : ''}
                ${alert.type === 'info' ? 'border-industrial-accent' : ''}
                ${alert.type === 'success' ? 'border-industrial-success' : ''}
                ${alert.dismissed ? 'animate-fade-out' : 'animate-slide-in'}
              `}
            >
              <div className="flex-shrink-0 mr-3 mt-0.5">
                {alertIcons[alert.type as keyof typeof alertIcons]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-industrial-neutral mt-1">{alert.time}</p>
              </div>
              <button 
                onClick={() => dismissAlert(alert.id)}
                className="ml-3 flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
