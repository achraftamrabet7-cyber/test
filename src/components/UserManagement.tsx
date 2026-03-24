import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Shield, 
  Mail, 
  Building2, 
  Activity,
  Edit,
  Lock,
  UserX,
  FileText,
  History,
  X,
  ShieldAlert,
  FolderKanban,
  Download,
  TrendingUp,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useSocket, User, AuditLog } from '../contexts/SocketContext';

export const UserManagement: React.FC = () => {
  const { users, auditLogs, addUser } = useSocket();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'User',
    department: 'Digital Banking'
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(newUserData);
    setIsAddUserModalOpen(false);
    setNewUserData({ name: '', email: '', role: 'User', department: 'Digital Banking' });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">User Management</h2>
          <p className="text-secondary mt-1">Manage system access, roles, and security protocols.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAuditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
          >
            <History className="w-4 h-4" />
            Audit History
          </button>
          <button 
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bna-gradient text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            Add New User
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Staff', value: users.length.toString(), change: 'System users', icon: Users, color: 'border-primary' },
          { label: 'Active Now', value: users.filter(u => u.status === 'Active').length.toString(), change: 'Online status', icon: Activity, color: 'border-blue-400' },
          { label: 'Admins', value: users.filter(u => u.role === 'Administrator').length.toString(), change: 'Privileged access', icon: Shield, color: 'border-orange-400' },
          { label: 'Security Logs', value: auditLogs.filter(l => l.type === 'security').length.toString(), change: 'Recent events', icon: Lock, color: 'border-slate-400' },
        ].map((stat, i) => (
          <div key={i} className={cn("bg-white p-6 rounded-xl shadow-sm border-b-4", stat.color)}>
            <div className="text-slate-400 text-xs font-headline font-bold uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="text-3xl font-headline font-extrabold text-on-surface">{stat.value}</div>
            <div className="flex items-center gap-1 text-primary text-xs mt-2 font-medium">
              <stat.icon className="w-3 h-3" />
              {stat.change}
            </div>
          </div>
        ))}
      </section>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name, email, or department..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-100">
              <Filter className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert('Exporting user log...')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-100"
            >
              <Download className="w-4 h-4" />
              Export Log
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-on-surface-variant">
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider font-bold">User Entity</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider font-bold">Role Configuration</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider font-bold">System Status</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider font-bold">Audit Log</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-on-surface">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Shield className={cn(
                          "w-3.5 h-3.5",
                          user.role === 'Administrator' ? "text-orange-500" : "text-blue-500"
                        )} />
                        <span className="text-xs font-medium text-slate-700">{user.role}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] text-secondary uppercase tracking-tighter">{user.department}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full", user.status === 'Active' ? "bg-primary shadow-[0_0_8px_rgba(0,105,83,0.4)]" : "bg-slate-300")}></span>
                      <span className="text-sm font-medium">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">{user.lastActive}</div>
                    <div className="text-[10px] text-slate-300">IP: 197.200.15.42</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => alert(`Editing user: ${user.name}`)}
                        className="p-2 hover:text-primary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => alert(`Locking account: ${user.name}`)}
                        className="p-2 hover:text-orange-500 transition-colors"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => alert(`Deactivating user: ${user.name}`)}
                        className="p-2 hover:text-error transition-colors"
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bna-gradient flex items-center justify-center text-white">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary font-headline">Add New User</h3>
                  <p className="text-xs text-secondary">Create a new system account</p>
                </div>
              </div>
              <button onClick={() => setIsAddUserModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="e.g. Jean Dupont"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="email@bna.dz"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({...newUserData, role: e.target.value})}
                  >
                    <option>User</option>
                    <option>Dept Manager</option>
                    <option>Administrator</option>
                    <option>Auditor</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    value={newUserData.department}
                    onChange={(e) => setNewUserData({...newUserData, department: e.target.value})}
                  >
                    <option>Digital Banking</option>
                    <option>Marketing</option>
                    <option>IT Operations</option>
                    <option>Risk Management</option>
                    <option>Sovereign Layer</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bna-gradient text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-md"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit History Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary font-headline">System Audit Logs</h3>
                  <p className="text-xs text-secondary">Real-time security and operational tracking</p>
                </div>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-0 max-h-[60vh] overflow-y-auto">
              <div className="divide-y divide-slate-50">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors flex gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      log.type === 'security' ? "bg-red-100 text-red-600" :
                      log.type === 'project' ? "bg-blue-100 text-blue-600" :
                      log.type === 'user' ? "bg-green-100 text-green-600" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {log.type === 'security' ? <ShieldAlert className="w-5 h-5" /> :
                       log.type === 'project' ? <FolderKanban className="w-5 h-5" /> :
                       log.type === 'user' ? <UserPlus className="w-5 h-5" /> :
                       <Activity className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-sm font-bold text-primary">{log.action}</h5>
                        <span className="text-[0.625rem] text-slate-400 font-medium">{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-secondary mb-2">{log.details}</p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-slate-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${log.user}`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[0.6875rem] font-bold text-slate-600">{log.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setIsAuditModalOpen(false)}
                className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
