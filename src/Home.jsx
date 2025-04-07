import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import Nav from "./components/Nav";
gsap.registerPlugin(useGSAP);

function Home() {
    const [loading, setLoading] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const paddedLoading = String(loading).padStart(3, '0');
    const preloaderRef = useRef(null);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Preloader
    useEffect(() => {
        const interval = setInterval(() => {
          setLoading((prev) => (prev < 100 ? prev + 1 : 100));
        }, 10);

        return () => clearInterval(interval);
      }, []);

      // Preloader animation
      useEffect(() => {
          if (loading === 100) {
            const preload = gsap.timeline({ delay: 0});
            setLoaded(true);
            preload.to(preloaderRef.current, {
                y: '-100%',
                duration: 1,
                ease: 'power4.inOut',
                onComplete: () => {
                  preloaderRef.current.style.display = 'none';
                },
            })

            window.scrollTo(0, 0);
        }
      }, [loading]);

      const textAlignmentClass = windowWidth >= 1024 ? 'text-left' : 'text-center';

  return (
        <div className="w-full font-space-mono relative overflow-x-hidden cursor-none">
            <Cursor/>
            <div className="preloader flex flex-col justify-between w-full h-[95vh] lg:h-screen bg-black text-cwhite p-6 fixed top-0 left-0 right-0 z-50" ref={preloaderRef}>
                <div className="preloader__top flex justify-between items-center lg:items-start">
                    <div className="counter font-sequelBook leading-tight">
                        <span className="leading-tight text-[2rem] lg:text-[5rem]">{paddedLoading}</span>
                        <span className="text-[2rem] lg:text-[4rem]">%</span>
                    </div>
                    <span className='text-xs lg:text-base'>&#91;PORTFOLIO_V2.0&#93;</span>
                </div>
                <div className="preloader__center flex flex-col items-end text-xs lg:text-base">
                    <span className='text-cred'>&#91;EXCELLENCE&#93;</span>
                    <span>&#91;IS&#93;</span>
                    <span>&#91;A&#93;</span>
                    <span>&#91;MINDSET&#93;</span>
                </div>
                <div className="preloader__bottom flex justify-between text-xs lg:text-base">
                    <span>&#91;CREATED BY WALTER&#93;</span>
                    <span>&#91;&copy;2K25&#93;</span>
                </div>
            </div>
            <div className="wrapper relative">
                {loaded && <Nav /> }

                <div className="absolute inset-0 z-0 grid grid-cols-3 ">
                    {/* Spacer divs for the 3 columns */}
                    <div className="border-r border-dashed border-gray-300"></div>
                    <div className="border-r border-dashed border-gray-300"></div>
                    <div></div>
                </div>

                {/* MAIN CONTENT */}
                <div className="main__content p-6 z-10">
                    <div className="intro w-full h-[50vh] lg:h-[60vh] flex flex-col mt-[10rem] justify-between"></div>
                </div>
                <div className="footer h-screen"></div>
            </div>
        </div>
  )
}

export default Home

const Cursor = () => {
    const cursorRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let x = 0;
        let y = 0;
        let mouseX = 0;
        let mouseY = 0;

        const updateCursor = () => {
            x += (mouseX - x) * 0.1;
            y += (mouseY - y) * 0.1;

            gsap.set(cursorRef.current, {
                x,
                y
            })

            requestAnimationFrame(updateCursor)
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if(!isVisible) setIsVisible(true);

        };


        window.addEventListener('mousemove', handleMouseMove);
        updateCursor();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, [])

    return(
        <div className={`fixed top-0 left-0 w-6 h-6 bg-cwhite rounded-full z-100 hidden lg:block pointer-events-none transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'} mix-blend-difference`} ref={cursorRef}></div>
    )
}
