export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type JobStatus = 'Active' | 'Closed' | 'Draft' | 'Expired';

export interface Company {
  id: string;
  name: string;
  logo: string;
  cover: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  about: string;
  employees: string;
  founded: string;
  rating: number;
  openJobs: number;
  gallery: string[];
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  location: string;
  workMode: WorkMode;
  type: JobType;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  experience: string;
  category: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: Date;
  deadline: Date;
  status: JobStatus;
  applicants: number;
  recruiter: { name: string; title: string; email: string; phone: string };
  featured: boolean;
}

export interface Applicant {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  portfolio: string;
  resumeUrl: string;
  status: 'Pending' | 'Shortlisted' | 'Accepted' | 'Rejected';
  appliedAt: Date;
  match: number;
}

export interface Notification {
  id: string;
  type: 'application' | 'interview' | 'message' | 'system';
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  preview: string;
  time: Date;
  unread: number;
  online: boolean;
  messages: { id: string; senderId: string; text: string; time: Date }[];
}

export const categories = [
  { name: 'Technology', icon: 'Code2', count: 1240, color: 'primary' },
  { name: 'Design', icon: 'Palette', count: 540, color: 'accent' },
  { name: 'Marketing', icon: 'Megaphone', count: 420, color: 'success' },
  { name: 'Finance', icon: 'TrendingUp', count: 380, color: 'warning' },
  { name: 'Healthcare', icon: 'HeartPulse', count: 610, color: 'danger' },
  { name: 'Education', icon: 'GraduationCap', count: 290, color: 'success' },
  { name: 'Sales', icon: 'Target', count: 470, color: 'primary' },
  { name: 'Engineering', icon: 'Cog', count: 820, color: 'warning' },
];

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1614680376408-12c9e9c0c0e0?w=120&h=120&fit=crop&crop=entropy&q=80',
    cover: 'https://images.unsplash.com/photo-1551434678-e076cd227a23?w=1200&h=400&fit=crop&q=80',
    industry: 'Financial Technology',
    size: '5,000-10,000',
    location: 'San Francisco, CA',
    website: 'stripe.com',
    about: 'Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size use our software and APIs to accept payments, send payouts, and manage their businesses online.',
    employees: '8,000+',
    founded: '2010',
    rating: 4.8,
    openJobs: 12,
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366811353-687074ef1c14?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521737604896-3a936c1c4b84?w=600&h=400&fit=crop&q=80',
    ],
  },
  {
    id: 'c2',
    name: 'Figma',
    logo: 'https://images.unsplash.com/photo-1626785774573-4b39d6f6c9b0?w=120&h=120&fit=crop&crop=entropy&q=80',
    cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=400&fit=crop&q=80',
    industry: 'Design Software',
    size: '500-1,000',
    location: 'San Francisco, CA',
    website: 'figma.com',
    about: 'Figma is the all-in-one platform for designing digital products and experiences. Our mission is to make design accessible to everyone who builds products.',
    employees: '800+',
    founded: '2012',
    rating: 4.9,
    openJobs: 8,
    gallery: [
      'https://images.unsplash.com/photo-1531403009284-440f08096512?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
    ],
  },
  {
    id: 'c3',
    name: 'Airbnb',
    logo: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374a?w=120&h=120&fit=crop&crop=entropy&q=80',
    cover: 'https://images.unsplash.com/photo-1520250491319-1d366e98c0a4?w=1200&h=400&fit=crop&q=80',
    industry: 'Travel & Hospitality',
    size: '5,000-10,000',
    location: 'San Francisco, CA',
    website: 'airbnb.com',
    about: 'Airbnb is a community built on sharing. We connect people who have space to share with those looking for a place to stay.',
    employees: '6,500+',
    founded: '2008',
    rating: 4.6,
    openJobs: 15,
    gallery: [
      'https://images.unsplash.com/photo-1582610116397-edb818620e9e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop&q=80',
    ],
  },
  {
    id: 'c4',
    name: 'Notion',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&h=120&fit=crop&crop=entropy&q=80',
    cover: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&h=400&fit=crop&q=80',
    industry: 'Productivity Software',
    size: '200-500',
    location: 'San Francisco, CA',
    website: 'notion.so',
    about: 'Notion is the connected workspace where better, faster work happens. We are building the software that makes software disappear.',
    employees: '400+',
    founded: '2016',
    rating: 4.7,
    openJobs: 6,
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e44?w=600&h=400&fit=crop&q=80',
    ],
  },
  {
    id: 'c5',
    name: 'Shopify',
    logo: 'https://images.unsplash.com/photo-1567403414-1d3e0e0e0c0c?w=120&h=120&fit=crop&crop=entropy&q=80',
    cover: 'https://images.unsplash.com/photo-1556761175-5972dc5e10f3?w=1200&h=400&fit=crop&q=80',
    industry: 'E-commerce',
    size: '5,000-10,000',
    location: 'Ottawa, Canada',
    website: 'shopify.com',
    about: 'Shopify is a leading global commerce company providing tools to start, grow, market, and manage a retail business of any size.',
    employees: '11,000+',
    founded: '2006',
    rating: 4.5,
    openJobs: 20,
    gallery: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&q=80',
    ],
  },
  {
    id: 'c6',
    name: 'Vercel',
    logo: 'https://images.unsplash.com/photo-1622532337827-9c3a0d3e0c0c?w=120&h=120&fit=crop&crop=entropy&q=80',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop&q=80',
    industry: 'Developer Tools',
    size: '200-500',
    location: 'Remote',
    website: 'vercel.com',
    about: 'Vercel is the platform for frontend developers, providing the speed and reliability to instantly create, deploy, and update sites.',
    employees: '350+',
    founded: '2015',
    rating: 4.8,
    openJobs: 10,
    gallery: [
      'https://images.unsplash.com/photo-1600890458036-1d8e5471d7b9?w=600&h=400&fit=crop&q=80',
    ],
  },
];

