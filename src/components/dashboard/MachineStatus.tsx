
import { useState, useEffect } from 'react';
import { Power, Thermometer, Gauge, Factory } from 'lucide-react';
import { StatusIndicator } from '../ui/StatusIndicator';

// Mock machine data
const machines = [
  { 
    id: 'machine-001', 
    name: 'Assembly Line A', 
    status: 'operational', 
    temperature: 45.2, 
    pressure: 98.6, 
    production: 2034,
    uptime: '5d 12h 32m'
  },
  { 
    id: 'machine-002', 
    name: 'CNC Machine B', 
    status: 'warning', 
    temperature: 72.3, 
    pressure: 87.1, 
    production: 1654,
    uptime: '2d 8h 45m'
  },
  { 
    id: 'machine-003', 
    name: 'Hydraulic Press C', 
    status: 'operational', 
    temperature: 35.7, 
    pressure: 105.2, 
    production: 1142,
    uptime: '7d 3h 12m'
  },
  { 
    id: 'machine-004', 
    name: 'Packaging Unit D', 
    status: 'offline', 
    temperature: 22.5, 
    pressure: 0, 
    production: 0,
    uptime: '0d 0h 0m'
  }
];

export const MachineStatus = () => {
  const [data, setData] = useState(machines);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = data.map(machine => {
        // Only update operational and warning machines
        if (machine.status === 'offline') return machine;
        
        // Random chance for status changes
        const statusRoll = Math.random();
        let newStatus = machine.status;
        
        if (machine.status === 'operational' && statusRoll < 0.05) {
          newStatus = 'warning';
        } else if (machine.status === 'warning') {
          if (statusRoll < 0.03) {
            newStatus = 'critical';
          } else if (statusRoll > 0.95) {
            newStatus = 'operational';
          }
        } else if (machine.status === 'critical' && statusRoll > 0.95) {
          newStatus = 'warning';
        }
        
        // Random fluctuations in values
        return {
          ...machine,
          status: newStatus,
          temperature: machine.status !== 'offline' 
            ? Number((Math.max(20, Math.min(95, machine.temperature + (Math.random() - 0.5) * 2))).toFixed(1))
            : machine.temperature,
          pressure: machine.status !== 'offline' 
            ? Number((Math.max(80, Math.min(120, machine.pressure + (Math.random() - 0.5) * 3))).toFixed(1))
            : machine.pressure,
          production: machine.status !== 'offline' 
            ? machine.production + Math.floor(Math.random() * 5) 
            : machine.production
        };
      });
      
      setData(updatedData);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [data]);
  
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Machine Status</h2>
        <button className="text-industrial-accent hover:underline text-sm">View all machines</button>
      </div>
      
      <div className="grid gap-4">
        {data.map(machine => (
          <div 
            key={machine.id} 
            className="glass-panel p-4 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <StatusIndicator 
                  status={machine.status as any} 
                  pulse={machine.status !== 'offline'} 
                />
                <h3 className="ml-2 font-medium">{machine.name}</h3>
              </div>
              <button className="p-1.5 rounded-full hover:bg-gray-100 transition">
                <Power size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col">
                <div className="flex items-center text-industrial-neutral mb-1">
                  <Thermometer size={16} className="mr-1" />
                  <span className="text-xs">Temperature</span>
                </div>
                <span className="text-sm font-medium">{machine.temperature}°C</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center text-industrial-neutral mb-1">
                  <Gauge size={16} className="mr-1" />
                  <span className="text-xs">Pressure</span>
                </div>
                <span className="text-sm font-medium">{machine.pressure} Bar</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center text-industrial-neutral mb-1">
                  <Factory size={16} className="mr-1" />
                  <span className="text-xs">Production</span>
                </div>
                <span className="text-sm font-medium">{machine.production} units</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-industrial-neutral">Uptime</span>
                <span className="font-medium">{machine.uptime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineStatus;
