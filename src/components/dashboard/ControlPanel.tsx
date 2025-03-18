
import { useState } from 'react';
import { Power, Sliders, RefreshCw, AlertTriangle, X } from 'lucide-react';

const machines = [
  { id: 'machine-001', name: 'Assembly Line A', running: true, slider1Value: 75, slider2Value: 65 },
  { id: 'machine-002', name: 'CNC Machine B', running: false, slider1Value: 0, slider2Value: 0 },
  { id: 'machine-003', name: 'Hydraulic Press C', running: true, slider1Value: 90, slider2Value: 82 },
  { id: 'machine-004', name: 'Packaging Unit D', running: false, slider1Value: 0, slider2Value: 0 }
];

export const ControlPanel = () => {
  const [machineStates, setMachineStates] = useState(machines);
  const [confirmationOpen, setConfirmationOpen] = useState<string | null>(null);
  
  // Toggle machine power
  const toggleMachinePower = (machineId: string) => {
    if (confirmationOpen === machineId) {
      setMachineStates(prevState => 
        prevState.map(machine => 
          machine.id === machineId 
            ? { 
                ...machine, 
                running: !machine.running,
                slider1Value: !machine.running ? 75 : 0,
                slider2Value: !machine.running ? 65 : 0
              } 
            : machine
        )
      );
      setConfirmationOpen(null);
    } else {
      setConfirmationOpen(machineId);
    }
  };
  
  // Cancel power toggle confirmation
  const cancelConfirmation = () => {
    setConfirmationOpen(null);
  };
  
  // Update slider values
  const updateSliderValue = (machineId: string, sliderNum: 1 | 2, value: number) => {
    setMachineStates(prevState => 
      prevState.map(machine => 
        machine.id === machineId 
          ? { 
              ...machine, 
              [sliderNum === 1 ? 'slider1Value' : 'slider2Value']: value 
            } 
          : machine
      )
    );
  };
  
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">System Controls</h2>
        <button className="flex items-center text-sm font-medium text-industrial-accent hover:underline">
          <RefreshCw size={16} className="mr-1" />
          Reset All
        </button>
      </div>
      
      <div className="grid gap-4">
        {machineStates.map(machine => (
          <div 
            key={machine.id} 
            className={`
              glass-panel p-4 transition-all duration-300
              ${machine.running ? 'border-l-4 border-l-industrial-success' : 'border-l-4 border-l-industrial-neutral'}
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className={`
                  h-3 w-3 rounded-full mr-2
                  ${machine.running ? 'bg-industrial-success animate-pulse' : 'bg-industrial-neutral'}
                `} />
                <h3 className="font-medium">{machine.name}</h3>
              </div>
              
              {confirmationOpen === machine.id ? (
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-industrial-warning mr-1" />
                  <span className="text-xs text-industrial-warning mr-2">Confirm action</span>
                  <button 
                    onClick={() => toggleMachinePower(machine.id)}
                    className="p-1.5 rounded bg-industrial-accent text-white mr-1 hover:bg-industrial-accent/90 transition-colors"
                  >
                    <Power size={16} />
                  </button>
                  <button 
                    onClick={cancelConfirmation}
                    className="p-1.5 rounded bg-industrial-neutral text-white hover:bg-industrial-neutral/90 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => toggleMachinePower(machine.id)}
                  className={`
                    p-1.5 rounded-full transition-colors
                    ${machine.running 
                      ? 'bg-industrial-success text-white hover:bg-industrial-success/90' 
                      : 'bg-industrial-neutral text-white hover:bg-industrial-neutral/90'}
                  `}
                >
                  <Power size={18} />
                </button>
              )}
            </div>
            
            {machine.running && (
              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-industrial-neutral">Speed Control</label>
                    <span className="text-xs font-medium">{machine.slider1Value}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={machine.slider1Value}
                    onChange={(e) => updateSliderValue(machine.id, 1, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-industrial-accent"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-industrial-neutral">Pressure Control</label>
                    <span className="text-xs font-medium">{machine.slider2Value}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={machine.slider2Value}
                    onChange={(e) => updateSliderValue(machine.id, 2, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-industrial-accent"
                  />
                </div>
              </div>
            )}
            
            {!machine.running && (
              <div className="mt-4 py-5 flex justify-center items-center text-sm text-industrial-neutral">
                <p>Machine offline. Power on to access controls.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
