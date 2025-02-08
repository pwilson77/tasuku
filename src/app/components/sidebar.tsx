"use client"

import {
  Clock,
  FileText,
  Calendar,
  BarChart2,
  PieChart,
  FolderKanban,
  Users,
  UserCheck,
  HelpCircle,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  return (
    <div className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold">TikTik</span>
        </div>
      </div>

      <div className="px-2 py-2">
        <div className="mb-4">
          <h3 className="px-4 text-xs font-medium text-muted-foreground mb-2">MAIN MENU</h3>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Time Tracker
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Timesheet
            </Button>
            <Button variant="default" className="w-full justify-start bg-black text-white hover:bg-black/90">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </nav>
        </div>

        <div className="mb-4">
          <h3 className="px-4 text-xs font-medium text-muted-foreground mb-2">ANALYZE</h3>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart2 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <PieChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </nav>
        </div>

        <div className="mb-4">
          <h3 className="px-4 text-xs font-medium text-muted-foreground mb-2">MANAGE</h3>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <FolderKanban className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <UserCheck className="mr-2 h-4 w-4" />
              Attendance
            </Button>
          </nav>
        </div>

        <div className="mt-auto pt-4">
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help center
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
      </div>
    </div>
  )
}