const now = new Date('2026-08-01');
const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000);
const daysAhead = (n: number) => new Date(now.getTime() + n * 86400000);

export const jobs: Job[] = [
  {
    id: 'j1',
    title: 'Senior Frontend Engineer',
    companyId: 'c1',
    location: 'San Francisco, CA',
    workMode: 'Remote',
    type: 'Full-time',
    salaryMin: 140000,
    salaryMax: 200000,
    currency: 'USD',
    experience: '5+ years',
    category: 'Technology',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    description:
      'We are looking for a Senior Frontend Engineer to help build the next generation of our payment dashboard. You will work with a world-class team to create delightful, performant interfaces used by millions of businesses worldwide.',
    responsibilities: [
      'Lead the development of complex frontend features from design to deployment',
      'Collaborate with product managers and designers to ship exceptional UX',
      'Mentor junior engineers and drive frontend best practices',
      'Optimize application performance for scale and speed',
    ],
    requirements: [
      '5+ years of experience building production web applications',
      'Deep expertise in React and TypeScript',
      'Strong understanding of modern CSS and design systems',
      'Experience with performance optimization and accessibility',
      'Bachelor\'s degree in Computer Science or equivalent experience',
    ],
    benefits: ['Equity package', 'Health, dental, and vision insurance', 'Unlimited PTO', '$5k annual learning budget', 'Home office stipend'],
    postedAt: daysAgo(2),
    deadline: daysAhead(30),
    status: 'Active',
    applicants: 47,
    recruiter: { name: 'Sarah Chen', title: 'Senior Technical Recruiter', email: 'sarah.chen@stripe.com', phone: '+1 (415) 555-0142' },
    featured: true,
  },
  {
    id: 'j2',
    title: 'Product Designer',
    companyId: 'c2',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    salaryMin: 120000,
    salaryMax: 170000,
    currency: 'USD',
    experience: '3-5 years',
    category: 'Design',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Motion Design'],
    description:
      'Join Figma\'s design team to craft intuitive, beautiful experiences for millions of designers worldwide. You will own end-to-end design for key product areas.',
    responsibilities: [
      'Own design for major product surfaces end-to-end',
      'Conduct user research and translate insights into design decisions',
      'Maintain and evolve our design system',
      'Partner closely with engineering to ensure design quality at ship',
    ],
    requirements: [
      '3-5 years of product design experience',
      'Mastery of Figma and modern design tools',
      'Strong portfolio showcasing complex product work',
      'Experience with design systems and component libraries',
    ],
    benefits: ['Equity', 'Premium health coverage', 'Mental health days', 'Design tool budget', 'Conference attendance'],
    postedAt: daysAgo(5),
    deadline: daysAhead(25),
    status: 'Active',
    applicants: 89,
    recruiter: { name: 'Marcus Johnson', title: 'Design Recruiter', email: 'marcus@figma.com', phone: '+1 (415) 555-0188' },
    featured: true,
  },
  {
    id: 'j3',
    title: 'Full Stack Engineer',
    companyId: 'c3',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    salaryMin: 130000,
    salaryMax: 180000,
    currency: 'USD',
    experience: '4+ years',
    category: 'Technology',
    skills: ['Node.js', 'React', 'PostgreSQL', 'AWS', 'Docker'],
    description:
      'Build the systems that power Airbnb\'s global marketplace. You will work across the stack to deliver features that impact millions of hosts and guests.',
    responsibilities: [
      'Design and build full-stack features across web and backend',
      'Write clean, tested, and maintainable code',
      'Collaborate with cross-functional teams to ship impactful products',
      'Participate in code reviews and technical design discussions',
    ],
    requirements: [
      '4+ years of full-stack development experience',
      'Proficiency in Node.js and React',
      'Experience with PostgreSQL and cloud infrastructure',
      'Understanding of system design and scalability',
    ],
    benefits: ['Equity', 'Health benefits', 'Travel credit', 'Parental leave', 'Wellness stipend'],
    postedAt: daysAgo(1),
    deadline: daysAhead(40),
    status: 'Active',
    applicants: 62,
    recruiter: { name: 'Emily Rodriguez', title: 'Engineering Recruiter', email: 'emily.r@airbnb.com', phone: '+1 (415) 555-0199' },
    featured: true,
  },
  {
    id: 'j4',
    title: 'DevOps Engineer',
    companyId: 'c4',
    location: 'Remote',
    workMode: 'Remote',
    type: 'Full-time',
    salaryMin: 110000,
    salaryMax: 160000,
    currency: 'USD',
    experience: '3+ years',
    category: 'Engineering',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Python'],
    description:
      'Help us build and maintain the infrastructure that powers Notion\'s rapidly growing user base. You will own our deployment pipelines and cloud architecture.',
    responsibilities: [
      'Manage and optimize cloud infrastructure on AWS',
      'Build and maintain CI/CD pipelines',
      'Implement monitoring, alerting, and incident response',
      'Automate infrastructure provisioning with Terraform',
    ],
    requirements: [
      '3+ years of DevOps or SRE experience',
      'Deep knowledge of Kubernetes and container orchestration',
      'Experience with Infrastructure as Code (Terraform)',
      'Strong scripting skills (Python, Bash)',
    ],
    benefits: ['Remote-first culture', 'Equity', 'Health coverage', 'Learning budget', 'Home office setup'],
    postedAt: daysAgo(7),
    deadline: daysAhead(20),
    status: 'Active',
    applicants: 34,
    recruiter: { name: 'David Kim', title: 'Talent Acquisition', email: 'david@notion.so', phone: '+1 (415) 555-0177' },
    featured: false,
  },
  {
    id: 'j5',
    title: 'Growth Marketing Manager',
    companyId: 'c5',
    location: 'Ottawa, Canada',
    workMode: 'Hybrid',
    type: 'Full-time',
    salaryMin: 90000,
    salaryMax: 130000,
    currency: 'USD',
    experience: '4+ years',
    category: 'Marketing',
    skills: ['SEO', 'Content Marketing', 'Analytics', 'A/B Testing', 'HubSpot'],
    description:
      'Drive growth for Shopify\'s merchant acquisition. You will develop and execute data-driven marketing campaigns that reach entrepreneurs worldwide.',
    responsibilities: [
      'Develop and execute growth marketing strategies',
      'Manage multi-channel campaigns (SEO, paid, content, email)',
      'Analyze campaign performance and optimize for ROI',
      'Collaborate with product and sales teams on go-to-market',
    ],
    requirements: [
      '4+ years of growth marketing experience',
      'Strong analytical skills and experience with marketing analytics tools',
      'Track record of driving measurable growth',
      'Experience with A/B testing and conversion optimization',
    ],
    benefits: ['Equity', 'Health benefits', 'Flexible hours', 'Professional development', 'Wellness program'],
    postedAt: daysAgo(3),
    deadline: daysAhead(28),
    status: 'Active',
    applicants: 56,
    recruiter: { name: 'Lisa Wang', title: 'Marketing Recruiter', email: 'lisa@shopify.com', phone: '+1 (613) 555-0123' },
    featured: false,
  },
  {
    id: 'j6',
    title: 'Backend Engineer',
    companyId: 'c6',
    location: 'Remote',
    workMode: 'Remote',
    type: 'Full-time',
    salaryMin: 120000,
    salaryMax: 175000,
    currency: 'USD',
    experience: '3+ years',
    category: 'Engineering',
    skills: ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'Microservices'],
    description:
      'Build the core services that power Vercel\'s edge network. You will design and implement high-performance backend systems serving billions of requests.',
    responsibilities: [
      'Design and implement scalable backend services in Go',
      'Build and maintain high-performance APIs',
      'Optimize database performance and caching strategies',
      'Participate in on-call rotation and incident response',
    ],
    requirements: [
      '3+ years of backend engineering experience',
      'Proficiency in Go or similar systems language',
      'Experience with distributed systems and microservices',
      'Understanding of database optimization',
    ],
    benefits: ['Remote-first', 'Equity', 'Health coverage', 'Unlimited PTO', 'Equipment budget'],
    postedAt: daysAgo(4),
    deadline: daysAhead(35),
    status: 'Active',
    applicants: 41,
    recruiter: { name: 'Alex Turner', title: 'Engineering Manager', email: 'alex@vercel.com', phone: '+1 (415) 555-0166' },
    featured: true,
  },
  {
    id: 'j7',
    title: 'Data Scientist',
    companyId: 'c1',
    location: 'San Francisco, CA',
    workMode: 'On-site',
    type: 'Full-time',
    salaryMin: 130000,
    salaryMax: 190000,
    currency: 'USD',
    experience: '3+ years',
    category: 'Technology',
    skills: ['Python', 'SQL', 'Machine Learning', 'TensorFlow', 'Statistics'],
    description:
      'Join Stripe\'s data science team to build models that detect fraud, optimize payments, and improve user experience for businesses worldwide.',
    responsibilities: [
      'Build and deploy machine learning models for fraud detection',
      'Analyze large datasets to drive business decisions',
      'Collaborate with engineering to productionize models',
      'Communicate findings to stakeholders',
    ],
    requirements: [
      '3+ years of data science experience',
      'Advanced degree in CS, Statistics, or related field',
      'Strong Python and SQL skills',
      'Experience with ML frameworks (TensorFlow, PyTorch)',
    ],
    benefits: ['Equity', 'Health coverage', 'Research budget', 'Conference attendance', 'Unlimited PTO'],
    postedAt: daysAgo(6),
    deadline: daysAhead(22),
    status: 'Active',
    applicants: 73,
    recruiter: { name: 'Sarah Chen', title: 'Senior Technical Recruiter', email: 'sarah.chen@stripe.com', phone: '+1 (415) 555-0142' },
    featured: false,
  },
  {
    id: 'j8',
    title: 'UX Researcher',
    companyId: 'c2',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    salaryMin: 100000,
    salaryMax: 140000,
    currency: 'USD',
    experience: '2+ years',
    category: 'Design',
    skills: ['User Interviews', 'Usability Testing', 'Surveys', 'Data Analysis', 'Figma'],
    description:
      'Conduct research that shapes the future of Figma\'s products. You will work closely with designers and PMs to uncover user needs and validate solutions.',
    responsibilities: [
      'Plan and conduct qualitative and quantitative research',
      'Synthesize findings into actionable insights',
      'Present research to cross-functional teams',
      'Build a research repository for the org',
    ],
    requirements: [
      '2+ years of UX research experience',
      'Strong portfolio of research projects',
      'Experience with various research methodologies',
      'Excellent communication and presentation skills',
    ],
    benefits: ['Equity', 'Health coverage', 'Research tools budget', 'Conference attendance', 'Mental health support'],
    postedAt: daysAgo(8),
    deadline: daysAhead(18),
    status: 'Active',
    applicants: 38,
    recruiter: { name: 'Marcus Johnson', title: 'Design Recruiter', email: 'marcus@figma.com', phone: '+1 (415) 555-0188' },
    featured: false,
  },
  {
    id: 'j9',
    title: 'Mobile Engineer (iOS)',
    companyId: 'c3',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    salaryMin: 125000,
    salaryMax: 180000,
    currency: 'USD',
    experience: '4+ years',
    category: 'Technology',
    skills: ['Swift', 'SwiftUI', 'iOS', 'Combine', 'Architecture'],
    description:
      'Build the iOS app used by millions of Airbnb guests and hosts. You will own features end-to-end and craft beautiful, performant mobile experiences.',
    responsibilities: [
      'Develop and maintain Airbnb\'s iOS application',
      'Collaborate with design to implement pixel-perfect UI',
      'Optimize app performance and battery usage',
      'Write unit and UI tests',
    ],
    requirements: [
      '4+ years of iOS development experience',
      'Expert knowledge of Swift and SwiftUI',
      'Published apps on the App Store',
      'Understanding of mobile architecture patterns',
    ],
    benefits: ['Equity', 'Health coverage', 'Device budget', 'Travel credit', 'Parental leave'],
    postedAt: daysAgo(10),
    deadline: daysAhead(15),
    status: 'Active',
    applicants: 29,
    recruiter: { name: 'Emily Rodriguez', title: 'Engineering Recruiter', email: 'emily.r@airbnb.com', phone: '+1 (415) 555-0199' },
    featured: false,
  },
  {
    id: 'j10',
    title: 'Technical Writer',
    companyId: 'c4',
    location: 'Remote',
    workMode: 'Remote',
    type: 'Contract',
    salaryMin: 70,
    salaryMax: 90,
    currency: 'USD',
    experience: '2+ years',
    category: 'Technology',
    skills: ['Technical Writing', 'Markdown', 'API Documentation', 'Git', 'Docs-as-code'],
    description:
      'Write clear, comprehensive documentation for Notion\'s API and integrations. Help developers build on our platform with confidence.',
    responsibilities: [
      'Write and maintain API documentation',
      'Create tutorials and integration guides',
      'Review docs for accuracy and clarity',
      'Collaborate with engineering on new features',
    ],
    requirements: [
      '2+ years of technical writing experience',
      'Experience documenting APIs',
      'Familiarity with docs-as-code workflows',
      'Ability to read and understand code',
    ],
    benefits: ['Remote work', 'Flexible hours', 'Equipment stipend', 'Conference budget'],
    postedAt: daysAgo(12),
    deadline: daysAhead(10),
    status: 'Active',
    applicants: 18,
    recruiter: { name: 'David Kim', title: 'Talent Acquisition', email: 'david@notion.so', phone: '+1 (415) 555-0177' },
    featured: false,
  },
  {
    id: 'j11',
    title: 'Sales Development Representative',
    companyId: 'c5',
    location: 'Ottawa, Canada',
    workMode: 'On-site',
    type: 'Full-time',
    salaryMin: 50000,
    salaryMax: 75000,
    currency: 'USD',
    experience: '1+ year',
    category: 'Sales',
    skills: ['Sales', 'CRM', 'Cold Calling', 'Email Outreach', 'Lead Qualification'],
    description:
      'Be the first point of contact for Shopify Plus merchants. You will qualify leads, build pipeline, and partner with Account Executives to close deals.',
    responsibilities: [
      'Conduct outbound prospecting to generate qualified leads',
      'Manage inbound leads and qualify opportunities',
      'Maintain accurate CRM records',
      'Partner with AE\'s on account strategy',
    ],
    requirements: [
      '1+ year of sales or SDR experience',
      'Excellent communication skills',
      'Experience with CRM tools (HubSpot, Salesforce)',
      'Goal-oriented and self-motivated',
    ],
    benefits: ['Base + commission', 'Health benefits', 'Sales training', 'Career growth path', 'Team events'],
    postedAt: daysAgo(1),
    deadline: daysAhead(45),
    status: 'Active',
    applicants: 112,
    recruiter: { name: 'Lisa Wang', title: 'Marketing Recruiter', email: 'lisa@shopify.com', phone: '+1 (613) 555-0123' },
    featured: false,
  },
  {
    id: 'j12',
    title: 'Frontend Engineer Intern',
    companyId: 'c6',
    location: 'Remote',
    workMode: 'Remote',
    type: 'Internship',
    salaryMin: 8000,
    salaryMax: 10000,
    currency: 'USD',
    experience: '0-1 year',
    category: 'Technology',
    skills: ['React', 'JavaScript', 'CSS', 'Git', 'Learning'],
    description:
      'Join Vercel for a 12-week internship to build real features used by developers worldwide. You will be mentored by senior engineers and ship to production.',
    responsibilities: [
      'Build features for Vercel\'s dashboard under mentorship',
      'Participate in code reviews and team rituals',
      'Learn modern frontend development practices',
      'Present your work at the end of the internship',
    ],
    requirements: [
      'Currently enrolled in a CS or related program',
      'Basic knowledge of React and JavaScript',
      'Passion for learning and building',
      'Strong communication skills',
    ],
    benefits: ['Mentorship', 'Housing stipend', 'Return offer potential', 'Learning resources', 'Networking events'],
    postedAt: daysAgo(15),
    deadline: daysAhead(5),
    status: 'Active',
    applicants: 234,
    recruiter: { name: 'Alex Turner', title: 'Engineering Manager', email: 'alex@vercel.com', phone: '+1 (415) 555-0166' },
    featured: false,
  },
];

