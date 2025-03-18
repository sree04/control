
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import MachineStatus from "@/components/dashboard/MachineStatus";
import PerformanceMetrics from "@/components/dashboard/PerformanceMetrics";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ControlPanel from "@/components/dashboard/ControlPanel";
import { Activity } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-industrial-accent/10 text-industrial-accent text-xs font-medium">
            <Activity size={14} className="mr-1" />
            System Status: Operational
          </div>
        </div>
        <h1 className="text-3xl font-medium">Industrial Control Dashboard</h1>
        <p className="text-industrial-neutral mt-2">Real-time monitoring and control of production systems</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <PerformanceMetrics />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MachineStatus />
        </div>
        <div>
          <ControlPanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
