import FoSection from "@/features/home/components/FoSection";
import FSection from "@/features/home/components/FSection";
import SSection from "@/features/home/components/SSection";
import TSection from "@/features/home/components/TSection";


export default function App() {
    return (
        <div className="h-dvh w-full grid grid-cols-5 ">


            <FSection />
            <SSection />
            <TSection />
            <FoSection />


        </div>
    );
}
