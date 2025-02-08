"use client"

import { useState, useEffect } from "react"

export interface TimeBlock {
  id: string
  project: string
  tag: string
  startTime: string
  endTime: string
  date: string
}

interface WeeklyCalendarProps {
  currentDate: Date
  onTimeBlockClick: (timeBlock: TimeBlock) => void
}

export default function WeeklyCalendar({ currentDate, onTimeBlockClick }: WeeklyCalendarProps) {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([])

  useEffect(() => {
    // In a real application, you would fetch time blocks for the current month here
    const mockTimeBlocks: TimeBlock[] = [
      {
        id: "1",
        project: "Tuduu Projects",
        tag: "Landing Page",
        startTime: "08:00",
        endTime: "09:00",
        date: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-13`,
      },
      // Add more mock time blocks as needed
    ]
    setTimeBlocks(mockTimeBlocks)
  }, [currentDate])

  const hours = Array.from({ length: 24 }, (_, i) => i) // 0:00 to 23:00
  const days = getDaysInMonth(currentDate)

  function getDaysInMonth(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push({
        day: d.toLocaleString("default", { weekday: "short" }),
        date: d.getDate().toString(),
        time: "00:00:00", // You would calculate this based on actual time entries
      })
    }

    return days
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-[auto_1fr] h-full">
        {/* Time labels */}
        <div className="w-16 border-r">
          {hours.map((hour) => (
            <div key={hour} className="h-20 border-b text-xs text-muted-foreground p-2">
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(100px, 1fr))` }}>
          {/* Header */}
          <div
            className="col-span-full grid"
            style={{ gridTemplateColumns: `repeat(${days.length}, minmax(100px, 1fr))` }}
          >
            {days.map((day, i) => (
              <div
                key={i}
                className={`p-2 text-center border-r last:border-r-0 ${day.day === "Fri" ? "bg-orange-50" : ""}`}
              >
                <div className="text-sm font-medium">
                  {day.day} {day.date}
                </div>
                <div className="text-xs text-muted-foreground">{day.time}</div>
              </div>
            ))}
          </div>

          {/* Time blocks */}
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="relative border-r last:border-r-0">
              {hours.map((hour, hourIndex) => (
                <div key={hourIndex} className="h-20 border-b last:border-b-0" />
              ))}
              {timeBlocks
                .filter((block) => {
                  const blockDate = new Date(block.date)
                  return (
                    blockDate.getDate() === Number.parseInt(day.date) &&
                    blockDate.getMonth() === currentDate.getMonth() &&
                    blockDate.getFullYear() === currentDate.getFullYear()
                  )
                })
                .map((block) => {
                  const startHour = Number.parseInt(block.startTime.split(":")[0])
                  const endHour = Number.parseInt(block.endTime.split(":")[0])
                  const top = startHour * 80 // 80px per hour
                  const height = (endHour - startHour) * 80

                  return (
                    <div
                      key={block.id}
                      className="absolute left-0 right-0 mx-1 rounded bg-violet-100 p-2 cursor-pointer hover:bg-violet-200"
                      style={{ top: `${top}px`, height: `${height}px` }}
                      onClick={() => onTimeBlockClick(block)}
                    >
                      <div className="text-xs font-medium text-violet-700">{block.project}</div>
                      <div className="text-xs text-violet-600">{block.tag}</div>
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

