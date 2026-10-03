import FoSection from "../app/home-comp/FoSection";
import FSection from "../app/home-comp/FSection";
import SSection from "../app/home-comp/SSection";
import TSection from "../app/home-comp/TSection";


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
