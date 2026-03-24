import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  progress: number;
  priority: string;
  department: string;
  deadline: string;
  assignedUsers?: string[];
  assignedTeam?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastActive: string;
  avatar: string;
}

export interface Team {
  id: string;
  name: string;
  department: string;
  members: string[];
  description: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  type: 'security' | 'project' | 'user' | 'system';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
}

interface SocketContextType {
  projects: Project[];
  users: User[];
  teams: Team[];
  auditLogs: AuditLog[];
  notifications: Notification[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  updateStatus: (projectId: string, status: string) => void;
  addUser: (user: Omit<User, 'id' | 'lastActive' | 'status' | 'avatar'>) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  createTeam: (team: Omit<Team, 'id'>) => void;
  markRead: (notificationId: string) => void;
  clearNotifications: () => void;
  isConnected: boolean;
  isNewProjectModalOpen: boolean;
  setIsNewProjectModalOpen: (isOpen: boolean) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}`);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);

      switch (data.type) {
        case 'INIT':
          setProjects(data.projects);
          setNotifications(data.notifications);
          setUsers(data.users);
          setAuditLogs(data.auditLogs);
          setTeams(data.teams || []);
          break;
        case 'PROJECT_ADDED':
          setProjects(prev => [...prev, data.project]);
          setNotifications(prev => [data.notification, ...prev]);
          setAuditLogs(prev => [data.auditLog, ...prev]);
          break;
        case 'PROJECT_UPDATED':
          setProjects(prev => prev.map(p => p.id === data.projectId ? { ...p, ...data.updates } : p));
          setAuditLogs(prev => [data.auditLog, ...prev]);
          break;
        case 'STATUS_UPDATED':
          setProjects(prev => prev.map(p => p.id === data.projectId ? { ...p, status: data.status } : p));
          setNotifications(prev => [data.notification, ...prev]);
          setAuditLogs(prev => [data.auditLog, ...prev]);
          break;
        case 'TEAM_CREATED':
          setTeams(prev => [...prev, data.team]);
          setAuditLogs(prev => [data.auditLog, ...prev]);
          break;
        case 'USER_ADDED':
          setUsers(prev => [...prev, data.user]);
          setAuditLogs(prev => [data.auditLog, ...prev]);
          break;
        case 'USER_UPDATED':
          setUsers(prev => prev.map(u => u.id === data.userId ? { ...u, ...data.updates } : u));
          setAuditLogs(prev => [data.auditLog, ...prev]);
          break;
        case 'NOTIFICATIONS_UPDATED':
          setNotifications(data.notifications);
          break;
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'ADD_PROJECT', project }));
    }
  }, [socket]);

  const updateProject = useCallback((projectId: string, updates: Partial<Project>) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'UPDATE_PROJECT', projectId, updates }));
    }
  }, [socket]);

  const updateStatus = useCallback((projectId: string, status: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'UPDATE_STATUS', projectId, status }));
    }
  }, [socket]);

  const addUser = useCallback((user: Omit<User, 'id' | 'lastActive' | 'status' | 'avatar'>) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'ADD_USER', user }));
    }
  }, [socket]);

  const updateUser = useCallback((userId: string, updates: Partial<User>) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'UPDATE_USER', userId, updates }));
    }
  }, [socket]);

  const createTeam = useCallback((team: Omit<Team, 'id'>) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'CREATE_TEAM', team }));
    }
  }, [socket]);

  const markRead = useCallback((notificationId: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'MARK_READ', notificationId }));
    }
  }, [socket]);

  const clearNotifications = useCallback(() => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'CLEAR_NOTIFICATIONS' }));
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ 
      projects, 
      users,
      teams,
      auditLogs,
      notifications, 
      addProject, 
      updateProject,
      updateStatus, 
      addUser,
      updateUser,
      createTeam,
      markRead, 
      clearNotifications, 
      isConnected, 
      isNewProjectModalOpen, 
      setIsNewProjectModalOpen 
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
