import {
  LayoutDashboard,
  FileText,
  Users,
  ClipboardList,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarLink {
  icon: any;
  name: string;
  href: string;
}

// Add the audit links to the sidebar
export const sidebarLinks: SidebarLink[] = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    href: "/",
  },
  {
    icon: FileText,
    name: "Companies",
    href: "/companies",
  },
  {
    icon: Users,
    name: "Directors",
    href: "/directors",
  },
  {
    icon: ClipboardList,
    name: "Audits",
    href: "/audits",
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-50 h-full w-16 flex flex-col bg-white border-r shadow-sm lg:w-64">
      <div className="flex flex-col gap-y-5 font-medium">
        <NavLink
          to="/"
          className="flex items-center h-20 px-4 text-xl"
        >
          <span className="sr-only">Home</span>
          LOGO
        </NavLink>
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 text-gray-500 transition-colors hover:text-primary ${
                    isActive ? "text-primary bg-gray-50" : ""
                  }`
                }
              >
                <link.icon className="w-5 h-5 shrink-0" />
                <span className="hidden lg:inline">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
