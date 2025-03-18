
import { useState, useEffect } from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Initial mock data for the efficiency chart
const initialEfficiencyData = [
  { time: '8:00', value: 85 },
  { time: '9:00', value: 88 },
  { time: '10:00', value: 92 },
  { time: '11:00', value: 90 },
  { time: '12:00', value: 85 },
  { time: '13:00', value: 82 },
  { time: '14:00', value: 86 },
  { time: '15:00', value: 89 },
  { time: '16:00', value: 91 },
  { time: '17:00', value: 93 },
  { time: '18:00', value: 86 },
  { time: '19:00', value: 79 },
];

// Initial mock data for the production chart
const initialProductionData = [
  { category: 'Line A', value: 453 },
  { category: 'Line B', value: 351 },
  { category: 'Line C', value: 264 },
  { category: 'Line D', value: 192 },
];

// Custom tooltip component for the line chart
const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg p-3 rounded border border-gray-100">
        <p className="label text-sm font-medium">{`Time: ${label}`}</p>
        <p className="text-industrial-accent text-sm font-medium">{`Efficiency: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// Custom tooltip component for the bar chart
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg p-3 rounded border border-gray-100">
        <p className="label text-sm font-medium">{`${label}`}</p>
        <p className="text-industrial-accent text-sm font-medium">{`Units: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const PerformanceMetrics = () => {
  const [efficiencyData, setEfficiencyData] = useState(initialEfficiencyData);
  const [productionData, setProductionData] = useState(initialProductionData);
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update efficiency data with slight random variations
      setEfficiencyData(prevData => {
        return prevData.map(point => ({
          ...point,
          value: Math.max(70, Math.min(98, point.value + (Math.random() - 0.5) * 5))
        }));
      });
      
      // Update production data with slight random variations
      setProductionData(prevData => {
        return prevData.map(item => ({
          ...item,
          value: Math.max(150, Math.min(500, item.value + (Math.random() - 0.5) * 20))
        }));
      });
    }, 7000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="dashboard-card">
        <h2 className="text-xl font-medium mb-6">Efficiency Trend (24h)</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={efficiencyData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
                domain={[60, 100]} 
                tickFormatter={(tick) => `${tick}%`}
              />
              <Tooltip content={<CustomLineTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0284c7" 
                strokeWidth={3}
                dot={{ stroke: '#0284c7', strokeWidth: 2, r: 4, fill: '#fff' }}
                activeDot={{ r: 6, fill: '#0284c7' }}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-industrial-neutral">
          <span>Average: 87.5%</span>
          <span>Target: 90%</span>
          <span>Peak: 93%</span>
        </div>
      </div>
      
      <div className="dashboard-card">
        <h2 className="text-xl font-medium mb-6">Production by Line</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productionData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="category" 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar 
                dataKey="value" 
                fill="#0284c7" 
                radius={[4, 4, 0, 0]}
                animationDuration={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-industrial-neutral">
          <span>Total Units: 1,260</span>
          <span>Daily Target: 1,500</span>
          <span>Completion: 84%</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
