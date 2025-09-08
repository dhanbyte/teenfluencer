"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Circle, User, Instagram, CreditCard, Upload, Youtube, Facebook } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"



export function ProfileCompletion() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isProfileCompleted, setIsProfileCompleted] = useState(false)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Personal Details", icon: User, completed: false },
    { id: 2, title: "Connect Social Media", icon: Instagram, completed: false },
    { id: 3, title: "Add Payment Details", icon: CreditCard, completed: false },
    { id: 4, title: "Upload Profile Picture", icon: Upload, completed: false },
  ])
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    
    // Load profile completion status
    const loadProfileStatus = () => {
      const profileCompleted = localStorage.getItem('profileCompleted') === 'true'
      setIsProfileCompleted(profileCompleted)
      
      const saved = localStorage.getItem('influencerProfile')
      if (saved) {
        const data = JSON.parse(saved)
        setTasks(prevTasks => prevTasks.map(task => {
          switch (task.id) {
            case 1: return { ...task, completed: !!(data.bio || data.age || data.phone) }
            case 2: return { ...task, completed: !!(data.instagram?.username || data.youtube?.username || data.facebook?.username) }
            case 3: return { ...task, completed: !!(data.bankDetails?.upiId || (data.bankDetails?.accountNumber && data.bankDetails?.ifscCode)) }
            case 4: return { ...task, completed: !!data.profilePicture }
            default: return task
          }
        }))
      }
    }
    
    loadProfileStatus()
    
    // Listen for storage changes
    const handleStorageChange = () => loadProfileStatus()
    window.addEventListener('storage', handleStorageChange)
    
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  useEffect(() => {
    const completedCount = tasks.filter(task => task.completed).length
    const progressValue = (completedCount / tasks.length) * 100
    setTimeout(() => setProgress(progressValue), 300)
  }, [tasks])

  const completedTasks = tasks.filter((task) => task.completed).length
  const completionPercentage = (completedTasks / tasks.length) * 100
  
  // Hide component if profile is saved
  if (isProfileCompleted) {
    return null
  }

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
        <Button 
          onClick={() => router.push('/influencer/profile')}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:scale-105"
        >
          Complete Now
        </Button>
      </CardContent>
    </Card>
  )
}
