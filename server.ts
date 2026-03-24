import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const PORT = 3000;

// Initial state
let projects = [
  { id: '1', title: 'Mobile Banking Redesign', category: 'Digital Strategy', status: 'In Progress', progress: 65, priority: 'High', department: 'Digital Strategy', deadline: '2026-05-15', assignedUsers: ['1'], assignedTeam: '' },
  { id: '2', title: 'BNA App Marketing Campaign', category: 'Marketing', status: 'Ongoing', progress: 40, priority: 'Medium', department: 'Marketing & Communication', deadline: '2026-04-20', assignedUsers: ['2'], assignedTeam: '1' },
  { id: '3', title: 'Cloud Infrastructure Migration', category: 'IT Infra', status: 'Planning', progress: 15, priority: 'Critical', department: 'IT Infrastructure', deadline: '2026-08-10', assignedUsers: ['3'], assignedTeam: '' },
  { id: '4', title: 'Risk Assessment Framework', category: 'Risk Management', status: 'Review', progress: 90, priority: 'High', department: 'Risk Management', deadline: '2026-03-30', assignedUsers: ['4'], assignedTeam: '' },
];

let users = [
  { id: '1', name: 'Achraf Tamrabet', email: 'achraf.t@bna.dz', role: 'Administrator', department: 'Sovereign Layer', status: 'Active', lastActive: 'Just now', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Sami Benali', email: 'sami.b@bna.dz', role: 'Dept Manager', department: 'Digital Banking', status: 'Active', lastActive: '12 mins ago', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Lina Mansouri', email: 'lina.m@bna.dz', role: 'User', department: 'Marketing', status: 'Active', lastActive: '1 hour ago', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Karim Ziane', email: 'karim.z@bna.dz', role: 'User', department: 'IT Operations', status: 'Inactive', lastActive: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=4' },
];

let teams = [
  { id: '1', name: 'Digital Transformation', department: 'Digital Strategy', members: ['1', '2'], description: 'Core team for digital banking initiatives.' },
  { id: '2', name: 'Security Taskforce', department: 'IT Infrastructure', members: ['1', '4'], description: 'Ensuring sovereign layer integrity.' },
];

let auditLogs = [
  { id: '1', action: 'User Login', user: 'Achraf Tamrabet', timestamp: '2026-03-24T10:00:00Z', details: 'Successful login from 197.200.15.42', type: 'security' },
  { id: '2', action: 'Project Created', user: 'Achraf Tamrabet', timestamp: '2026-03-24T10:15:00Z', details: 'Created project "Mobile Banking Redesign"', type: 'project' },
  { id: '3', action: 'Status Update', user: 'Sami Benali', timestamp: '2026-03-24T11:30:00Z', details: 'Updated "BNA App Marketing Campaign" to Ongoing', type: 'project' },
];

