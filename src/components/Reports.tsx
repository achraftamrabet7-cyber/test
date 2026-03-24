import React from 'react';
import { 
  BarChart3, 
  Search, 
  Filter, 
  Download,
  ChevronRight,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../lib/utils';
import { useSocket } from '../contexts/SocketContext';

export const Reports: React.FC = () => {
  const { projects, users } = useSocket();

  // Data for Project Status Distribution
  const statusData = [
    { name: 'Planning', value: projects.filter(p => p.status === 'Planning').length },
    { name: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length },
    { name: 'Ongoing', value: projects.filter(p => p.status === 'Ongoing').length },
    { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length },
  ];

  const COLORS = ['#F59E0B', '#006B3F', '#10B981', '#3B82F6'];

  // Data for Departmental Resource Allocation
  const deptData = Array.from(new Set(users.map(u => u.department))).map(dept => ({
    name: dept,
    users: users.filter(u => u.department === dept).length,
    projects: projects.filter(p => p.department === dept).length
  }));

  // Simulated Performance Data
  const performanceData = [
    { month: 'Jan', performance: 85 },
    { month: 'Feb', performance: 88 },
    { month: 'Mar', performance: 92 },
    { month: 'Apr', performance: 90 },
    { month: 'May', performance: 95 },
    { month: 'Jun', performance: 98 },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-slate-500 mb-2 font-headline font-bold">
            <span>Analytics</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Performance Reports</span>
          </nav>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Sovereign Analytics</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-lg">Advanced data visualization and strategic performance metrics for the BNA ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Generating PDF Report (Simulation)')}
            className="flex items-center gap-2 px-4 py-2 bna-gradient text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Status Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <PieChartIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface">Project Portfolio Status</h3>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold rounded-lg px-3 py-1.5 outline-none">
              <option>Current Quarter</option>
              <option>Last Quarter</option>
              <option>Full Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {statusData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</p>
                  <p className="text-sm font-bold text-on-surface">{item.value} Projects</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Departmental Resource Allocation */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface">Resource Allocation</h3>
            </div>
            <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View Details</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="users" fill="#006B3F" radius={[4, 4, 0, 0]} name="Team Members" />
                <Bar dataKey="projects" fill="#10B981" radius={[4, 4, 0, 0]} name="Active Projects" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex items-center gap-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-primary"></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Team Members</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-success"></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Projects</span>
            </div>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface">Strategic Performance Trend</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-success bg-success/10 px-3 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">+12.5%</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006B3F" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#006B3F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#006B3F" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPerformance)" 
                  name="Efficiency %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
