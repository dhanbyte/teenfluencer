"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, User, Instagram, CreditCard, Upload } from "lucide-react"

const tasks = [
  { id: 1, title: "Add Bio", icon: User, completed: false },
  { id: 2, title: "Connect Instagram", icon: Instagram, completed: true },
  { id: 3, title: "Add Bank/UPI", icon: CreditCard, completed: false },
  { id: 4, title: "Upload Profile Picture", icon: Upload, completed: false },
]

export function ProfileCompletion() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    // Animate progress bar
    setTimeout(() => {
      setProgress(40)
    }, 500)
  }, [])

  const completedTasks = tasks.filter((task) => task.completed).length
  const completionPercentage = (completedTasks / tasks.length) * 100

  return (
    <Card
      className={`transition-all duration-700 hover:shadow-lg ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Profile Completion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Progress</span>
            <span className="font-semibold text-purple-600">{Math.round(completionPercentage)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const Icon = task.icon
            return (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-500 hover:bg-gray-50 dark:hover:bg-gray-800 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
                <Icon className="w-4 h-4 text-gray-500" />
                <span
                  className={`text-sm ${task.completed ? "text-green-600 line-through" : "text-gray-700 dark:text-gray-300"}`}
                >
                  {task.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Complete Now Button */}
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:scale-105">
          Complete Now
        </Button>
      </CardContent>
    </Card>
  )
}