export const applicants: Applicant[] = [
  {
    id: 'a1',
    name: 'Jessica Williams',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=entropy&q=80',
    email: 'jessica.williams@email.com',
    phone: '+1 (415) 555-0101',
    location: 'San Francisco, CA',
    experience: '6 years',
    education: 'M.S. Computer Science, Stanford University',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS'],
    portfolio: 'jessicawilliams.dev',
    resumeUrl: '#',
    status: 'Shortlisted',
    appliedAt: daysAgo(1),
    match: 95,
  },
  {
    id: 'a2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=entropy&q=80',
    email: 'michael.chen@email.com',
    phone: '+1 (415) 555-0102',
    location: 'San Jose, CA',
    experience: '5 years',
    education: 'B.S. Computer Science, UC Berkeley',
    skills: ['React', 'JavaScript', 'Node.js', 'AWS', 'Docker'],
    portfolio: 'michaelchen.dev',
    resumeUrl: '#',
    status: 'Pending',
    appliedAt: daysAgo(2),
    match: 88,
  },
  {
    id: 'a3',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=entropy&q=80',
    email: 'priya.patel@email.com',
    phone: '+1 (415) 555-0103',
    location: 'San Francisco, CA',
    experience: '7 years',
    education: 'Ph.D. Human-Computer Interaction, MIT',
    skills: ['React', 'TypeScript', 'Figma', 'User Research', 'Design Systems'],
    portfolio: 'priyapatel.design',
    resumeUrl: '#',
    status: 'Accepted',
    appliedAt: daysAgo(3),
    match: 98,
  },
  {
    id: 'a4',
    name: 'James Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=entropy&q=80',
    email: 'james.rodriguez@email.com',
    phone: '+1 (415) 555-0104',
    location: 'Oakland, CA',
    experience: '4 years',
    education: 'B.S. Software Engineering, Cal Poly',
    skills: ['Vue.js', 'JavaScript', 'Python', 'PostgreSQL', 'Docker'],
    portfolio: 'jamesrodriguez.dev',
    resumeUrl: '#',
    status: 'Pending',
    appliedAt: daysAgo(4),
    match: 76,
  },
  {
    id: 'a5',
    name: 'Sarah Kim',
    avatar: 'https://images.unsplash.com/photo-1534583265-074c5c3c2d8e?w=120&h=120&fit=crop&crop=entropy&q=80',
    email: 'sarah.kim@email.com',
    phone: '+1 (415) 555-0105',
    location: 'San Francisco, CA',
    experience: '3 years',
    education: 'B.S. Computer Science, Carnegie Mellon',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Framer Motion'],
    portfolio: 'sarahkim.dev',
    resumeUrl: '#',
    status: 'Rejected',
    appliedAt: daysAgo(5),
    match: 72,
  },
  {
    id: 'a6',
    name: 'David Thompson',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=120&h=120&fit=crop&crop=entropy&q=80',
    email: 'david.thompson@email.com',
    phone: '+1 (415) 555-0106',
    location: 'Palo Alto, CA',
    experience: '8 years',
    education: 'M.S. Software Engineering, Stanford University',
    skills: ['React', 'TypeScript', 'Next.js', 'AWS', 'Kubernetes', 'GraphQL'],
    portfolio: 'davidthompson.dev',
    resumeUrl: '#',
    status: 'Shortlisted',
    appliedAt: daysAgo(1),
    match: 92,
  },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'application', title: 'Application Update', message: 'Your application for Senior Frontend Engineer at Stripe was shortlisted!', time: daysAgo(0), read: false },
  { id: 'n2', type: 'interview', title: 'Interview Invitation', message: 'You have an interview scheduled with Figma on Aug 5 at 2:00 PM.', time: daysAgo(0), read: false },
  { id: 'n3', type: 'message', title: 'New Message', message: 'Sarah Chen from Stripe sent you a message regarding your application.', time: daysAgo(1), read: false },
  { id: 'n4', type: 'application', title: 'Application Submitted', message: 'You applied for Full Stack Engineer at Airbnb.', time: daysAgo(2), read: true },
  { id: 'n5', type: 'system', title: 'Profile Updated', message: 'Your profile is now 85% complete. Add more details to increase visibility.', time: daysAgo(3), read: true },
  { id: 'n6', type: 'interview', title: 'Interview Reminder', message: 'Your interview with Vercel is tomorrow at 10:00 AM.', time: daysAgo(4), read: true },
];

