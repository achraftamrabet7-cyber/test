import React from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useSocket } from '../contexts/SocketContext';

export const Teams: React.FC = () => {
  const { users } = useSocket();
  
  // Group users by department
  const departments = Array.from(new Set(users.map(u => u.department)));

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-slate-500 mb-2 font-headline font-bold">
            <span>Organization</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Teams & Departments</span>
          </nav>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Strategic Units</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-lg">Management of cross-functional teams and departmental resource allocation.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" 
              placeholder="Search teams..." 
              type="text" 
            />
          </div>
          <button 
            onClick={() => alert('Adding New Team (Simulation)')}
            className="flex items-center gap-2 px-4 py-2 bna-gradient text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Users className="w-4 h-4" />
            Create Team
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {departments.map((dept) => {
          const deptUsers = users.filter(u => u.department === dept);
          return (
            <section key={dept} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-headline font-bold text-on-surface">{dept}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{deptUsers.length} Members Assigned</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deptUsers.map((user) => (
                  <div key={user.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <button className="p-1.5 text-slate-300 hover:text-primary transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-sm">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-on-surface">{user.name}</h4>
                        <p className="text-xs text-primary font-bold uppercase tracking-widest">{user.role}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-500">
                        <Mail className="w-4 h-4 opacity-40" />
                        <span className="text-xs font-medium">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <MapPin className="w-4 h-4 opacity-40" />
                        <span className="text-xs font-medium">Headquarters, Algiers</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-400">
                            P{i}
                          </div>
                        ))}
                      </div>
                      <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View Projects</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
