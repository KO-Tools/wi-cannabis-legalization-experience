import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const publicOpinionData = [
  { demographic: 'Democrats', support: 88, color: '#2D5A3D' },
  { demographic: 'Independents', support: 84, color: '#3498DB' },
  { demographic: 'Republicans', support: 43, color: '#E67E22' },
  { demographic: 'Rural Voters', support: 65, color: '#8B4513' },
  { demographic: 'Urban Voters', support: 75, color: '#F39C12' }
]

const economicImpactData = [
  { state: 'Wisconsin (Projected)', revenue: 166, jobs: 5000, color: '#2D5A3D' },
  { state: 'Illinois', revenue: 490, jobs: 9176, color: '#E67E22' },
  { state: 'Michigan', revenue: 270, jobs: 46746, color: '#3498DB' },
  { state: 'Minnesota', revenue: 150, jobs: 3500, color: '#8B4513' }
]

const crimeReductionData = [
  { category: 'Violent Crime', beforeLegalization: 100, afterLegalization: 81 },
  { category: 'Property Crime', beforeLegalization: 100, afterLegalization: 83 },
  { category: 'Drug Arrests', beforeLegalization: 100, afterLegalization: 32 },
  { category: 'Court Cases', beforeLegalization: 100, afterLegalization: 45 }
]

const timelineData = [
  { year: 2018, event: 'Michigan Legalizes', impact: 20 },
  { year: 2020, event: 'Illinois Legalizes', impact: 40 },
  { year: 2023, event: 'Minnesota Legalizes', impact: 60 },
  { year: 2025, event: 'Wisconsin Potential', impact: 80 }
]

export function PublicOpinionChart() {
  return (
    <Card className="data-card">
      <CardHeader>
        <CardTitle>Public Support for Cannabis Legalization</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={publicOpinionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="demographic" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Support']} />
            <Bar dataKey="support" fill="#2D5A3D" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 text-xs text-gray-500">
          Source: Marquette Law School Poll (2024), Wisconsin voter survey (n=1,000, ±3.5% margin of error)
        </div>
      </CardContent>
    </Card>
  )
}

export function EconomicComparisonChart() {
  const [viewType, setViewType] = useState('revenue')
  
  return (
    <Card className="data-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Economic Impact Comparison
          <div className="space-x-2">
            <Button 
              variant={viewType === 'revenue' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('revenue')}
            >
              Revenue
            </Button>
            <Button 
              variant={viewType === 'jobs' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('jobs')}
            >
              Jobs
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={economicImpactData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [
                viewType === 'revenue' ? `$${value}M` : `${value.toLocaleString()}`,
                viewType === 'revenue' ? 'Tax Revenue' : 'Jobs'
              ]} 
            />
            <Bar 
              dataKey={viewType} 
              fill={viewType === 'revenue' ? '#2D5A3D' : '#E67E22'} 
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 text-xs text-gray-500">
          Sources: Wisconsin Legislative Fiscal Bureau (projections), Illinois IDFPR, Michigan CRA, Minnesota OCM (2024 data)
        </div>
      </CardContent>
    </Card>
  )
}

export function CrimeReductionChart() {
  return (
    <Card className="data-card">
      <CardHeader>
        <CardTitle>Crime Reduction After Legalization</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={crimeReductionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis domain={[0, 120]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Index']} />
            <Bar dataKey="beforeLegalization" fill="#E67E22" name="Before Legalization" />
            <Bar dataKey="afterLegalization" fill="#2D5A3D" name="After Legalization" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-gray-600">
          <p>Data shows indexed crime rates (100 = baseline before legalization)</p>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Source: "The Effect of Medical Marijuana Laws on Crime" (Economic Inquiry, 2017), Denver Police Department data
        </div>
      </CardContent>
    </Card>
  )
}

export function LegalizationTimeline() {
  return (
    <Card className="data-card">
      <CardHeader>
        <CardTitle>Midwest Cannabis Legalization Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value, name, props) => [
                `${props.payload.event}`,
                'Milestone'
              ]} 
            />
            <Line 
              type="monotone" 
              dataKey="impact" 
              stroke="#2D5A3D" 
              strokeWidth={3}
              dot={{ fill: '#E67E22', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {timelineData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <Badge variant="outline">{item.year}</Badge>
              <span className="text-sm">{item.event}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Source: National Conference of State Legislatures (NCSL), state cannabis regulatory agencies
        </div>
      </CardContent>
    </Card>
  )
}

export function WisconsinMapInteractive() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  
  const regions = [
    { name: 'Milwaukee Metro', population: 1.6, support: 72, color: '#2D5A3D' },
    { name: 'Madison Area', population: 0.7, support: 78, color: '#3498DB' },
    { name: 'Green Bay', population: 0.3, support: 65, color: '#E67E22' },
    { name: 'Rural Wisconsin', population: 2.4, support: 58, color: '#8B4513' }
  ]
  
  return (
    <Card className="data-card">
      <CardHeader>
        <CardTitle>Wisconsin Regional Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={regions}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="support"
                  onClick={(data) => setSelectedRegion(data)}
                >
                  {regions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Support']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {regions.map((region, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedRegion?.name === region.name 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => setSelectedRegion(region)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="font-medium">{region.name}</span>
                  </div>
                  <Badge variant="secondary">{region.support}%</Badge>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Population: {region.population}M
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedRegion && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-800">{selectedRegion.name}</h4>
            <p className="text-sm text-green-700">
              {selectedRegion.support}% support legalization • {selectedRegion.population}M residents
            </p>
          </div>
        )}
        <div className="mt-3 text-xs text-gray-500">
          Source: Marquette Law School Poll regional demographic analysis (2024), U.S. Census Bureau population data
        </div>
      </CardContent>
    </Card>
  )
}

