import { createContext, useContext, useState, type ReactNode } from 'react';

export type Role = 'Job Seeker' | 'Employer' | 'Admin';

interface RoleCtx {
  role: Role;
  setRole: (r: Role) => void;
}

const RoleContext = createContext<RoleCtx>({ role: 'Job Seeker', setRole: () => {} });

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('Job Seeker');
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export const useRole = () => useContext(RoleContext);
