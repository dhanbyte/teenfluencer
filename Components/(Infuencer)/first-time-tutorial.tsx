"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { X, ChevronRight, ChevronLeft, Sparkles, Target, TrendingUp, Users } from "lucide-react"

const tutorialSteps = [
  {
    id: 1,
    title: "Welcome to TeenFluencer! 🎉",
    description: "Your journey to amazing brand partnerships starts here. Let us show you around!",
    icon: Sparkles,
    position: "center",
  },
  {
    id: 2,
    title: "Complete Your Profile",
    description:
      "Fill out your profile to get matched with the best campaigns. The more complete, the better your chances!",
    icon: Users,
    position: "left",
  },
  {
    id: 3,
    title: "Track Your Stats",
    description:
      "Monitor your applications, approvals, and earnings all in one place. Stay on top of your influencer game!",
    icon: TrendingUp,
    position: "center",
  },
  {
    id: 4,
    title: "Apply to Campaigns",
    description: "Browse recommended campaigns tailored just for you. Apply with one click and start earning!",
    icon: Target,
    position: "right",
  },
]

export function FirstTimeUserTutorial() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false)

  useEffect(() => {
    // Check if user has seen tutorial before (in real app, this would be from localStorage or user preferences)
    const seenTutorial = localStorage.getItem("hasSeenTutorial")
    if (!seenTutorial) {
      setTimeout(() => {
        setIsVisible(true)
      }, 1000) // Show tutorial after 1 second
    } else {
      setHasSeenTutorial(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenTutorial", "true")
    setHasSeenTutorial(true)
  }

  const handleSkip = () => {
    handleClose()
  }

  if (hasSeenTutorial || !isVisible) return null

  const currentStepData = tutorialSteps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card
        className={`w-full max-w-md mx-auto transform transition-all duration-500 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <CardContent className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Tutorial Content */}
          <div className="text-center space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900">
                <Icon className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{currentStepData.title}</h2>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{currentStepData.description}</p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 py-4">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep ? "bg-purple-600 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-4">
              <Button variant="ghost" onClick={handleSkip} className="text-gray-500 hover:text-gray-700">
                Skip Tutorial
              </Button>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-1 bg-transparent">
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                )}

                <Button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1"
                >
                  {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
                  {currentStep < tutorialSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
