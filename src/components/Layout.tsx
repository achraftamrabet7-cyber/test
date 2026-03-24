import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  HelpCircle, 
  LogOut,
  Bell,
  Search,
  Plus,
  CheckCircle2,
  Info,
  AlertCircle,
  X,
  History
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useSocket } from '../contexts/SocketContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'users', label: 'User Management', icon: ShieldCheck },
    { id: 'audit', label: 'Audit History', icon: History },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-50 border-r border-slate-200 flex flex-col py-6 z-50">
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bna-gradient flex items-center justify-center text-white font-bold text-xl shadow-sm">B</div>
          <div>
            <h1 className="text-lg font-bold text-primary font-headline leading-tight">BNA Internal</h1>
            <p className="text-[0.6875rem] uppercase tracking-wider text-slate-500 font-medium">The Sovereign Layer</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
              activeTab === item.id 
                ? "text-primary font-bold border-l-4 border-primary bg-white shadow-sm translate-x-1" 
                : "text-slate-500 hover:text-primary hover:bg-white/50"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
            <span className="text-[0.875rem]">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto px-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-primary transition-all">
          <HelpCircle className="w-5 h-5 text-slate-400" />
          <span className="text-[0.875rem]">Help</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error transition-all">
          <LogOut className="w-5 h-5 text-slate-400" />
          <span className="text-[0.875rem]">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export const TopBar: React.FC<{ title: string }> = ({ title }) => {
  const { notifications, markRead, clearNotifications, setIsNewProjectModalOpen } = useSocket();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center w-full px-8 py-3 sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="flex items-center gap-8 flex-1">
        <h2 className="text-xl font-headline font-semibold text-primary hidden lg:block">{title}</h2>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
            placeholder="Search projects, documents, or team members..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsNewProjectModalOpen(true)}
          className="px-5 py-2 bna-gradient text-white rounded-md text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-2 relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full relative transition-all active:scale-90"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <h4 className="font-bold text-on-surface text-sm">Notifications</h4>
                <button 
                  onClick={clearNotifications}
                  className="text-[0.6875rem] uppercase tracking-wider text-primary font-bold hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Bell className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-sm text-secondary">No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      onClick={() => markRead(notification.id)}
                      className={cn(
                        "p-4 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer relative group",
                        !notification.read && "bg-primary/5"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                          notification.type === 'assignment' ? "bg-blue-100 text-blue-600" :
                          notification.type === 'update' ? "bg-green-100 text-green-600" :
                          notification.type === 'new_project' ? "bg-orange-100 text-orange-600" :
                          "bg-slate-100 text-slate-600"
                        )}>
                          {notification.type === 'assignment' ? <Users className="w-4 h-4" /> :
                           notification.type === 'update' ? <CheckCircle2 className="w-4 h-4" /> :
                           notification.type === 'new_project' ? <Plus className="w-4 h-4" /> :
                           <Info className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-bold text-on-surface truncate">{notification.title}</h5>
                          <p className="text-xs text-secondary mt-0.5 line-clamp-2">{notification.message}</p>
                          <span className="text-[0.625rem] text-slate-400 mt-1 block">{notification.time}</span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="h-8 w-8 rounded-full overflow-hidden border border-primary-container cursor-pointer">
            <img 
              alt="User" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnFPbPGt61WhcXsNxZhA5UunrnpoPCRCaJIeP-q5-MtZD-pAYMDV8ANzUUFz8BDumIQI4I1wbMTH583kDU_rXIMhDgP03YRx2u3mYbjVEuC-g_BVAaD1WN5pdSLTkvp_IOUh1nUGcnRwl4E4JN5i2aIIDxynp0FaeKbk-8Djw96tetm493Ax4GUtNWIpFhcB5UGKdR7k9M1Sr8Mo3g3lbeXy6Y5tveIgYZSTtpj1DSnAg6EhE9zI1uUuIg0Fz829iwnTMCvTGH1Lky"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
