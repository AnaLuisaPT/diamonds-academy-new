import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Settings, Users, UserPlus } from 'lucide-react';

interface DashboardNavProps {
  activeTab: string;
  pendingCount: number;
}

const NavLink = ({ href, isActive, children }: { href: string; isActive: boolean; children: React.ReactNode }) => (
  <Link
    href={href}
    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-violet-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {children}
  </Link>
);

export default function DashboardNav({ activeTab, pendingCount }: DashboardNavProps) {
  return (
    <nav className="flex flex-wrap gap-2 md:gap-4 p-2 bg-white rounded-lg shadow-sm border">
      {/* (CORREGIDO) Añadimos '/dashboard' a todas las rutas */}
      <NavLink href="/dashboard/admin?tab=overview" isActive={activeTab === 'overview'}>
        <Settings className="w-4 h-4" />
        Resumen
      </NavLink>
      <NavLink href="/dashboard/admin?tab=users" isActive={activeTab === 'users'}>
        <Users className="w-4 h-4" />
        Usuarios Activos
      </NavLink>
      <NavLink href="/dashboard/admin?tab=pending" isActive={activeTab === 'pending'}>
        <UserPlus className="w-4 h-4" />
        Solicitudes
        {pendingCount > 0 && (
          <Badge variant="destructive" className="ml-1">{pendingCount}</Badge>
        )}
      </NavLink>
    </nav>
  );
}