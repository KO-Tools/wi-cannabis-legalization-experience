import { useEffect, useState } from 'react'

export function ProgressBar({ currentChapter, totalChapters = 6 }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const newProgress = ((currentChapter + 1) / totalChapters) * 100
    setProgress(newProgress)
  }, [currentChapter, totalChapters])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-orange-200">
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-4 py-2 text-center">
        <div className="text-xs text-gray-600 font-medium">
          Chapter {currentChapter + 1} of {totalChapters}
        </div>
      </div>
    </div>
  )
}

