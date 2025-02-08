"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TimeEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  timeBlock?: {
    id?: string
    project: string
    tag: string
    startTime: string
    endTime: string
    date: string
  }
}

interface Comment {
  id: string
  author: string
  text: string
  timestamp: string
}

export default function TimeEntryDialog({ open, onOpenChange, timeBlock }: TimeEntryDialogProps) {
  const [comments, setComments] = useState<Comment[]>([
    { id: "1", author: "John Doe", text: "Great progress on the landing page!", timestamp: "2023-09-13T10:30:00Z" },
    { id: "2", author: "Jane Smith", text: "Can we discuss the color scheme?", timestamp: "2023-09-13T11:15:00Z" },
  ])
  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: "Current User", // In a real app, this would be the logged-in user
        text: newComment,
        timestamp: new Date().toISOString(),
      }
      setComments([...comments, newCommentObj])
      setNewComment("")
    }
  }

  const isNewEntry = !timeBlock?.id

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isNewEntry ? "Add New Entry" : "Edit Entry"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project">Project</Label>
            <Select defaultValue={timeBlock?.project || "tuduu"}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tuduu">Tuduu Projects</SelectItem>
                <SelectItem value="wave">Wave Projects</SelectItem>
                <SelectItem value="firey">Firey Projects</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tag">Tag</Label>
            <Select defaultValue={timeBlock?.tag || "landing"}>
              <SelectTrigger>
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="landing">Landing Page</SelectItem>
                <SelectItem value="mobile">Mobile App</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" defaultValue={timeBlock?.date || new Date().toISOString().split("T")[0]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start">Start</Label>
              <Input id="start" type="time" defaultValue={timeBlock?.startTime || "08:00"} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end">End</Label>
              <Input id="end" type="time" defaultValue={timeBlock?.endTime || "09:00"} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add a note or @mention" />
          </div>
          {!isNewEntry && (
            <div className="grid gap-2">
              <Label>Comments</Label>
              <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="mb-2">
                    <div className="font-semibold">{comment.author}</div>
                    <div className="text-sm text-muted-foreground">{comment.text}</div>
                    <div className="text-xs text-muted-foreground">{new Date(comment.timestamp).toLocaleString()}</div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={handleAddComment}>Add</Button>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          {!isNewEntry && <Button variant="destructive">Delete</Button>}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button>{isNewEntry ? "Add" : "Save"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

