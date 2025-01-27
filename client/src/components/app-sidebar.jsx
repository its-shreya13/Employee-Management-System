import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "OBP",
    email: "OnBoardPro@gamil.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "OnBoardPro",
      logo: GalleryVerticalEnd,
      plan: "EMS",
    },
  ],
  navMain: [
    {
      title: "DashBoard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      
    },
    {
      title: "Employee",
      url: "/employee-list",
      icon: BookOpen,
      items: [
        {
          title: "Employee List",
          url: "/employee-list",
        },
        
      ],
    },
    {
      title: "Performance",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Rating",
          url: "/ratings",
        },
        {
          title: "Analysis",
          url: "/analysis",
        },
        
      ],
    },
    {
      title: "Tasks",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Assign",
          url: "/task-assign",
        },
        {
          title: "List",
          url: "/task-list",
        },
        
      ],
    },
    {
      title: "LogOut",
      url: "/",
      icon: Settings2,
      isActive: true,
      
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
