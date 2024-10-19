import HomeFooter from "./_components/HomeFooter";
import HomeHeader from "./_components/HomeHeader";
import HomeHero from "./_components/HomeHero";

export default function Home() {
  return (
    <div>
      <div className="leading-normal tracking-normal text-light bg-cover bg-fixed gradient-header">
        <div className="h-full">
          {/* <!--Nav--> */}
          <HomeHeader />

          {/* <!--Main--> */}
          <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center px-5">
            <HomeHero />

            {/* <!--Footer--> */}
            <HomeFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
