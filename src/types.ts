import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: 'Digital' | 'Marketing' | 'CRM' | 'Mobile Banking' | 'APIs' | 'Wimpay' | 'IT' | 'Innovation';
  status: 'In Progress' | 'Planning' | 'Testing' | 'On Hold' | 'Live' | 'Blocked' | 'Pending';
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  progress: number;
  owner: string;
  ownerAvatar: string;
  dueDate: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Dept Manager' | 'User' | 'Auditor';
  status: 'Active' | 'Inactive';
  department: string;
  lastActive: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  lead: string;
  leadAvatar: string;
  projectsCount: number;
  membersCount: number;
  category: string;
}
