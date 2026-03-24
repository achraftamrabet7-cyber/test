import React from 'react';
import { 
  TrendingUp, 
  Smartphone, 
  Megaphone, 
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useSocket } from '../contexts/SocketContext';

import { useNavigation } from '../contexts/NavigationContext';

export const Dashboard: React.FC = () => {
  const { projects } = useSocket();
  const { setActiveTab } = useNavigation();

  const totalProjects = projects.length;
  const digitalProjects = projects.filter(p => p.category === 'Digital Strategy').length;
  const marketingProjects = projects.filter(p => p.category === 'Marketing').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;

  const stats = [
    { label: 'Total Projects', value: totalProjects.toString(), change: '+2 from last month', icon: TrendingUp, color: 'text-primary' },
    { label: 'Digital Projects', value: digitalProjects.toString(), change: '58% of total volume', icon: Smartphone, color: 'text-blue-600' },
    { label: 'Marketing Projects', value: marketingProjects.toString(), change: 'Critical priority: 3', icon: Megaphone, color: 'text-orange-600' },
    { label: 'Completed', value: completedProjects.toString(), change: 'Q3 targets achieved', icon: CheckCircle2, color: 'text-green-600' },
  ];

  const deadlines = projects
    .filter(p => p.status !== 'Completed')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3)
    .map(p => ({
      date: new Date(p.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      title: p.title,
      dept: p.department,
      time: '11:59 PM',
      color: p.priority === 'Critical' ? 'border-error' : p.priority === 'High' ? 'border-orange-400' : 'border-primary'
    }));

  return (
    <div className="p-8 space-y-10">
      <section className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-on-surface font-headline font-extrabold text-4xl tracking-tight">Project Overview</h2>
          <p className="text-on-surface-variant font-body">Welcome back. Here is the sovereign state of your current operations.</p>
        </div>
        <div className="flex gap-2">
          {['Marketing', 'Digital Banking', 'DMI', 'DDEP'].map((cat) => (
            <button 
              key={cat}
              onClick={() => alert(`Filtering by ${cat} (Simulation)`)}
              className="px-4 py-1.5 bg-surface-container-highest rounded-full text-[0.6875rem] font-headline font-bold uppercase tracking-widest text-on-surface-variant hover:bg-primary hover:text-white transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <stat.icon className="w-16 h-16" />
            </div>
            <p className="text-[0.6875rem] font-headline font-bold uppercase tracking-wider text-slate-500 mb-1">{stat.label}</p>
            <p className="text-4xl font-headline font-extrabold text-on-surface">{stat.value}</p>
            <div className={cn("mt-4 flex items-center gap-1 text-[0.75rem] font-medium", stat.color)}>
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-headline text-xl font-bold">Performance Analytics</h3>
              <p className="text-sm text-on-surface-variant">Overall progress against quarterly roadmap</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-headline font-extrabold text-primary">82%</span>
              <p className="text-[0.6875rem] font-headline font-bold uppercase text-slate-500">Efficiency Score</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Project Completion Rate</span>
                <span className="text-primary">68%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bna-gradient rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Resource Allocation</span>
                <span className="text-primary">91%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bna-gradient rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-100">
              <div className="text-center">
                <p className="text-2xl font-bold font-headline">4.2d</p>
                <p className="text-[0.6rem] font-headline font-bold uppercase text-slate-500">Avg Lead Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold font-headline">18</p>
                <p className="text-[0.6rem] font-headline font-bold uppercase text-slate-500">Active Sprints</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold font-headline">96%</p>
                <p className="text-[0.6rem] font-headline font-bold uppercase text-slate-500">Uptime Metric</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-xl flex flex-col border border-slate-200">
          <h3 className="font-headline text-xl font-bold mb-6">Upcoming Deadlines</h3>
          <div className="space-y-4 flex-1">
            {deadlines.length > 0 ? deadlines.map((d, i) => (
              <div key={i} className={cn("flex gap-4 p-4 bg-white rounded-lg border-l-4 shadow-sm", d.color)}>
                <div className="flex flex-col items-center justify-center min-w-[3rem] bg-slate-50 rounded py-1">
                  <span className="text-[0.6rem] font-headline font-bold uppercase text-slate-400">{d.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold">{d.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold truncate max-w-[150px]">{d.title}</h4>
                  <p className="text-[0.75rem] text-on-surface-variant">{d.dept} • {d.time}</p>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Calendar className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">No upcoming deadlines</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => alert('Viewing full schedule (Simulation)')}
            className="w-full mt-6 py-2 text-[0.6875rem] font-headline font-bold uppercase tracking-widest text-primary border border-primary/20 rounded hover:bg-primary hover:text-white transition-all"
          >
            View All Schedule
          </button>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-2xl font-bold">Recent Projects</h3>
          <button 
            onClick={() => setActiveTab('projects')}
            className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
          >
            Explore Full Directory
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="px-6 py-4 rounded-l-xl text-[0.6875rem] font-headline font-bold uppercase tracking-wider text-slate-600">Project Name</th>
                <th className="px-6 py-4 text-[0.6875rem] font-headline font-bold uppercase tracking-wider text-slate-600">Status</th>
                <th className="px-6 py-4 text-[0.6875rem] font-headline font-bold uppercase tracking-wider text-slate-600">Priority</th>
                <th className="px-6 py-4 text-[0.6875rem] font-headline font-bold uppercase tracking-wider text-slate-600">Category</th>
                <th className="px-6 py-4 rounded-r-xl text-[0.6875rem] font-headline font-bold uppercase tracking-wider text-slate-600">Progress</th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm">
              {projects.slice(0, 5).map((p) => (
                <tr key={p.id} className="bg-white hover:bg-slate-50 transition-colors cursor-pointer group shadow-sm">
                  <td className="px-6 py-5 rounded-l-xl font-bold text-on-surface">{p.title}</td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[0.625rem] font-bold uppercase tracking-wider",
                      p.status === 'In Progress' ? "bg-green-100 text-green-700" : 
                      p.status === 'Completed' ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className={cn("w-2 h-2 rounded-full", p.priority === 'Critical' ? "bg-error" : "bg-secondary")}></span>
                      {p.priority}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-on-surface-variant">{p.category}</td>
                  <td className="px-6 py-5 rounded-r-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${p.progress}%` }}></div>
                      </div>
                      <span className="text-[0.6875rem] font-bold">{p.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
