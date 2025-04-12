import React from 'react'

const Footer = ({socs}) => {
  return (
        <div id="contact" className="footer h-[500px] md:h-[650px] lg:h-[750px] bg-cblack text-cwhite py-4 lg:px-6 relative" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}>
            <div className="footer__content fixed bottom-0 z-10 space-y-4 flex flex-col justify-center w-full h-[500px] md:h-[650px] lg:h-[750px] px-4 lg:px-0">
                <div className="header flex justify-center lg:mb-0">
                    <span className='text-[5rem] md:text-[8rem] lg:text-[15rem] font-sequelMed tracking-tight leading-none'>GET IN TOUCH</span>
                </div>
                <div className="grid grid-cols-3 min-h-[100px] md:min-h-[150px] text-xs md:text-base">
                    <div className="col-span-3 col-start-1 md:col-start-2 flex flex-col justify-between h-full w-full">
                        <span className='text-cred'>LET'S CREATE SOMETHING GREAT!</span>
                        <div className="links flex flex-col space-y-2">
                            {socs.map((soc) => (
                                <a href={soc.url} className='cursor-none'>{soc.name}</a>
                            ))}
                            <span>waltergagate1001@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 min-h-[100px] md:min-h-[150px] text-xs md:text-base">
                    <div className="col-span-3 col-start-2 md:col-start-3 flex flex-col justify-between h-full w-full">
                        <div className="desdev flex flex-col space-y-2">
                            <span>DESIGNED_&_DEVELOPED BY</span>
                            <span>WALTER_GAGATE</span>
                        </div>
                        <div className="copyright">
                            <span>&copy;COPYRIGHT_2025_BY_WALTER</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Footer
