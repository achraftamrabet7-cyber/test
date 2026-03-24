import React, { useState } from 'react';
import { 
  Layout, 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  BarChart3, 
  Settings as SettingsIcon, 
  ShieldCheck,
  LogOut,
  Bell,
  Search,
  Plus,
  ArrowRight,
  TrendingUp,
  Smartphone,
  Megaphone,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Download,
  MoreVertical,
  Edit3,
  UserPlus,
  Edit,
  Lock,
  UserX,
  History,
  Mail,
  Shield,
  Palette,
  Globe,
  Moon,
  Camera,
  Check,
  X
} from 'lucide-react';
import { cn } from './lib/utils';
import { useNavigation } from './contexts/NavigationContext';
import { Sidebar, TopBar } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { UserManagement } from './components/UserManagement';
import { AuditLog } from './components/AuditLog';
import { Teams } from './components/Teams';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';

// Simple Login Component
const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <section className="hidden md:flex md:w-1/2 bna-gradient relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[40px] border-white"></div>
          <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full border-[20px] border-white translate-x-1/2"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-primary w-8 h-8" />
            </div>
            <div>
              <h1 className="font-headline font-extrabold text-white text-2xl tracking-tight">BNA Internal</h1>
              <p className="text-[0.6875rem] uppercase tracking-wider opacity-80 text-white font-bold">The Sovereign Layer</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="font-headline text-white text-5xl font-extrabold leading-[1.1] mb-6">Securing the Future of Algerian Finance.</h2>
          <p className="text-white text-lg opacity-90 leading-relaxed">
            Access the central management portal for Banque Nationale d’Algérie's internal infrastructure and project governance.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-6 text-white/60 text-[0.6875rem] uppercase tracking-[0.1em] font-bold">
          <span>Est. 1966</span>
          <span className="w-1 h-1 bg-white/40 rounded-full"></span>
          <span>Algiers, Algeria</span>
        </div>
      </section>

      <section className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 text-left">
            <h3 className="font-headline text-3xl font-bold text-on-surface mb-2 tracking-tight">Authentication</h3>
            <p className="text-secondary text-sm">Please enter your corporate credentials to continue to Project Management.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-2">
              <label className="block text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all editorial-shadow" 
                  placeholder="name@bna.dz" 
                  type="email" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Password</label>
                <a className="text-[0.6875rem] uppercase tracking-wider text-primary font-bold hover:underline" href="#">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all editorial-shadow" 
                  placeholder="••••••••" 
                  type="password" 
                  required 
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary/20 cursor-pointer" id="remember" type="checkbox" />
              <label className="text-sm text-secondary cursor-pointer select-none" htmlFor="remember">Remember this device</label>
            </div>
            <button className="w-full bna-gradient text-white font-headline font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" type="submit">
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-secondary">
              Need technical assistance? <a className="text-primary font-semibold hover:underline" href="#">Contact IT Support</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { activeTab, setActiveTab } = useNavigation();

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'projects': return <Projects />;
      case 'users': return <UserManagement />;
      case 'audit': return <AuditLog />;
      case 'teams': return <Teams />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return (
        <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <SettingsIcon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-2 capitalize">{activeTab} Page</h3>
          <p>This module is currently under development for the Sovereign Layer.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-64 min-h-screen">
        <TopBar title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
        {renderContent()}
      </main>
    </div>
  );
}
