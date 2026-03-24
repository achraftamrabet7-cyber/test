import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  Plus, 
  MoreVertical, 
  Edit3,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  ChevronRight,
  Download,
  UserPlus,
  User as UserIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useSocket, User } from '../contexts/SocketContext';

export const Projects: React.FC = () => {
  const { projects, users, teams, updateStatus, addProject, updateProject, isNewProjectModalOpen, setIsNewProjectModalOpen } = useSocket();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    department: 'All',
    priority: 'All',
    category: 'All'
  });

  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Digital Strategy',
    status: 'Planning',
    progress: 0,
    priority: 'Medium',
    department: 'Digital Strategy',
    deadline: '',
    assignedUsers: [] as string[],
    assignedTeam: ''
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newProject);
    setIsNewProjectModalOpen(false);
    setNewProject({
      title: '',
      category: 'Digital Strategy',
      status: 'Planning',
      progress: 0,
      priority: 'Medium',
      department: 'Digital Strategy',
      deadline: '',
      assignedUsers: [],
      assignedTeam: ''
    });
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      const { id, ...updates } = editingProject;
      updateProject(id, updates);
      setIsEditModalOpen(false);
      setEditingProject(null);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'All' || project.status === filters.status;
    const matchesDept = filters.department === 'All' || project.department === filters.department;
    const matchesPriority = filters.priority === 'All' || project.priority === filters.priority;
    const matchesCategory = filters.category === 'All' || project.category === filters.category;

    return matchesSearch && matchesStatus && matchesDept && matchesPriority && matchesCategory;
  });

  const getAssignedUsers = (userIds?: string[]) => {
    if (!userIds) return [];
    return users.filter(u => userIds.includes(u.id));
  };

  const getAssignedTeam = (teamId?: string) => {
    return teams.find(t => t.id === teamId);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-slate-500 mb-2 font-headline font-bold">
            <span>Repository</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">All Projects</span>
          </nav>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Global Project Portfolio</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-lg">Centralized oversight of all active and historical strategic initiatives across the sovereign banking layer.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" 
              placeholder="Search projects..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsNewProjectModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bna-gradient text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low p-4 rounded-xl mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="bg-white border-none text-[0.8125rem] font-medium rounded-md px-4 py-2 focus:ring-1 focus:ring-primary shadow-sm outline-none"
          >
            <option value="All">Status: All</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
          </select>
          <select 
            value={filters.department}
            onChange={(e) => setFilters({...filters, department: e.target.value})}
            className="bg-white border-none text-[0.8125rem] font-medium rounded-md px-4 py-2 focus:ring-1 focus:ring-primary shadow-sm outline-none"
          >
            <option value="All">Department: All</option>
            {Array.from(new Set(projects.map(p => p.department))).map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select 
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="bg-white border-none text-[0.8125rem] font-medium rounded-md px-4 py-2 focus:ring-1 focus:ring-primary shadow-sm outline-none"
          >
            <option value="All">Priority: All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <select 
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="bg-white border-none text-[0.8125rem] font-medium rounded-md px-4 py-2 focus:ring-1 focus:ring-primary shadow-sm outline-none"
          >
            <option value="All">Category: All</option>
            <option value="Digital Strategy">Digital Strategy</option>
            <option value="Marketing">Marketing</option>
            <option value="IT Infra">IT Infra</option>
            <option value="Risk Management">Risk Management</option>
          </select>
          <button 
            onClick={() => setFilters({ status: 'All', department: 'All', priority: 'All', category: 'All' })}
            className="text-xs font-bold text-primary uppercase tracking-widest px-2 hover:underline"
          >
            Clear Filters
          </button>
        </div>
        <button 
          onClick={() => alert('Exporting to Excel (Simulation)')}
          className="flex items-center gap-2 bg-white text-on-surface-variant px-4 py-2 rounded-md text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors border border-slate-200"
        >
          <Download className="w-4 h-4" />
          Export to Excel
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Project Name</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Status</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Progress</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Assigned</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Deadline</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">{project.title}</span>
                      <span className="text-xs text-secondary mt-0.5">{project.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <select 
                      value={project.status}
                      onChange={(e) => updateStatus(project.id, e.target.value)}
                      className={cn(
                        "text-[10px] font-bold px-3 py-1.5 rounded-full border-none outline-none cursor-pointer transition-all uppercase tracking-wider",
                        project.status === 'In Progress' ? "bg-primary/10 text-primary" :
                        project.status === 'Ongoing' ? "bg-success/10 text-success" :
                        project.status === 'Planning' ? "bg-warning/10 text-warning" :
                        project.status === 'Completed' ? "bg-blue-100 text-blue-700" :
                        "bg-slate-100 text-slate-600"
                      )}
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Review">Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bna-gradient rounded-full transition-all duration-1000" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-secondary">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        {getAssignedUsers(project.assignedUsers).map(user => (
                          <div key={user.id} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden" title={user.name}>
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      {project.assignedTeam && (
                        <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                          {getAssignedTeam(project.assignedTeam)?.name}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                      <Calendar className="w-3.5 h-3.5 opacity-40" />
                      {project.deadline}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => { setEditingProject(project); setIsEditModalOpen(true); }}
                      className="p-2 text-slate-300 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-headline font-bold text-on-surface">New Strategic Project</h3>
              <button onClick={() => setIsNewProjectModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddProject} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-2">
                <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Project Title</label>
                <input 
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  placeholder="e.g. Digital Wallet Integration" 
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Category</label>
                  <select 
                    value={newProject.category}
                    onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option>Digital Strategy</option>
                    <option>Marketing</option>
                    <option>IT Infra</option>
                    <option>Risk Management</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Priority</label>
                  <select 
                    value={newProject.priority}
                    onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Deadline</label>
                <input 
                  type="date"
                  required
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Assign Users</label>
                <div className="grid grid-cols-2 gap-2">
                  {users.map(user => (
                    <label key={user.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <input 
                        type="checkbox"
                        checked={newProject.assignedUsers.includes(user.id)}
                        onChange={(e) => {
                          const updated = e.target.checked 
                            ? [...newProject.assignedUsers, user.id]
                            : newProject.assignedUsers.filter(id => id !== user.id);
                          setNewProject({...newProject, assignedUsers: updated});
                        }}
                        className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary/20"
                      />
                      <span className="text-xs font-medium text-slate-600">{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Assign Team</label>
                <select 
                  value={newProject.assignedTeam}
                  onChange={(e) => setNewProject({...newProject, assignedTeam: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="">None</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bna-gradient text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModalOpen && editingProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-headline font-bold text-on-surface">Edit Project Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleUpdateProject} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-2">
                <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Project Title</label>
                <input 
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Progress (%)</label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    value={editingProject.progress}
                    onChange={(e) => setEditingProject({...editingProject, progress: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Deadline</label>
                  <input 
                    type="date"
                    required
                    value={editingProject.deadline}
                    onChange={(e) => setEditingProject({...editingProject, deadline: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Assign Users</label>
                <div className="grid grid-cols-2 gap-2">
                  {users.map(user => (
                    <label key={user.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <input 
                        type="checkbox"
                        checked={editingProject.assignedUsers?.includes(user.id)}
                        onChange={(e) => {
                          const current = editingProject.assignedUsers || [];
                          const updated = e.target.checked 
                            ? [...current, user.id]
                            : current.filter(id => id !== user.id);
                          setEditingProject({...editingProject, assignedUsers: updated});
                        }}
                        className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary/20"
                      />
                      <span className="text-xs font-medium text-slate-600">{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.6875rem] uppercase tracking-wider text-slate-400 font-bold">Assign Team</label>
                <select 
                  value={editingProject.assignedTeam}
                  onChange={(e) => setEditingProject({...editingProject, assignedTeam: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="">None</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bna-gradient text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsNewProjectModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bna-gradient text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50"
      >
        <Edit3 className="w-6 h-6" />
      </button>
    </div>
  );
};