export const messages: Message[] = [
  {
    id: 'm1',
    senderId: 'r1',
    senderName: 'Sarah Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=entropy&q=80',
    preview: 'Hi Jessica! We loved your application and would like to...',
    time: daysAgo(0),
    unread: 2,
    online: true,
    messages: [
      { id: 'msg1', senderId: 'r1', text: 'Hi Jessica! We loved your application for the Senior Frontend Engineer role.', time: daysAgo(0) },
      { id: 'msg2', senderId: 'r1', text: 'Would you be available for a quick call this week to discuss next steps?', time: daysAgo(0) },
    ],
  },
  {
    id: 'm2',
    senderId: 'r2',
    senderName: 'Marcus Johnson',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=entropy&q=80',
    preview: 'Thanks for your interest in the Product Designer role...',
    time: daysAgo(1),
    unread: 0,
    online: false,
    messages: [
      { id: 'msg3', senderId: 'r2', text: 'Thanks for your interest in the Product Designer role at Figma!', time: daysAgo(1) },
      { id: 'msg4', senderId: 'me', text: 'Thank you! I\'m very excited about the opportunity.', time: daysAgo(1) },
    ],
  },
  {
    id: 'm3',
    senderId: 'r3',
    senderName: 'Emily Rodriguez',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=entropy&q=80',
    preview: 'Your interview is confirmed for next Tuesday...',
    time: daysAgo(2),
    unread: 1,
    online: true,
    messages: [
      { id: 'msg5', senderId: 'r3', text: 'Your interview is confirmed for next Tuesday at 2 PM PT.', time: daysAgo(2) },
    ],
  },
];

