import { HeroSection } from "../components/home/HeroSection";
import { OurGoals } from "../components/home/OurGoals";
import { Qoute } from "../components/home/Qoute";
import { WhoWeAre } from "../components/home/WhoWeAre";
import Activities from "../components/home/Activities"

export default function Home() {
  return (
    <>
      <HeroSection /> 
      <WhoWeAre />
      <OurGoals />
      <Qoute />
      <Activities/>
    </>
  )
}
