import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Nav from "./components/Nav";
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

function Home() {
    const [loading, setLoading] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);
    const paddedLoading = String(loading).padStart(3, '0');
    const preloaderRef = useRef(null);
    const introText = useRef(null);
    const aboutContainer = useRef(null);
    const worksContainer = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Preloader
    useEffect(() => {
        const interval = setInterval(() => {
          setLoading((prev) => (prev < 100 ? prev + 1 : 100));
        }, 10);

        return () => clearInterval(interval);
      }, []);

      useGSAP(() => {
        if(loading === 100){
            setLoaded(true);
            window.scrollTo(0, 0);

            gsap.to(preloaderRef.current, {
                y: '-100%',
                duration: 1.4,
                ease: 'power4.inOut',
                onComplete: () => {
                  preloaderRef.current.style.display = 'none';
                },
            })
        }
      }, [loading])

      useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.uruta', {
            y: 300,
            duration: 1.5,
            delay: 1.1,
            ease: "power4.inOut",
        })

        tl.from('.head_text' , {
          y: "100%",
          duration: 1.3,
          stagger: 0.03,
          ease: "power4.inOut",
        }, "-=1.3")

        tl.from('.text, .arrow' , {
          y: "100%",
          duration: 1.4,
          stagger: 0.03,
          ease: "power4.inOut",
        }, "-=1.2")

      }, { scope: introText })

      useGSAP(() => {
        gsap.utils.toArray(['.exp__header', '.tech__header']).forEach((section) => {
            const headers = section.querySelectorAll('.about__header');

            gsap.from(headers, {
              y: "100%",
              duration: 1.3,
              stagger: 0.03,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "top 50%",
              },
            });

            ScrollTrigger.matchMedia({
                "(min-width:1025px)": function(){
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top 50%",
                        end: "bottom 50%",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    });
                },

                "(min-width: 768px) and (max-width: 1024px)": function(){
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top 50%",
                        end: "+=200",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    });
                },

                "(max-width: 767px)": function(){
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top 50%",
                        end: "+=100",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    });
                }
            })
          });
      }, { scope: aboutContainer})

      useGSAP(() => {
        gsap.from('.works__header', {
            y: "100%",
            duration: 1.3,
            stagger: 0.03,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: '.works__header',
              start: "top 90%",
              end: "top 50%",
            },
          });

        gsap.utils.toArray(['.img__wrapper']).forEach((img) => {
            const project = img.querySelector('.project__img');
            gsap.from( project , {
                scale: 0,
                duration: 2,
                ease: "power1",
                stagger: 0.5,
                scrollTrigger: {
                  trigger: project,
                  start: "top 90%",
                  end: "top 40%",
                  scrub: true,
                },
              });
        })

      }, { scope: worksContainer})



      const socs = [
        {
            url: 'https://www.linkedin.com/in/walter-gagate-9459ab26a/',
            name: 'Linkedin',
        },
        {
            url: 'https://www.onlinejobs.ph/jobseekers/info/1196106',
            name: 'Onlinejobs',
        },
    ];

    const projects = [
        {
            id: 1,
            name: 'BlockAid',
            year: 2025,
            img: 'blockaid.webp'
        },
        {
            id: 2,
            name: 'Qvision 2.0',
            year: 2025,
            img: 'qvision.webp'
        },
        {
            id: 3,
            name: 'Byaheonta',
            year: 2024,
            img: 'byaheonta.webp'
        },
    ];




  return (
        <div className="w-full font-space-mono relative overflow-x-hidden cursor-none">
            <Cursor/>
            <div className="preloader flex flex-col justify-between w-full h-screen bg-black text-cwhite p-6 fixed top-0 left-0 right-0 z-50" ref={preloaderRef}>
                <div className="preloader__top flex justify-between items-center md:items-start">
                    <div className="counter font-sequelBook leading-tight">
                        <span className="leading-tight text-[2rem] md:text-[5rem] font-sequelMed">{paddedLoading}</span>
                        <span className="text-[2rem] md:text-[4rem]">%</span>
                    </div>
                    <span className='text-xs md:text-base'>&#91;PORTFOLIO_V2.0&#93;</span>
                </div>
                <div className="preloader__bottom flex justify-between text-xs md:text-base">
                    <span>&#91;CREATED_BY_WALTER&#93;</span>
                    <span>&#91;&copy;2K25&#93;</span>
                </div>
            </div>
            <div className="wrapper relative">
                {loaded && <Nav /> }

                <div className="absolute inset-0 z-0 grid grid-cols-3 lg:px-6">
                    <div className="border-r border-dashed border-gray-300"></div>
                    <div className="border-r border-dashed border-gray-300"></div>
                    <div></div>
                </div>

                {/* MAIN CONTENT */}
                <div className="main__content relative z-10">
                    <div id="home" className="intro w-full flex flex-col h-screen md:h-[85vh] mt-16 md:p-6" ref={introText}>
                        <div className="grid grid-cols-3 w-full h-fit md:h-full">
                            <div className="uruta intro_l img__wrapper h-[400px] md:h-[550px] lg:h-full overflow-hidden col-span-3 lg:col-span-1">
                                <img src="/assets/uruta.webp" alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className="intro_r px-6 font-sequelMed col-span-3 lg:col-span-2 flex flex-col md:justify-between">
                                <div className="name text-[5rem] md:text-[8rem] flex flex-col tracking-tight w-max -space-y-12 md:-space-y-20">
                                    <div className="overflow-hidden">
                                        <span className="inline-block head_text">Walte®</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="inline-block head_text">Gagate</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 text-xl md:text-3xl md:mt-6 lg:mt-0">
                                    <div className="soc-links hidden md:block">
                                        {socs.map((soc) => (
                                            <a href={soc.url} className='flex items-center space-x-1 overflow-hidden cursor-none'>
                                                <span className='inline-block text'>{soc.name}</span>
                                                <div className="arrow">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='size-10 md:size-12 rotate-45' viewBox="0 0 24 24"><path fill="currentColor" d="M13 7.828V20h-2V7.828l-5.364 5.364l-1.414-1.414L12 4l7.778 7.778l-1.414 1.414z"/></svg>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    <div className="roles flex flex-col items-start md:items-center">
                                        <div className="overflow-hidden">
                                            <span className='inline-block text'>Web Developer</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className='inline-block text'>UI/UX Designer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="about" className="about md:p-6 font-sequelMed flex flex-col items-center justify-between h-[150vh] lg:h-[200vh] w-full mt-0 md:mt-[20rem] space-y-32" ref={aboutContainer}>
                        <div className="exp w-full text-center h-screen">
                            <div className="exp__header__container h-[200px] md:h-[400px]">
                                <div className="exp__header tracking-tight text-4xl md:text-6xl lg:text-8xl flex flex-col">
                                    <div className="overflow-hidden">
                                        <span className='about__header inline-block'>FREELANCE WEB</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className='about__header inline-block'>DEVELOPER</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sub__container mt-6">
                                <div className="exp__sub space-y-12 text-2xl lg:text-4xl">
                                    <div className="overflow-hidden text-cred">
                                        <span className='inline-block about__sub'>&#91;4 YEARS OF EXPERIENCE&#93;</span>
                                    </div>
                                    <div className="desc">
                                        <div className="overflow-hidden">
                                            <span className='inline-block about__sub'>DESIGN AND DEVELOP WEBSITES THAT ARE BOTH</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className='inline-block about__sub'>VISUALLY CAPTIVATING AND USER-FRIENDLY</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tech&tools w-full h-screen text-center">
                            <div className="tech__header__container h-[200px] md:h-[400px]">
                                <div className="tech__header tracking-tight text-4xl md:text-6xl lg:text-8xl flex flex-col ">
                                    <div className="overflow-hidden">
                                        <span className='about__header inline-block'>TECHNOLOGIES</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className='about__header inline-block'>& TOOLS</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sub__container mt-6">
                                <div className="tech__sub text-lg md:text-2xl lg:text-4xl">
                                    <div className="desc">
                                        <div className="overflow-hidden">
                                            <span className='inline-block about__sub'>JAVASCRIPT/REACT/GSAP/TAILWIND</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className='inline-block about__sub'>ILLUSTRATOR/PHOTOSHOP/FIGMA</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className='inline-block about__sub'>LARAVEL/INERTIA/PYTHON</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="work" className="works w-full h-full" ref={worksContainer}>
                        <div className="words__header tracking-tight text-4xl md:text-6xl lg:text-8xl flex flex-col justify-center font-sequelMed text-center h-[200px] lg:h-[400px]">
                            <div className="overflow-hidden">
                                <span className='works__header inline-block'>FEATURED WORKS</span>
                            </div>
                        </div>
                        <div className="works__container w-full h-full lg:px-6 border-t border-dashed border-gray-300">
                            {projects.map((project) => (
                                <div className='grid grid-cols-3 border-b border-dashed last:border-none border-gray-300' key={project.id}>
                                    <div className="title flex flex-col pt-6 mx-auto md:mx-0 md:px-4 lg:px-0">
                                        <span className='text-cred'>&#91;{project.id}&#93;</span>
                                        <span className='uppercase font-sequelMed text-base lg:text-4xl'>{project.name}</span>
                                    </div>
                                    <div className="img__wrapper overflow-hidden w-full h-[300px] md:h-[500px] lg:h-[800px] col-span-2 lg:col-span-1">
                                        <img src={`/assets/projects/${project.img}`} alt="" className='project__img w-full h-full object-cover object-center origin-center'/>
                                    </div>
                                    <div className="hidden lg:flex flex-col items-end pt-6">
                                        <span className='text-cred'>&#91;YEAR&#93;</span>
                                        <span className='font-sequelMed text-xl lg:text-4xl'>{project.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer socs={socs} id="contact"/>
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
                x: x - 10,
                y: y - 10
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