export const testimonials = [
  {
    name: 'Alex Morgan',
    role: 'Software Engineer at Google',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=120&h=120&fit=crop&crop=entropy&q=80',
    text: 'HireHub helped me land my dream job at Google. The platform made it so easy to find relevant opportunities and track my applications in one place.',
  },
  {
    name: 'Sofia Garcia',
    role: 'Product Designer at Figma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=entropy&q=80',
    text: 'As a designer, I love how clean and intuitive HireHub is. I found my role at Figma within two weeks of joining. The application tracking is brilliant.',
  },
  {
    name: 'Ryan Foster',
    role: 'Engineering Manager at Stripe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=entropy&q=80',
    text: 'We\'ve hired 12 engineers through HireHub this year. The quality of candidates and the employer tools are unmatched. It\'s our go-to hiring platform.',
  },
];

export const faqs = [
  { q: 'Is HireHub free for job seekers?', a: 'Yes! HireHub is completely free for job seekers. You can browse jobs, apply, and track your applications at no cost. Create an account to get started.' },
  { q: 'How much does it cost for employers?', a: 'We offer flexible pricing plans for employers. Post your first job for free, then choose from our pay-per-post or subscription plans starting at $49/month.' },
  { q: 'Can I post both remote and on-site jobs?', a: 'Absolutely. When posting a job, you can specify the work mode as Remote, Hybrid, or On-site. Job seekers can filter by their preference.' },
  { q: 'How does the application tracking work?', a: 'Every application you submit is tracked in your dashboard. You\'ll see status updates, interview invitations, and messages from employers all in one place.' },
  { q: 'Do you offer any guarantees for employers?', a: 'Yes, if you don\'t receive any qualified applicants within 30 days, we\'ll repost your job for free. We\'re committed to helping you find the right talent.' },
];

