import AvailableClasses from "@/components/user/home/AvailableClasses";
import HeroSection from "@/components/user/home/HeroSection";
import StudyOnlineSection from "@/components/user/home/StudyOnlineSection";
import Suggestion from "@/components/user/home/Suggestion";


export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <StudyOnlineSection />
      <AvailableClasses />
      <Suggestion />
    </main>
  );
}
