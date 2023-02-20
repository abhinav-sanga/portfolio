import * as React from 'react'
import { animated, useSpring, useSpringValue, useChain, useSpringRef } from '@react-spring/web'

import Header from './Header';
import LandingPage from './LandingPage';
import Contact from './Contact';
import Trail from './Trail';
import './App.css';
import About from './About';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const transitions = {
  trans1: (x, y) => `translate3d(${-x / 40}px,${-y / 40}px,0)`,

  trans2: (x, y) => `translate3d(${-x / 17 + 275}px,${-y / 17 - 50}px,0)`,

  trans3: (x, y) => `translate3d(${-x / 17 - 300}px,${-y / 17 + 200}px,0)`,

  trans4: (x, y) => `translate3d(${-x / 20 + 150}px,${-y / 20 + 275}px,0)`,

  trans5: (x, y) => `translate3d(${-x / 35 - 250}px,${-y / 35 - 200}px,0)`,

  trans6: (x, y) => `translate3d(${-x / 35 + 200}px,${-y / 35 - 275}px,0)`,

  trans7: (x, y) => `translate3d(${-x / 35 - 155}px,${-y / 35 - 15}px,0)`
}

export default function App() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  const [lightRef, setLight] = useSpring(() => ({}), []);

  const [compIndex, setCompIndex] = React.useState(1);
  const prevCompIndex = React.useRef<any>(0);

  const moonContainerRef = React.useRef<any>();
  const moonTrailRef = React.useRef<any>();
  const landingRef = React.useRef<any>();
  const contactRef = React.useRef<any>();
  const aboutRef = React.useRef<any>();
  const titleSpringRef = useSpringRef();
  const title1SpringRef = useSpringRef();

  let tstart;

  React.useEffect(() => {
    console.log(prevCompIndex.current);

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener('deviceorientation', handleOrientation);
    if (compIndex === 1) {
      setLight.start({
        config: {
          duration: 1000,
        },
        opacity: 1,
        x: 0,
        from: {
          opacity: 0
        }
      })
      moonTrailRef.current.handleTrail('moon', 'right');
    } else {
      moonTrailRef.current.handleTrail('moon', 'left');
    }

    if (compIndex === 1) {
      fprops.start(0)
      sprops.start(window.innerWidth <= 661 ? 120 : 100)
      landingRef.current.handleTrail('title', 'left');
      contactRef.current.handleTrail('title', 'right');
    } else if (compIndex == 2) {
      fprops.start(window.innerWidth <= 661 ? -120 : -100)
      sprops.start(0)
      contactRef.current.handleTrail('title', 'left');
      landingRef.current.handleTrail('title', 'right');
    } else if (compIndex === 3) {

    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [compIndex])

  const handleOrientation = (event) => {
    set({
      xy: calc(event.gamma * 50, event.beta * 25)
    });
  }

  const handleResize = () => {
    if (window.innerWidth < 881 && window.innerWidth > 661) {
      let perpx = 1.4 / 1920;
      let ratio = perpx * window.innerWidth;
      moonContainerRef.current.style.transform = `scale(${ratio})`
      return 0;
    }
    else if (window.innerWidth <= 661) {
      moonContainerRef.current.style.transform = `scale(0.35)`;
      return 0;
    }
    moonContainerRef.current.style.transform = `scale(1)`
    return 0;
  }

  const handleTouchStart = (e) => {
    tstart = e.touches[0].clientY;
  }

  const handleTouchEnd = (e) => {
    let tend = e.changedTouches[0].clientY;
    if (tstart > tend + 5) {
      prevCompIndex.current = compIndex;
      if (compIndex < 2) {
        setCompIndex(compIndex => compIndex + 1)
      }
    } else if (tstart < tend - 5) {
      prevCompIndex.current = compIndex;
      if (compIndex > 1) {
        setCompIndex(compIndex => compIndex - 1);
      }
    }
  }

  const handleScroll = (e) => {
    if (e.deltaY > 0) { // downscroll code
      // moonTrailRef.current.handleTrail('moon', 'left');
      prevCompIndex.current = compIndex;
      if (compIndex < 2) {
        // landingRef.current.handleTrail('title', 'right');
        setCompIndex(compIndex => compIndex + 1)
      }
    } else if (e.deltaY < 0) {  // upscroll code
      // titleTrailRef.current.handleTrail('title', 'left');
      // moonTrailRef.current.handleTrail('moon', 'right');
      prevCompIndex.current = compIndex;
      if (compIndex > 1) {
        setCompIndex(compIndex => compIndex - 1);
      }
    } // else was horizontal scroll
  }

  const fprops = useSpringValue(compIndex == 1 ? -100 : 0, {
    config: { tension: 280, friction: 80, precision: 0.0001 }
  })

  const sprops = useSpringValue(compIndex == 2 ? 100 : 0, {
    config: { tension: 280, friction: 80, precision: 0.0001 }
  })

  return (
    <animated.div
      className='container'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleScroll}
      onMouseMove={({ clientX: x, clientY: y }) => { set({ xy: calc(x, y) }) }} >
      <Header></Header>
      <animated.div style={{
        transform: fprops.to(val => {
          return `translateY(${val}%)`;
        }), position: 'absolute', height: '80%', top: '10%', width: '100%', zIndex: 14
      }}>
        <LandingPage innerRef={landingRef} titleSpringRef={titleSpringRef} />
      </animated.div>
      {/* <animated.div style={{
        transform: sprops.to(val => {
          return `translateY(${val}%)`;
        }), position: 'absolute', height: '80%', top: '10%', width: '100%', zIndex: 14
      }}>
        <About innerRef={aboutRef} titleSpringRef={title1SpringRef} />
      </animated.div> */}
      <animated.div style={{
        transform: sprops.to(val => {
          return `translateY(${val}%)`;
        }), position: 'absolute', height: '80%', top: '10%', width: '100%', zIndex: 14
      }}>
        <Contact innerRef={contactRef} titleSpringRef={title1SpringRef} />
      </animated.div>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', top: 0, overflow: 'hidden', position: 'absolute' }}>
        <div className='moon-container moon-container-no-light' ref={moonContainerRef}>
          <Trail type={'moon'} anim={'right'} innerRef={moonTrailRef} titleSpringRef={moonContainerRef}>
            <div className='moon-container-no-light z-13'>
              <animated.div className='card1' style={{ transform: props.xy.interpolate(transitions.trans1) }} />
              <animated.div className='card2' style={{ transform: props.xy.interpolate(transitions.trans2) }} />
              <animated.div className='card3' style={{ transform: props.xy.interpolate(transitions.trans3) }} />
              <animated.div className='card4' style={{ transform: props.xy.interpolate(transitions.trans4) }} />
              <animated.div className='card5' style={{ transform: props.xy.interpolate(transitions.trans5) }} />
              <animated.div className='card6' style={{ transform: props.xy.interpolate(transitions.trans6) }} />
              <animated.h1 className='card7' style={{ transform: props.xy.interpolate(transitions.trans7) }}>PORTFOLIO</animated.h1>
              <animated.div className='card8' style={{ transform: props.xy.interpolate(transitions.trans1) }} />
            </div>
          </Trail>
          {/* <animated.div className='card9' style={{ transform: props.xy.interpolate(transitions.trans1), ...lightRef }} /> */}
          <animated.div className='card9' style={{ transform: props.xy.interpolate(transitions.trans1) }} />
        </div>
      </div>
    </animated.div>
  )
}


