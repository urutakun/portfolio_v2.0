import React, { useEffect } from 'react'
import Lenis from 'lenis'

const LenisWrapper = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05,
            smooth: true,
            direction: 'vertical',
            wheelMultiplier: 0.4,
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy();
        }

    }, [])
  return (
    <div>
        {children}
    </div>
  )
}

export default LenisWrapper
