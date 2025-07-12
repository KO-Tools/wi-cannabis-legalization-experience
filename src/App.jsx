import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ChevronDown, ArrowRight, DollarSign, Users, TrendingUp, MapPin, Leaf, Shield, Heart, Briefcase, GraduationCap, Scale, ChevronUp } from 'lucide-react'
import { AnimatedCounter } from './components/AnimatedCounter.jsx'
import { InteractiveWisconsinMap } from './components/InteractiveMap.jsx'
import { NextChapterButton } from './components/NextChapterButton.jsx'
import { ProgressBar } from './components/ProgressBar.jsx'
import kindOasisLogo from './assets/images/kind_oasis_logo_white.png'
import './App.css'

// Compact StatCard component
const StatCard = ({ title, value, suffix = '', prefix = '', description, icon: Icon, color = 'green', source }) => (
  <Card className="data-card text-center">
    <CardContent className="p-4">
      <Icon className={`w-6 h-6 mx-auto mb-2 text-${color}-600`} />
      <div className="text-2xl font-bold mb-1">
        <AnimatedCounter end={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-sm font-medium mb-2">{title}</div>
      <div className="text-xs text-gray-600 mb-2">{description}</div>
      <div className="text-xs text-gray-500">{source}</div>
    </CardContent>
  </Card>
)

// Compact Economic Comparison Chart
const EconomicComparisonChart = () => (
  <Card className="data-card">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Economic Impact Comparison</CardTitle>
    </CardHeader>
    <CardContent className="pt-2">
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="text-center">
          <div className="bg-green-600 h-16 rounded mb-2 flex items-end justify-center">
            <span className="text-white text-xs pb-1">$166M</span>
          </div>
          <div className="text-xs">Wisconsin (Projected)</div>
        </div>
        <div className="text-center">
          <div className="bg-green-600 h-24 rounded mb-2 flex items-end justify-center">
            <span className="text-white text-xs pb-1">$490M</span>
          </div>
          <div className="text-xs">Illinois</div>
        </div>
        <div className="text-center">
          <div className="bg-green-600 h-20 rounded mb-2 flex items-end justify-center">
            <span className="text-white text-xs pb-1">$270M</span>
          </div>
          <div className="text-xs">Michigan</div>
        </div>
        <div className="text-center">
          <div className="bg-green-600 h-12 rounded mb-2 flex items-end justify-center">
            <span className="text-white text-xs pb-1">$150M</span>
          </div>
          <div className="text-xs">Minnesota</div>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Sources: Wisconsin Legislative Fiscal Bureau (projections), Illinois IDFPR, Michigan CRA, Minnesota OCM (2024 data)
      </div>
    </CardContent>
  </Card>
)

function App() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const scrollToChapter = (chapterIndex) => {
    const element = document.getElementById(`chapter-${chapterIndex}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setCurrentChapter(chapterIndex)
    }
  }

  const skipToAction = () => {
    scrollToChapter(5) // Skip to the final chapter
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Function to handle contact representatives click
  const handleContactReps = () => {
    window.open('https://contactmyrep.ws/', '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const handleScroll = () => {
      // Track scroll position for scroll-to-top button
      setShowScrollToTop(window.scrollY > 300)
      
      // Track current chapter
      const chapters = document.querySelectorAll('.chapter-section')
      chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentChapter(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-600">
      {/* Progress Bar */}
      <ProgressBar currentChapter={currentChapter} />

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => scrollToChapter(index)}
            className={`nav-dot ${currentChapter === index ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="chapter-0" className="chapter-section bg-gradient-to-br from-green-800 to-green-600 text-white">
        <div className="chapter-content">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6">
              <img 
                src={kindOasisLogo} 
                alt="Kind Oasis" 
                className="h-16 mx-auto mb-8"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 fade-in">
              Make Wisconsin<br />
              <span className="text-orange-400">Green Again</span>
            </h1>
            
            <p className="text-xl mb-8 max-w-2xl mx-auto fade-in">
              Explore the compelling case for cannabis legalization in Wisconsin 
              through interactive data, economic benefits, and community impact stories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 fade-in">
              <Button 
                onClick={() => scrollToChapter(1)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
              >
                Begin the Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={skipToAction}
                variant="outline"
                className="bg-gray-200 text-green-800 border-gray-300 hover:bg-green-800 hover:text-white px-8 py-3 text-lg"
              >
                Take Action Now
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto fade-in">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">67%</div>
                <div className="text-sm">Public Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">$166M</div>
                <div className="text-sm">Tax Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">5,000</div>
                <div className="text-sm">New Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">8th</div>
                <div className="text-sm">Last State</div>
              </div>
            </div>
            <div className="text-xs text-gray-300 mt-4">
              Sources: Marquette Law School Poll (2024), Wisconsin Legislative Fiscal Bureau, New Frontier Data, NCSL
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 1: Surrounded by Green */}
      <section id="chapter-1" className="chapter-section bg-gray-50">
        <div className="chapter-content">
          <div className="container mx-auto px-4">
            <div className="text-center mb-3 fade-in">
              <h2 className="text-4xl font-bold text-green-800 mb-3">Surrounded by Green</h2>
              <p className="text-lg text-green-700 max-w-2xl mx-auto">
                Wisconsin is one of only 8 states without any form of legal marijuana, 
                while all neighboring states have embraced legalization.
              </p>
              <p className="text-sm text-orange-600 font-medium mt-2 max-w-2xl mx-auto">
                Click on each state button below to compare their cannabis statistics and success stories.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <InteractiveWisconsinMap />
            </div>
          </div>
        </div>
        <div className="next-chapter-container text-center">
          <NextChapterButton onClick={() => scrollToChapter(2)} />
        </div>
      </section>

      {/* Chapter 2: Economic Opportunity */}
      <section id="chapter-2" className="chapter-section bg-orange-50">
        <div className="chapter-content">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 fade-in">
              <h2 className="text-4xl font-bold text-orange-800 mb-4">Economic Opportunity</h2>
              <p className="text-lg text-orange-700 max-w-2xl mx-auto">
                Cannabis legalization could generate significant tax revenue and create 
                thousands of jobs across Wisconsin.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <StatCard
                title="Annual Tax Revenue"
                value={166}
                suffix="M"
                prefix="$"
                description="Projected annual tax revenue"
                icon={DollarSign}
                color="green"
                source="Wisconsin Legislative Fiscal Bureau"
              />
              
              <StatCard
                title="Job Creation"
                value={5000}
                description="Direct jobs potential"
                icon={Users}
                color="blue"
                source="New Frontier Data"
              />
              
              <StatCard
                title="Economic Multiplier"
                value={3}
                suffix="x"
                description="Effect for every $1 spent"
                icon={TrendingUp}
                color="orange"
                source="U.S. Bureau of Labor Statistics"
              />
            </div>

            <div className="max-w-3xl mx-auto">
              <EconomicComparisonChart />
            </div>
          </div>
        </div>
        <div className="next-chapter-container text-center">
          <NextChapterButton onClick={() => scrollToChapter(3)} />
        </div>
      </section>

      {/* Chapter 3: Public Safety & Health */}
      <section id="chapter-3" className="chapter-section bg-blue-50">
        <div className="chapter-content">
          <div className="container mx-auto px-4">
            <div className="text-center mb-3 fade-in">
              <h2 className="text-3xl font-bold text-blue-800 mb-2">Public Safety & Health</h2>
              <p className="text-base text-blue-700 max-w-2xl mx-auto">
                Evidence from legal states shows improved public safety outcomes, reduced arrests, 
                and significant health benefits for patients.
              </p>
            </div>

            {/* Crime Reduction Stats */}
            <div className="grid md:grid-cols-3 gap-2 mb-3">
              <StatCard
                title="Crime Reduction"
                value={18}
                suffix="%"
                description="Neighborhood crime decrease"
                icon={Shield}
                color="blue"
                source="Economic Inquiry journal (2017)"
              />
              
              <StatCard
                title="Arrest Reduction"
                value={76}
                suffix="%"
                description="Cannabis possession arrests decreased"
                icon={Scale}
                color="green"
                source="Multi-state legalization study"
              />
              
              <StatCard
                title="Wisconsin Arrests"
                value={13400}
                description="Cannabis arrests in 2022 alone"
                icon={Users}
                color="red"
                source="Wisconsin Department of Justice"
              />
            </div>

            {/* Health & Safety Benefits */}
            <div className="grid md:grid-cols-2 gap-2 mb-3">
              <StatCard
                title="Opioid Reduction"
                value={62}
                suffix="%"
                description="Michigan patients reduced opioid use"
                icon={Heart}
                color="green"
                source="Michigan Cannabis Regulatory Agency"
              />
              
              <StatCard
                title="Youth Protection"
                value={75}
                suffix="%"
                description="Youth drug arrest reduction in legal states"
                icon={GraduationCap}
                color="purple"
                source="Multi-state decriminalization study"
              />
            </div>

            {/* Law Enforcement Benefits - Compact */}
            <div className="bg-white rounded-lg p-2 shadow-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-2 text-center">Law Enforcement Benefits</h3>
              <div className="grid md:grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">✓</div>
                  <p className="font-semibold text-sm">Resource Reallocation</p>
                  <p className="text-gray-600">Officers focus on violent crimes</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">✓</div>
                  <p className="font-semibold text-sm">Improved Clearance Rates</p>
                  <p className="text-gray-600">Better solve rates for serious crimes</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">Sources: Colorado & Washington post-legalization studies</p>
            </div>
          </div>
        </div>
        <div className="next-chapter-container text-center">
          <NextChapterButton onClick={() => scrollToChapter(4)} />
        </div>
      </section>

      {/* Chapter 4: Agricultural Heritage */}
      <section id="chapter-4" className="chapter-section bg-yellow-50">
        <div className="chapter-content">
          <div className="container mx-auto px-4">
            <div className="text-center mb-3 fade-in">
              <h2 className="text-3xl font-bold text-yellow-800 mb-2">Agricultural Heritage</h2>
              <p className="text-base text-yellow-700 max-w-2xl mx-auto">
                Wisconsin's rich agricultural history and existing infrastructure position it to become 
                a nationwide leader in cannabis production.
              </p>
            </div>

            {/* Historical Leadership Section */}
            <div className="grid md:grid-cols-4 gap-2 mb-3">
              <StatCard
                title="Nation's #1 Hemp Producer"
                value={1940}
                suffix="s"
                description="Leading hemp state in America"
                icon={Leaf}
                color="green"
                source="Wisconsin Historical Society"
              />
              
              <StatCard
                title="Last Legal Hemp Company"
                value={1958}
                description="Rens Hemp Company closed"
                icon={Briefcase}
                color="orange"
                source="Wisconsin State Historical Society Archives"
              />
              
              <StatCard
                title="Hemp Reauthorized"
                value={2017}
                description="Unanimous legislative passage"
                icon={Scale}
                color="blue"
                source="Wisconsin Legislature"
              />
              
              <StatCard
                title="Current Hemp Market"
                value={50}
                prefix="$"
                suffix="M"
                description="Senior market annually"
                icon={TrendingUp}
                color="purple"
                source="New Frontier Data Cannabis Market Report 2024"
              />
            </div>

            {/* Market Opportunity Visualization */}
            <div className="bg-white rounded-lg p-3 shadow-lg mb-3">
              <h3 className="text-lg font-bold text-yellow-800 mb-2 text-center">Wisconsin Cannabis Market Potential</h3>
              
              {/* Geographic Advantage */}
              <div className="grid md:grid-cols-2 gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <h4 className="font-bold text-green-800 text-sm mb-1">Geographic Advantage</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">30%</div>
                      <p>Residents within 1 hour of legal dispensary</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">50%</div>
                      <p>Within 75 minutes (2.16M people)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-100 p-2 rounded-lg">
                  <h4 className="font-bold text-orange-800 text-sm mb-1">Market Growth</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">12.67%</div>
                      <p>Hemp industry annual growth rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">46%</div>
                      <p>Senior cannabis use increase (2007-2018)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agricultural Infrastructure */}
              <div className="bg-yellow-100 p-2 rounded-lg">
                <h4 className="font-bold text-yellow-800 text-sm mb-2 text-center">Agricultural Infrastructure Advantages</h4>
                <div className="grid md:grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">✓</div>
                    <p className="font-semibold">Excellent Climate</p>
                    <p className="text-gray-600">Ideal soil & weather conditions</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">✓</div>
                    <p className="font-semibold">Water Resources</p>
                    <p className="text-gray-600">Abundant irrigation supply</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">✓</div>
                    <p className="font-semibold">Hemp Expertise</p>
                    <p className="text-gray-600">Existing cultivation technology</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">✓</div>
                    <p className="font-semibold">Tech Hub Potential</p>
                    <p className="text-gray-600">Regional cannabis innovation</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Sources: Wisconsin Historical Society Archives (2024), New Frontier Data Cannabis Market Report (2024), USDA Agricultural Census (2022), Wisconsin Department of Agriculture Trade & Consumer Protection (2024)
              </p>
            </div>
          </div>
        </div>
        <div className="next-chapter-container text-center">
          <NextChapterButton onClick={() => scrollToChapter(5)} />
        </div>
      </section>

      {/* Chapter 5: The Path Forward */}
      <section id="chapter-5" className="chapter-section bg-green-50">
        <div className="chapter-content">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 fade-in">
              <h2 className="text-4xl font-bold text-green-800 mb-4">The Path Forward</h2>
              <p className="text-lg text-green-700 max-w-2xl mx-auto">
                Public opinion strongly supports legalization, and Wisconsin has the 
                opportunity to lead the Midwest in responsible cannabis policy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <StatCard
                title="Public Support"
                value={67}
                suffix="%"
                description="Wisconsin voters support legalization"
                icon={Users}
                color="green"
                source="Marquette Law School Poll (2024)"
              />
              
              <StatCard
                title="Medical Support"
                value={83}
                suffix="%"
                description="Support medical marijuana"
                icon={Heart}
                color="blue"
                source="Marquette Law School Poll (2024)"
              />
              
              <StatCard
                title="Rural Support"
                value={58}
                suffix="%"
                description="Rural Wisconsin voters support"
                icon={MapPin}
                color="orange"
                source="Marquette Law School Poll"
              />
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Wisconsin's Cannabis Future</h3>
                <p className="text-gray-700 mb-6">
                  The convergence of public opinion, economic pressure, and neighboring state 
                  success creates an unprecedented opportunity for Wisconsin cannabis legalization.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleContactReps}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Contact Your Representatives
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    asChild
                  >
                    <a href="https://kindresources.io/" target="_blank" rel="noopener noreferrer">
                      Learn More About Cannabis Policy
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export default App