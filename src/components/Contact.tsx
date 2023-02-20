import * as React from 'react';
import { animated, useSpring, useSpringValue } from '@react-spring/web'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

import Trail from './Trail';
import './LandingPage.css'
import './Contact.css'
import './App.css'
import profilePic from '../img/profile-pic.jpeg';

export default function Contact({ titleSpringRef, innerRef }) {
  const pictureRef = React.useRef<any>();
  const [springValue, reset] = React.useState(1);
  const picProps = useSpringValue(springValue, {
    config: { tension: 280, friction: 120 }
  })
  const [{ xys }, api] = useSpring(() => ({
    xys: [0, 0, 1], config: {
      mass: 1,
      tension: 170,
      friction: 60
    }
  }), [])

  const contactRef = React.useRef<any>();
  const contactTrailRef = React.useRef<any>();

  React.useEffect(() => {
    picProps.start(window.innerWidth < 1065 && window.innerWidth >= 661 ? 1.12 : 1.25);
  }, [])

  React.useImperativeHandle(innerRef, () => ({
    handleTrail(type, anim) {
      contactTrailRef.current.handleTrail(type, anim);
      picProps.reset();
    }
  }))

  const handleMouseLeave = () =>
    api.start({
      xys: [0, 0, 1],
    })

  const calc = (x, y, rect) => [
    -(y - rect.top - rect.height / 2) / 80,
    (x - rect.left - rect.width / 2) / 80,
    1
  ]

  const handleMouseMove = e => {
    const rect = pictureRef.current.getBoundingClientRect()
    api.start({
      xys: calc(e.clientX, e.clientY, rect),
    })
  }

  const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

  return (
    <div>
      <div className='title-text vt-align-center contact-title' ref={contactRef}>
        <Trail type={'title'} anim={'left'} innerRef={contactTrailRef} titleSpringRef={titleSpringRef}>
          <span>Get In</span>
          <span>Touch</span>
          <div className='line-divider top-divi'></div>
          <div className='line-divider bottom-divi'></div>
          <div className='role-div'>
            <span className='role-text'>abhinava.srirajan@gmail.com</span>
          </div>
          <div className='role-div'>
            <div className='brands-list contact-brands'>
              <a href="https://in.linkedin.com/in/abhinav-sanga-21a285129" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://github.com/abhinav-sanga" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="https://www.instagram.com/abhi_sanga/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
        </Trail>
      </div>
      <animated.div className='contact-picture'
        style={{
          transform: picProps.to(val => { return `scale(${val}) translateX(${-val * 5}%) translateZ(0)` })
        }}
      >
        <animated.img src={profilePic}
          alt="Abhinav Sanga"
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          ref={pictureRef}
          style={{ transform: xys.to(trans) }} />
      </animated.div>
    </div>
  )
}