export const stats = [
  { label: 'Active Jobs', value: '12,500+' },
  { label: 'Companies Hiring', value: '3,200+' },
  { label: 'Job Seekers', value: '850K+' },
  { label: 'Success Rate', value: '92%' },
];

export const userGrowthData = [
  { month: 'Jan', users: 420, employers: 120 },
  { month: 'Feb', users: 480, employers: 140 },
  { month: 'Mar', users: 550, employers: 165 },
  { month: 'Apr', users: 620, employers: 190 },
  { month: 'May', users: 710, employers: 220 },
  { month: 'Jun', users: 820, employers: 260 },
  { month: 'Jul', users: 950, employers: 310 },
  { month: 'Aug', users: 1100, employers: 380 },
];

export const topCategoriesData = [
  { name: 'Technology', value: 1240 },
  { name: 'Engineering', value: 820 },
  { name: 'Healthcare', value: 610 },
  { name: 'Design', value: 540 },
  { name: 'Sales', value: 470 },
  { name: 'Marketing', value: 420 },
];

export const adminUsers = [
  { id: 'u1', name: 'Jessica Williams', email: 'jessica.w@email.com', role: 'Job Seeker', status: 'Active', joined: daysAgo(30), avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=entropy&q=80' },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah.chen@stripe.com', role: 'Employer', status: 'Active', joined: daysAgo(60), avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=entropy&q=80' },
  { id: 'u3', name: 'Michael Chen', email: 'michael.c@email.com', role: 'Job Seeker', status: 'Active', joined: daysAgo(15), avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=entropy&q=80' },
  { id: 'u4', name: 'Marcus Johnson', email: 'marcus@figma.com', role: 'Employer', status: 'Active', joined: daysAgo(90), avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=entropy&q=80' },
  { id: 'u5', name: 'Priya Patel', email: 'priya.p@email.com', role: 'Job Seeker', status: 'Suspended', joined: daysAgo(45), avatar: 'https://images.unsplash.com/photo-1534583265-074c5c3c2d8e?w=80&h=80&fit=crop&crop=entropy&q=80' },
  { id: 'u6', name: 'Emily Rodriguez', email: 'emily.r@airbnb.com', role: 'Employer', status: 'Active', joined: daysAgo(120), avatar: 'https://images.unsplash.com/photo-1531403009284-440f08096512?w=80&h=80&fit=crop&crop=entropy&q=80' },
  { id: 'u7', name: 'David Kim', email: 'david@notion.so', role: 'Employer', status: 'Active', joined: daysAgo(75), avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=80&h=80&fit=crop&crop=entropy&q=80' },
  { id: 'u8', name: 'James Rodriguez', email: 'james.r@email.com', role: 'Job Seeker', status: 'Active', joined: daysAgo(10), avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=entropy&q=80' },
];

export const adminReports = [
  { id: 'r1', reporter: 'Jessica Williams', target: 'Fake Job Posting', reason: 'Scam', status: 'Pending', date: daysAgo(1) },
  { id: 'r2', reporter: 'Michael Chen', target: 'Inappropriate Message', reason: 'Harassment', status: 'Resolved', date: daysAgo(5) },
  { id: 'r3', reporter: 'Sarah Kim', target: 'Duplicate Listing', reason: 'Spam', status: 'Pending', date: daysAgo(2) },
  { id: 'r4', reporter: 'David Thompson', target: 'Misleading Salary', reason: 'False Information', status: 'Resolved', date: daysAgo(8) },
];

export const currentUser = {
  name: 'Jessica Williams',
  email: 'jessica.williams@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=entropy&q=80',
  role: 'Job Seeker' as 'Job Seeker' | 'Employer' | 'Admin',
  title: 'Senior Frontend Engineer',
  location: 'San Francisco, CA',
  bio: 'Frontend engineer with 6 years of experience building delightful, accessible web applications. Passionate about design systems, performance, and developer experience.',
  phone: '+1 (415) 555-0101',
  website: 'jessicawilliams.dev',
  education: [
    { school: 'Stanford University', degree: 'M.S. Computer Science', year: '2018' },
    { school: 'UC Berkeley', degree: 'B.S. Computer Science', year: '2016' },
  ],
  experience: [
    { company: 'Google', role: 'Frontend Engineer', duration: '2021 - Present', description: 'Building internal tools used by 10k+ Googlers. Led migration to React 18.' },
    { company: 'Airbnb', role: 'Frontend Engineer', duration: '2018 - 2021', description: 'Developed booking flows and host dashboard features.' },
  ],
  skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Framer Motion', 'Accessibility', 'Design Systems'],
  certifications: ['AWS Certified Developer', 'Google UX Design Certificate'],
  languages: ['English (Native)', 'Spanish (Intermediate)', 'Mandarin (Basic)'],
  social: { linkedin: 'linkedin.com/in/jessicawilliams', github: 'github.com/jessicawilliams', twitter: '@jessicawdev' },
};

export const employerCompany = {
  name: 'Stripe',
  logo: companies[0].logo,
  cover: companies[0].cover,
  industry: 'Financial Technology',
  size: '5,000-10,000',
  location: 'San Francisco, CA',
  website: 'stripe.com',
  about: companies[0].about,
};

export const employerStats = {
  activeJobs: 8,
  totalApplications: 412,
  shortlisted: 34,
  rejected: 120,
  interviewsScheduled: 12,
  hired: 5,
};

export const jobSeekerStats = {
  applications: 24,
  saved: 18,
  interviews: 3,
  offers: 1,
  profileViews: 156,
  profileCompletion: 85,
};

export const applicationTimeline = [
  { id: 't1', jobTitle: 'Senior Frontend Engineer', company: 'Stripe', status: 'Shortlisted', date: daysAgo(1), step: 'Application Reviewed' },
  { id: 't2', jobTitle: 'Product Designer', company: 'Figma', status: 'Interview', date: daysAgo(3), step: 'Phone Screen Scheduled' },
  { id: 't3', jobTitle: 'Full Stack Engineer', company: 'Airbnb', status: 'Applied', date: daysAgo(5), step: 'Application Submitted' },
  { id: 't4', jobTitle: 'Backend Engineer', company: 'Vercel', status: 'Rejected', date: daysAgo(10), step: 'Not Moving Forward' },
  { id: 't5', jobTitle: 'Data Scientist', company: 'Stripe', status: 'Offer', date: daysAgo(15), step: 'Offer Extended' },
];

export const upcomingInterviews = [
  { id: 'i1', jobTitle: 'Senior Frontend Engineer', company: 'Stripe', date: daysAhead(2), time: '2:00 PM', type: 'Technical Interview', mode: 'Video Call' },
  { id: 'i2', jobTitle: 'Product Designer', company: 'Figma', date: daysAhead(4), time: '10:00 AM', type: 'Portfolio Review', mode: 'On-site' },
  { id: 'i3', jobTitle: 'Full Stack Engineer', company: 'Airbnb', date: daysAhead(6), time: '3:30 PM', type: 'System Design', mode: 'Video Call' },
];