let notifications: any[] = [
  { id: '1', title: 'New Project Assigned', message: 'You have been added to the Cloud Migration project.', time: '2 mins ago', read: false, type: 'assignment' },
  { id: '2', title: 'Status Update', message: 'Mobile Banking Redesign progress reached 65%.', time: '1 hour ago', read: true, type: 'update' },
];

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  app.use(express.json());

  // Broadcast to all clients
  const broadcast = (data: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Send initial state
    ws.send(JSON.stringify({ type: 'INIT', projects, notifications, users, auditLogs, teams }));

    ws.on('message', (message) => {
      const data = JSON.parse(message.toString());
      
      switch (data.type) {
        case 'ADD_PROJECT':
          const newProject = { 
            ...data.project, 
            id: Math.random().toString(36).substr(2, 9),
            assignedUsers: data.project.assignedUsers || [],
            assignedTeam: data.project.assignedTeam || ''
          };
          projects.push(newProject);
          
          const addProjectLog = {
            id: Math.random().toString(36).substr(2, 9),
            action: 'Project Created',
            user: 'Achraf Tamrabet',
            timestamp: new Date().toISOString(),
            details: `Created project "${newProject.title}"`,
            type: 'project'
          };
          auditLogs.unshift(addProjectLog);

          const addNotification = {
            id: Math.random().toString(36).substr(2, 9),
            title: 'New Project Added',
            message: `"${newProject.title}" has been added to the Sovereign Layer.`,
            time: 'Just now',
            read: false,
            type: 'new_project'
          };
          notifications.unshift(addNotification);
          
          broadcast({ type: 'PROJECT_ADDED', project: newProject, notification: addNotification, auditLog: addProjectLog });
          break;

        case 'UPDATE_PROJECT':
          const pIndex = projects.findIndex(p => p.id === data.projectId);
          if (pIndex !== -1) {
            projects[pIndex] = { ...projects[pIndex], ...data.updates };
            
            const updateLog = {
              id: Math.random().toString(36).substr(2, 9),
              action: 'Project Updated',
              user: 'Achraf Tamrabet',
              timestamp: new Date().toISOString(),
              details: `Updated details for project "${projects[pIndex].title}"`,
              type: 'project'
            };
            auditLogs.unshift(updateLog);

            broadcast({ 
              type: 'PROJECT_UPDATED', 
              projectId: data.projectId, 
              updates: data.updates,
              auditLog: updateLog
            });
          }
          break;

        case 'UPDATE_STATUS':
          const projectIndex = projects.findIndex(p => p.id === data.projectId);
          if (projectIndex !== -1) {
            const oldStatus = projects[projectIndex].status;
            projects[projectIndex].status = data.status;
            
            const statusLog = {
              id: Math.random().toString(36).substr(2, 9),
              action: 'Status Update',
              user: 'Achraf Tamrabet',
              timestamp: new Date().toISOString(),
              details: `Updated "${projects[projectIndex].title}" status to ${data.status}`,
              type: 'project'
            };
            auditLogs.unshift(statusLog);

            const statusNotification = {
              id: Math.random().toString(36).substr(2, 9),
              title: 'Project Status Changed',
              message: `"${projects[projectIndex].title}" status changed from ${oldStatus} to ${data.status}.`,
              time: 'Just now',
              read: false,
              type: 'status_change'
            };
            notifications.unshift(statusNotification);
            
            broadcast({ 
              type: 'STATUS_UPDATED', 
              projectId: data.projectId, 
              status: data.status, 
              notification: statusNotification,
              auditLog: statusLog
            });
          }
          break;

        case 'CREATE_TEAM':
          const newTeam = { 
            ...data.team, 
            id: Math.random().toString(36).substr(2, 9) 
          };
          teams.push(newTeam);
          
          const createTeamLog = {
            id: Math.random().toString(36).substr(2, 9),
            action: 'Team Created',
            user: 'Achraf Tamrabet',
            timestamp: new Date().toISOString(),
            details: `Created team "${newTeam.name}" in ${newTeam.department}`,
            type: 'user'
          };
          auditLogs.unshift(createTeamLog);

          broadcast({ type: 'TEAM_CREATED', team: newTeam, auditLog: createTeamLog });
          break;

        case 'UPDATE_USER':
          const uIndex = users.findIndex(u => u.id === data.userId);
          if (uIndex !== -1) {
            users[uIndex] = { ...users[uIndex], ...data.updates };
            
            const userUpdateLog = {
              id: Math.random().toString(36).substr(2, 9),
              action: 'User Updated',
              user: 'Achraf Tamrabet',
              timestamp: new Date().toISOString(),
              details: `Updated account for "${users[uIndex].name}"`,
              type: 'user'
            };
            auditLogs.unshift(userUpdateLog);

            broadcast({ type: 'USER_UPDATED', userId: data.userId, updates: data.updates, auditLog: userUpdateLog });
          }
          break;

        case 'ADD_USER':
          const newUser = { 
            ...data.user, 
            id: Math.random().toString(36).substr(2, 9),
            lastActive: 'Never',
            status: 'Active',
            avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
          };
          users.push(newUser);
          
          const addUserLog = {
            id: Math.random().toString(36).substr(2, 9),
            action: 'User Created',
            user: 'Achraf Tamrabet',
            timestamp: new Date().toISOString(),
            details: `Created user "${newUser.name}" (${newUser.role})`,
            type: 'user'
          };
          auditLogs.unshift(addUserLog);

          broadcast({ type: 'USER_ADDED', user: newUser, auditLog: addUserLog });
          break;

        case 'MARK_READ':
          notifications = notifications.map(n => n.id === data.notificationId ? { ...n, read: true } : n);
          broadcast({ type: 'NOTIFICATIONS_UPDATED', notifications });
          break;
          
        case 'CLEAR_NOTIFICATIONS':
          notifications = [];
          broadcast({ type: 'NOTIFICATIONS_UPDATED', notifications });
          break;
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
