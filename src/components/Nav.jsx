import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
gsap.registerPlugin(useGSAP);

const Nav = () => {
    const [xCoordinates, setXCoordinates] = useState(0);
    const [yCoordinates, setYCoordinates] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const navContainer = useRef(null);
    const tl = useRef();

    useEffect(() => {
        const handleMouseMove = (event) => {
            setXCoordinates(event.clientX);
            setYCoordinates(event.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, [])

    useGSAP(() => {
        gsap.set('.link', { y: 100})
        tl.current = gsap.timeline({ paused: true });

        tl.current.to(navContainer.current, {
            duration: 1.25,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut"
        })

        tl.current.to('.link', {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.inOut",
            delay: -0.90
        })
    });

    useEffect(() => {
        if (tl.current) {
            if (isOpen) {
              tl.current.play();
            } else {
              tl.current.reverse();
            }
        }
    }, [isOpen]);

    const links = [
        {
            url: '/',
            name: 'Home',
        },
        {
            url: '/work',
            name: 'Work',
        },
        {
            url: '/about',
            name: 'About',
        },
        {
            url: '/contact',
            name: 'Contact',
        },
    ];

    const socs = [
        {
            url: 'https://www.linkedin.com/in/walter-gagate-9459ab26a/',
            name: 'Linked_In',
        },
        {
            url: 'https://www.onlinejobs.ph/jobseekers/info/1196106',
            name: 'Online_Jobs',
        },
    ];


    return(
        <nav>
            {/* TOP NAV */}
            <div className='flex justify-between items-center fixed top-0 left-0 z-40 w-full p-4 lg:p-6 backdrop-blur-sm'
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            }}>
                <div className="nav__left flex flex-col">
                    <div className="coordinates hidden lg:block space-x-2">
                        <span>X&#91;{xCoordinates}&#93;</span>
                        <span>Y&#91;{yCoordinates}&#93;</span>
                    </div>
                    <div className="lg:hidden">
                        <img src="/assets/y2k.avif" alt="logo" className="w-[1.5rem]"/>
                    </div>
                </div>
                <div className="nav__right" >
                    <div className="menu text-xs lg:text-base px-4 lg:px-6 py-2 bg-cblack text-cwhite" onClick={() => setIsOpen(true)}>
                        <span>MENU</span>
                    </div>
                </div>
            </div>
            <div className="nav__overlay fixed top-0 left-0 w-full h-screen bg-cred z-50" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}} ref={navContainer}>
                <div className="absolute inset-0 z-0 grid grid-cols-3 ">
                    <div className="border-r border-dashed border-cblack/20"></div>
                    <div className="border-r border-dashed border-cblack/20"></div>
                </div>
                <div className="content z-50 w-full h-full relative p-6 flex flex-col">
                    <div className="exit absolute right-2 top-2 lg:right-12">
                        <div onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-[4rem] lg:size-[10rem]" viewBox="0 0 24 24"><path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"/></svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:h-full space-y-16 lg:space-y-0">
                        <div className="nav__left grid grid-cols-2 gap-y-16 col-span-2 lg:col-span-1">
                            <div className="inf flex flex-col col-span-2 lg:col-span-1 text-xs lg:text-base">
                                <span>WALTER_GAGATE</span>
                                <span>_PH</span>
                            </div>
                            <div className="ln flex flex-col text-7xl lg:text-8xl font-sequelRoman space-y-2 col-span-2 lg:col-span-1">
                                {links.map((link, idx) => (
                                    <div className="menu-link px-2 w-max"
                                    key={idx}
                                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"}}
                                    >
                                        <div className="link relative">
                                            <Link to={link.url} className="hover:underline ctransition cursor-none tracking-tighter"
                                            onClick={() => {tl.current.reverse(); setIsOpen(false)} }>{link.name}</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="nav__right text-xs lg:text-base col-span-2 lg:col-span-1 flex flex-col lg:flex-row lg:justify-between lg:items-end h-full space-y-8 lg:space-y-0">
                                <div className="links flex flex-col space-y-2">
                                {socs.map((link, idx) => (
                                    <a key={idx} href={link.url} className="flex space-x-2 cursor-none">
                                        <span>{link.name}</span>
                                        <div className="arrow__icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 rotate-45" viewBox="0 0 512 512"><path fill="currentColor" d="M390.624 150.625L256 16L121.376 150.625l22.628 22.627l95.997-95.998v417.982h32V77.257l95.995 95.995z"/></svg>
                                        </div>
                                    </a>
                                ))}
                                </div>
                                <div className="contact flex flex-col space-y-2">
                                    <span>waltergagate1001@gmail.com</span>
                                    <span>0945-837-8967</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
