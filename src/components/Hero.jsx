import React, { useEffect, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';

const Hero = () => {
  // Load big video or small video based on the initial size of the page.
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 1.5
    })
    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 1.2
    })
  }, [])

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  }

  // This only runs when the window resizes ie shrinking the size of the page.
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet)

    return () => {
      window.addEventListener("resize", handleVideoSrcSet)
    }
  }, [])

  return (
    <section className='w-full nav-height bg-black relative'>
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className='hero-title'>iPhone 15 Pro</p>
        <div className='md:w-10/12 w-9/12'>
          <video className='pointer-events-none' autoPlay muted loop playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id="cta" className='flex flex-col items-center translate-y-20 opacity-0'>
        <a href="#highlights" className='btn'>Buy</a>
        <p>From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
