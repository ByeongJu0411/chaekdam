import { LandingNav } from './(beforeLogin)/(landingPage)/_components/LandingNav'
import { HeroSection } from './(beforeLogin)/(landingPage)/_components/HeroSection'
import { ProblemSection } from './(beforeLogin)/(landingPage)/_components/ProblemSection'
import { SolutionSection } from './(beforeLogin)/(landingPage)/_components/SolutionSection'
import { HowToSection } from './(beforeLogin)/(landingPage)/_components/HowToSection'
import { FeaturesSection } from './(beforeLogin)/(landingPage)/_components/FeaturesSection'
import { CtaSection } from './(beforeLogin)/(landingPage)/_components/CtaSection'

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowToSection />
      <FeaturesSection />
      <CtaSection />
    </>
  )
}
