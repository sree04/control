
import { ReactNode, useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  Home, 
  Gauge, 
  Bell, 
  Settings, 
  Factory, 
  BarChart, 
  Activity, 
  Power
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="pt-6">
        <div className="flex items-center justify-center mb-6 px-4">
          <h1 className="text-white text-xl font-medium">AutoCtrl</h1>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>MONITORING</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <Home size={20} />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/metrics">
                    <Gauge size={20} />
                    <span>Metrics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/alerts">
                    <Bell size={20} />
                    <span>Alerts</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>PRODUCTION</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/machines">
                    <Factory size={20} />
                    <span>Machines</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/analytics">
                    <BarChart size={20} />
                    <span>Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/performance">
                    <Activity size={20} />
                    <span>Performance</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>SYSTEM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/controls">
                    <Power size={20} />
                    <span>Controls</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings">
                    <Settings size={20} />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-x-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <SidebarTrigger />
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                  <Bell size={20} />
                </button>
                <div className="h-8 w-8 rounded-full bg-industrial-accent text-white flex items-center justify-center">
                  <span className="text-sm font-medium">OP</span>
                </div>
              </div>
            </div>
            <main className="animate-fade-in">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
