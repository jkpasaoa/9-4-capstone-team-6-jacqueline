import React, { useEffect } from "react";
import video1 from "../../assets/LandingPageVideo.mp4";
import video2 from "../../assets/Page2_WebPage_Landscape.mp4";
import { Carousel, initTE } from "tw-elements";

export default function Home() {
  // const [isMuted, setIsMuted] = useState(false);

  // const toggleMute = () => {
  //   setIsMuted(!isMuted);
  // };

  useEffect(() => {
    initTE({ Carousel });
  }, []);

  return (
    <div
      id="carouselExampleCaptions"
      class="relative"
      data-te-carousel-init
      data-te-ride="carousel"
    >
      <div
        class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-te-carousel-indicators
      >
        <button
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide-to="0"
          data-te-carousel-active
          class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide-to="1"
          class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 2"
        ></button>
      </div>
      <div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        <div
          class="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-fade
          data-te-carousel-item
          data-te-carousel-active
        >
          <video class="w-full" controls autoPlay muted>
            <source src={video1} type="video/mp4" />
          </video>
          <div class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
            {/* <h5 class="text-xl">First slide label</h5> */}
            {/* <p>Some representative placeholder content for the first slide.</p> */}
          </div>
        </div>
        <div
          class="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-te-carousel-fade
          data-te-carousel-item
        >
          <video class="w-full" controls autoPlay muted>
            <source src={video2} type="video/mp4" />
          </video>
          <div class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
            {/* <h5 class="text-xl">Second slide label</h5> */}
            {/* <p>Some representative placeholder content for the second slide.</p> */}
          </div>
        </div>
      </div>
      <button
        class="absolute bottom-[100px] left-0 top-[100px] z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="prev"
      >
        <span class="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      <button
        class="absolute bottom-[100px] right-0 top-[100px] z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="next"
      >
        <span class="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
  );
}

// import './Pages.css';

// export default function Home() {
//   return (
//     <div>
//       <p className="home-content">Home</p>
//     </div>
//   );
// }
