import Sidebar from "./components/sidebar";
import TimeTrackingCalendar from "./components/time-tracking-calendar";

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <TimeTrackingCalendar />
      </main>
    </div>
  )
}