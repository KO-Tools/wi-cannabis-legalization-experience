import { Button } from '@/components/ui/button.jsx'
import { ArrowRight } from 'lucide-react'

export function NextChapterButton({ onClick, disabled = false, className = "" }) {
  return (
    <div className={`text-center mt-8 ${className}`}>
      <Button 
        size="lg" 
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
        onClick={onClick}
        disabled={disabled}
      >
        Next Chapter
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}

