import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

export function InteractiveWisconsinMap() {
  const [selectedState, setSelectedState] = useState('minnesota')
  
  const stateData = {
    wisconsin: {
      name: 'Wisconsin',
      status: 'Illegal',
      revenue: 0,
      jobs: 0,
      population: 5.9,
      legalStatus: 'No legal cannabis program',
      color: 'bg-red-50',
      textColor: 'text-red-800',
      spending: 121,
      legalizedYear: null,
      showMoneyFlow: true
    },
    minnesota: {
      name: 'Minnesota',
      status: 'Legal',
      revenue: 150,
      jobs: 3500,
      population: 5.7,
      legalStatus: 'Full recreational and medical (2023)',
      color: 'bg-green-50',
      textColor: 'text-green-800',
      spending: 0,
      legalizedYear: 2023,
      showMoneyFlow: false
    },
    michigan: {
      name: 'Michigan',
      status: 'Legal',
      revenue: 270,
      jobs: 46746,
      population: 10.0,
      legalStatus: 'Full recreational and medical (2018)',
      color: 'bg-green-50',
      textColor: 'text-green-800',
      spending: 0,
      legalizedYear: 2018,
      showMoneyFlow: false
    },
    illinois: {
      name: 'Illinois',
      status: 'Legal',
      revenue: 490,
      jobs: 9176,
      population: 12.6,
      legalStatus: 'Full recreational and medical (2020)',
      color: 'bg-green-50',
      textColor: 'text-green-800',
      spending: 0,
      legalizedYear: 2020,
      showMoneyFlow: false
    }
  }

  const currentState = stateData[selectedState]

  const handleStateClick = (stateKey) => {
    setSelectedState(stateKey)
  }

  return (
    <div className="space-y-3">
      {/* Compact Map Visualization */}
      <Card className="p-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-center">Midwest Cannabis Landscape</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Interactive State Grid */}
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            <button 
              onClick={() => handleStateClick('minnesota')}
              className={`text-white text-center py-2 px-3 rounded text-sm font-medium transition-all duration-200 hover:scale-105 ${
                selectedState === 'minnesota' ? 'bg-green-700 ring-2 ring-green-300' : 'bg-green-600'
              }`}
            >
              Minnesota
            </button>
            <button 
              onClick={() => handleStateClick('michigan')}
              className={`text-white text-center py-2 px-3 rounded text-sm font-medium transition-all duration-200 hover:scale-105 ${
                selectedState === 'michigan' ? 'bg-green-700 ring-2 ring-green-300' : 'bg-green-600'
              }`}
            >
              Michigan
            </button>
            <button 
              onClick={() => handleStateClick('wisconsin')}
              className={`text-white text-center py-2 px-3 rounded text-sm font-medium transition-all duration-200 hover:scale-105 ${
                selectedState === 'wisconsin' ? 'bg-orange-600 ring-2 ring-orange-300' : 'bg-orange-500'
              }`}
            >
              Wisconsin
            </button>
            <button 
              onClick={() => handleStateClick('illinois')}
              className={`text-white text-center py-2 px-3 rounded text-sm font-medium transition-all duration-200 hover:scale-105 ${
                selectedState === 'illinois' ? 'bg-green-700 ring-2 ring-green-300' : 'bg-green-600'
              }`}
            >
              Illinois
            </button>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>Legal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Illegal/Limited</span>
            </div>
          </div>

          {/* Dynamic State Stats */}
          <div className={`${currentState.color} p-3 rounded-lg transition-all duration-300`}>
            <h4 className={`font-bold ${currentState.textColor} text-center mb-2`}>
              {currentState.name}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-center">
                <div className="font-semibold">Tax Revenue</div>
                <div className="text-lg font-bold">
                  ${currentState.revenue}M
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Jobs</div>
                <div className="text-lg font-bold">
                  {currentState.jobs.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-xs text-gray-600">
              <div>Population: {currentState.population}M</div>
              <div>Status: {currentState.legalStatus}</div>
            </div>
          </div>

          {/* Money Flow - Only show for Wisconsin */}
          {currentState.showMoneyFlow && (
            <div className="bg-red-100 p-2 rounded-lg">
              <h4 className="font-bold text-red-800 text-center mb-1 text-sm">Money Flowing Out of Wisconsin</h4>
              <div className="text-center">
                <div className="text-sm">Wisconsin → Illinois</div>
                <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold inline-block">$121M annually</div>
              </div>
              <p className="text-xs text-gray-700 mt-1 text-center">
                <strong>Lost Opportunity:</strong> Wisconsin residents are driving to neighboring states to purchase cannabis, taking tax revenue and economic benefits with them.
              </p>
            </div>
          )}

          {/* Success Story - Show for legal states */}
          {!currentState.showMoneyFlow && (
            <div className="bg-green-100 p-2 rounded-lg">
              <h4 className="font-bold text-green-800 text-center mb-1 text-sm">
                {currentState.name} Success Story
              </h4>
              <p className="text-xs text-gray-700 text-center">
                Since legalizing cannabis in {currentState.legalizedYear}, {currentState.name} has generated 
                <strong> ${currentState.revenue}M in tax revenue</strong> and created 
                <strong> {currentState.jobs.toLocaleString()} jobs</strong>, demonstrating the economic benefits of legalization.
              </p>
            </div>
          )}
        </CardContent>
        <div className="text-xs text-gray-500 text-center mt-1 px-3">
          Sources: NCSL state cannabis tracking, Illinois IDFPR, Michigan CRA, Minnesota OCM, state regulatory agencies (2024)
        </div>
      </Card>
    </div>
  )
}

