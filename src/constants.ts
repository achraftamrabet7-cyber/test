import { Project, User, Team } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'BNA-2024-001',
    title: 'Wimpay QR Integration',
    category: 'Digital',
    status: 'In Progress',
    priority: 'Critical',
    progress: 75,
    owner: 'S. Boudiaf',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf_fEq2I71MsBYnQYLMKtqMr-MqDO6ONfD3IMNGR6_ATw8C1Kf2dw_d-jAeWPIZ0H8GBCZaJeH6j26TvYrcsUuEGDU0CdvsO49zJfDXvDhZG-CcL8-Yzm4VPHUht9o7MgJVF2I_Tc2h903OHCaklxJghQ-7q6hy4GkSOGY7arLNT3wgHbSkflYfxUBqsT2jfW6o64o44wyMB9K1slB0ReeITyQ-swcuUz0XACMyGokP7K5WMtsNElLslb1U5OwWjzVn2UAVVCVlni9',
    dueDate: 'Oct 24, 2024',
    description: 'Implementing full-stack QR code payment orchestration for BNA\'s mobile ecosystem.'
  },
  {
    id: 'BNA-2024-002',
    title: 'Mobile Banking v4.0',
    category: 'Digital',
    status: 'Blocked',
    priority: 'High',
    progress: 32,
    owner: 'L. Mansouri',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2rNAnbS7U-mOiGl1ap67EoZ-LX6yX--3lR9VUAAEPCCtzw7X35ztil72lUoUqch0koTASk7rgvvg0XDcz-cGP0xSjlYXWw7G6Wq0VmWDnBontQ_4SDxq9Xs1jYwucKCeoHS4QHrXQWgTIckn15eZ_Hax4HOYqwkNLNdwylFKQ7ass7r6GAK_2bIuNb0e0Qto6VeMZJV6om9PldYKXJ_8sV2LIpWyIDzfcXwu3Einp0WweY7ZGABgkorAx7LTCf5_SLFZMMwrGuGVR',
    dueDate: 'Nov 12, 2024',
    description: 'Major update to the mobile banking platform with new security features.'
  },
  {
    id: 'BNA-2024-003',
    title: 'Core Banking API Migration',
    category: 'IT',
    status: 'In Progress',
    priority: 'High',
    progress: 55,
    owner: 'M. Belkacem',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPn7P9jLoPxWOuJkOihpetbk8jJy8qUheVqX2s2-Ulyq5bSpulBLu3Ue1JFJVa25_-9MBtgOHrwku4ZBgkeKqK0S-9fIPKjRSkFQcJYhVpwIZKTs4P7w-niYD3HRbJa5CJetRexO20g83a2kwkR5qsanPvyc_fYcKz8IAtWy1wPhtTRsQlMIAZi-BZe1eXsJlhjTpLWSD59QND0pMMEfh-VK8T3XVjrtWMWt4rwokMsPEi1jPzNizmNHj8-mzxBfcsqNKtkG0VcvZl',
    dueDate: 'Dec 05, 2024',
    description: 'Migrating legacy APIs to a modern microservices architecture.'
  },
  {
    id: 'BNA-2024-004',
    title: 'Biometric Authentication Pilot',
    category: 'Innovation',
    status: 'Pending',
    priority: 'Medium',
    progress: 0,
    owner: 'Y. Kaci',
    ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDasSnM409lkJnzR7hkIvcZiBf_UmwDep1rusxO1R2QMbLyqHOJP4FCpy7xIB6354A0TQdwb2PgKomuIaGsKU8LAOR9Ti6mShq_VQgR77_Lx41rssBZgCK3hgLzGBqrBJlUQMxFC-NMPdJuuI1EEktjssfRE7sC-o9vUhz7VtLTlrFFe4iQqN9OmOFYFHbHM4wTRmBLOLYxTJSqh8m_3BUYRwLIokWG4kl1vtyfQWag6qj9YJN4biJjucxPp-Zqlc1-XkCICnq7XZPD',
    dueDate: 'Jan 15, 2025',
    description: 'Testing facial recognition and fingerprint auth for internal systems.'
  }
];

export const USERS: User[] = [
  {
    id: '1',
    name: 'Sofiane Meziane',
    email: 's.meziane@bna.dz',
    role: 'Administrator',
    status: 'Active',
    department: 'IT Operations',
    lastActive: 'Today, 09:14 AM'
  },
  {
    id: '2',
    name: 'Leila Hamidi',
    email: 'l.hamidi@bna.dz',
    role: 'Dept Manager',
    status: 'Active',
    department: 'Corporate Banking',
    lastActive: 'Yesterday, 04:30 PM'
  },
  {
    id: '3',
    name: 'Amine Benali',
    email: 'a.benali@bna.dz',
    role: 'User',
    status: 'Inactive',
    department: 'Treasury',
    lastActive: '12 Oct 2023'
  }
];

export const TEAMS: Team[] = [
  {
    id: '1',
    name: 'Digital Banking',
    lead: 'Sarah Chen',
    leadAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy_1pLb-qzfiQSHDlWKomibSrYrGZbEYsjLk7KvQa2TUy0H9sS9R7RwetLSRZhs0Dvrt3FIFCRfwrQH0wCMHHoQoD-9yutptV5N52uZhZ1OZ3msWMweUugmYysec_b1fOg0BJqaFix-sEOfgOvaeXu_ArmLOyiTV4OzGBCCjdb0dwXG0y4ZPfnFhQivtzJGryy73jbl7jxliFMDhVoZSIZjkhF_9c1s_ItTOoJWB5W3FIZS6NMRNqnC90hgPXzRAwVBf-7CtHbHu_k',
    projectsCount: 8,
    membersCount: 24,
    category: 'Internal Tech'
  },
  {
    id: '2',
    name: 'Marketing',
    lead: 'Karim Mahmoud',
    leadAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFrD1pyvA6pvR2M8wgziaVSsCqkuHh059kCt1BCMSjnApcndH_D2IRVPFcKlqNdPv_J9JvvUMOegXYiPScFcBPu6Sh7of1Wy-JsxNzNX061Nq-ewNF2Y_lTRnECz_idmOtxfjAwSkV2u2yI7Yc3JPXKLtuqHSMdr-KX_V-DelX466lK49O1PK3dc-idNG_hItRqQdjGZBX4PfVS1WTNys1MrZaNCukcREoe4vM__tOe_yiiInBPEw3rHq4v0BDfbX4mieksCiRYXZO',
    projectsCount: 4,
    membersCount: 12,
    category: 'Growth & Comms'
  }
];
