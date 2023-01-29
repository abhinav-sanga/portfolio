import * as React from 'react'
import { useScroll, animated, useSpring, useTrail, a, useChain, easings, useSpringRef } from '@react-spring/web'

import './App.css';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${-x / 40}px,${-y / 40}px,0)`
const trans2 = (x, y) => `translate3d(${-x / 17 + 275}px,${-y / 17 - 50}px,0)`
const trans3 = (x, y) => `translate3d(${-x / 17 - 300}px,${-y / 17 + 200}px,0)`
const trans4 = (x, y) => `translate3d(${-x / 20 + 150}px,${-y / 20 + 275}px,0)`
const trans5 = (x, y) => `translate3d(${-x / 35 - 250}px,${-y / 35 - 200}px,0)`
const trans6 = (x, y) => `translate3d(${-x / 35 + 200}px,${-y / 35 - 275}px,0)`
const trans7 = (x, y) => `translate3d(${-x / 35 - 155}px,${-y / 35 - 15}px,0)`

const Trail = ({ children, from }) => {
  const items = from === 'left' ? React.Children.toArray(children) : React.Children.toArray(children);
  const conf = from == 'left' ? {
    config: {
      mass: 0.5, tension: 3500, friction: 250,
    },
    opacity: 1,
    x: 100,
    from: { opacity: 0, x: -500 }
  } : {
    config: {
      duration: 1000,
    },
    opacity: 1,
    x: 0,
    // y: window.innerHeight/2,
    from: {
      opacity: 0,
      // x: window.innerWidth
    }
  }

  const handleTrail = () => {

  }

  const [trail, api] = useTrail(items.length, () => (conf), [])
  return (
    <div>
      {trail.map(({ ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}


export default function App() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))

  // const sheetSpring = useSpring({
  //   from: {
  //     bottom: 0
  //   },
  //   to: {
  //     bottom: 925
  //   },
  //   config: {
  //     easing: easings.easeInCubic,
  //     duration: 450
  //   }
  // })

  const moonContainerRef = React.useRef<any>();
  const titleRef = React.useRef<any>();

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  const handleResize = () => {
    if (window.innerWidth < 881 && window.innerWidth > 661) {
      let perpx = 1.4 / 1920;
      let ratio = perpx * window.innerWidth;
      moonContainerRef.current.style.transform = `scale(${ratio})`
      return 0;
    }
    else if (window.innerWidth <= 661) {
      moonContainerRef.current.style.transform = `scale(0.55)`;
      return 0;
    }
    moonContainerRef.current.style.transform = `scale(1)`
    return 0;
  }

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      // downscroll code
      console.log('down');
    } else if (e.deltaY < 0) {
      // upscroll code
      console.log('up');
    } // else was horizontal scroll
  }

  return (
    <div className='container' onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })} onWheel={handleScroll}>
      {/* <animated.div className='cover-sheet' style={sheetSpring}></animated.div> */}
      <div className='title-text vt-align-center' ref={titleRef}>
        <Trail from={'left'}>
          <span>ABHINAV</span>
          <span>SANGA</span>
          <div className='line-divider top-divi'></div>
          <div className='line-divider bottom-divi'></div>
          <div className='role-div'>
            <span className='role-text'>software developer /</span>
          </div>
          <div className='role-div'>
            <span className='role-text'>web designer.</span>
          </div>
        </Trail>
      </div>
      {/* <div> */}
      <Trail from={'right'}>
        <div className='moon-container' ref={moonContainerRef}>
          <animated.div className='card1' style={{ transform: props.xy.interpolate(trans1) }} />
          <animated.div className='card2' style={{ transform: props.xy.interpolate(trans2) }} />
          <animated.div className='card3' style={{ transform: props.xy.interpolate(trans3) }} />
          <animated.div className='card4' style={{ transform: props.xy.interpolate(trans4) }} />
          <animated.div className='card5' style={{ transform: props.xy.interpolate(trans5) }} />
          <animated.div className='card6' style={{ transform: props.xy.interpolate(trans6) }} />
          <animated.h1 className='card7' style={{ transform: props.xy.interpolate(trans7) }}>PORTFOLIO</animated.h1>
          <animated.div className='card8' style={{ transform: props.xy.interpolate(trans1) }} />
        </div>
      </Trail>
      {/* </div> */}
    </div>
  )
}


