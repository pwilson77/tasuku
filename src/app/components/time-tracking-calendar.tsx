"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Settings2, Bell, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TimeEntryDialog from "./time-entry-dialog"
import WeeklyCalendar, { TimeBlock } from "./weekly-calendar"

export default function TimeTrackingCalendar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<TimeBlock | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleTimeBlockClick = (timeBlock: TimeBlock) => {
    setSelectedTimeBlock(timeBlock)
    setIsDialogOpen(true)
  }

  const handleNewEntry = () => {
    setSelectedTimeBlock(null)
    setIsDialogOpen(true)
  }

  const handleMonthChange = (change: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + change, 1))
  }

  const handleYearChange = (year: string) => {
    setCurrentDate(new Date(Number.parseInt(year), currentDate.getMonth(), 1))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between px-4 h-14 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Calendar</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-orange-500/10 text-orange-500 border-0 hover:bg-orange-500/20"
          >
            Upgrade
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex items-center justify-between px-4 h-14 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => handleMonthChange(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-base font-medium">{monthNames[currentDate.getMonth()]}</h2>
          <Button variant="ghost" size="icon" onClick={() => handleMonthChange(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Select value={currentDate.getFullYear().toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Day
          </Button>
          <Button variant="outline" size="sm" className="bg-black text-white hover:bg-black/90">
            Week
          </Button>
          <Button variant="outline" size="sm">
            Month
          </Button>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <WeeklyCalendar currentDate={currentDate} onTimeBlockClick={handleTimeBlockClick} />
      </div>

      <Button className="absolute bottom-4 right-4 rounded-full" size="icon" onClick={handleNewEntry}>
        <Plus className="h-4 w-4" />
      </Button>

      <TimeEntryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} timeBlock={selectedTimeBlock!} />
    </div>
  )
}
