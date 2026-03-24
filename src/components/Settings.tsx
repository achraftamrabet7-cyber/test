import React from 'react';
import { 
  Settings as SettingsIcon, 
  ChevronRight,
  Shield,
  Bell,
  Palette,
  Globe,
  Lock,
  Mail,
  Smartphone,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Settings: React.FC = () => {
  const sections = [
    {
      title: 'Profile Settings',
      items: [
        { icon: Mail, label: 'Email Notifications', desc: 'Manage your corporate email alerts.', active: true },
        { icon: Smartphone, label: 'Mobile Sync', desc: 'Connect your secure mobile device.', active: false },
      ]
    },
    {
      title: 'System Governance',
      items: [
        { icon: Shield, label: 'Security Protocol', desc: 'Configure multi-factor authentication.', active: true },
        { icon: Lock, label: 'Access Control', desc: 'Manage role-based permissions.', active: true },
      ]
    },
    {
      title: 'Interface Customization',
      items: [
        { icon: Palette, label: 'Theme Preferences', desc: 'Switch between light and dark modes.', active: false },
        { icon: Globe, label: 'Regional Settings', desc: 'Set your timezone and language.', active: true },
      ]
    }
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-slate-500 mb-2 font-headline font-bold">
            <span>System</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Global Settings</span>
          </nav>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Configuration</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-lg">Manage your account preferences and system-wide governance protocols.</p>
        </div>
      </div>

      <div className="max-w-4xl space-y-12">
        {sections.map((section) => (
          <section key={section.title} className="space-y-6">
            <h3 className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 pb-2">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item) => (
                <div key={item.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-on-surface">{item.label}</h4>
                      <div className={cn(
                        "w-10 h-5 rounded-full relative transition-colors cursor-pointer",
                        item.active ? "bg-primary" : "bg-slate-200"
                      )}>
                        <div className={cn(
                          "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                          item.active ? "right-1" : "left-1"
                        )}></div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
          <button className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all">
            Reset Defaults
          </button>
          <button 
            onClick={() => alert('Settings Saved (Simulation)')}
            className="px-8 py-3 bna-gradient text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
