import React from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download,
  ChevronRight,
  Clock,
  User,
  Shield,
  Activity
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useSocket } from '../contexts/SocketContext';

export const AuditLog: React.FC = () => {
  const { auditLogs } = useSocket();

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-slate-500 mb-2 font-headline font-bold">
            <span>Governance</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Audit History</span>
          </nav>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">System Audit Trail</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-lg">Immutable record of all administrative and operational activities across the BNA Sovereign Layer.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" 
              placeholder="Search audit logs..." 
              type="text" 
            />
          </div>
          <button 
            onClick={() => alert('Exporting Audit Log (Simulation)')}
            className="flex items-center gap-2 px-4 py-2 bna-gradient text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Total Events</p>
            <h4 className="text-2xl font-headline font-extrabold text-on-surface">{auditLogs.length}</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-warning/10 rounded-2xl flex items-center justify-center text-warning">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Security Alerts</p>
            <h4 className="text-2xl font-headline font-extrabold text-on-surface">0</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center text-success">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Uptime Status</p>
            <h4 className="text-2xl font-headline font-extrabold text-on-surface">99.9%</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Event Type</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Action</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">User</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Timestamp</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <span className={cn(
                      "text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider",
                      log.type === 'Security' ? "bg-error/10 text-error" :
                      log.type === 'System' ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-on-surface">{log.action}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-3 h-3 text-slate-400" />
                      </div>
                      <span className="text-xs font-medium text-secondary">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-slate-400 font-mono">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-success">
                      <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
