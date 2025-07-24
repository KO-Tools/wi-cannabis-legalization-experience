import { useState, useEffect } from 'react'

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  className = '',
  disableFormatting = false 
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`counter-${end}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [end, isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    const startValue = 0
    const endValue = end

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = startValue + (endValue - startValue) * easeOutQuart
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  const formatNumber = (num) => {
    if (disableFormatting) {
      return Math.floor(num).toString()
    }
    if (decimals === 0) {
      return Math.floor(num).toLocaleString()
    }
    return num.toFixed(decimals)
  }

  return (
    <span 
      id={`counter-${end}`}
      className={className}
    >
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

export function StatCard({ 
  title, 
  value, 
  suffix = '', 
  prefix = '', 
  description, 
  icon: Icon,
  color = 'green',
  decimals = 0,
  source = ''
}) {
  const colorClasses = {
    green: 'text-green-600 bg-green-50 border-green-200',
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    red: 'text-red-600 bg-red-50 border-red-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200'
  }

  return (
    <div className={`p-6 rounded-xl border-2 ${colorClasses[color]} transition-all hover:scale-105`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {Icon && <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[0]}`} />}
      </div>
      <div className={`text-4xl font-bold mb-2 ${colorClasses[color].split(' ')[0]}`}>
        <AnimatedCounter 
          end={value} 
          prefix={prefix} 
          suffix={suffix}
          decimals={decimals}
        />
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      {source && (
        <p className="text-xs text-gray-500 italic">Source: {source}</p>
      )}
    </div>
  )
}

