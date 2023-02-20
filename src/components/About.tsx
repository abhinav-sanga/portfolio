import * as React from 'react';
import { animated } from '@react-spring/web'
import Typewriter from 'typewriter-effect';

import Trail from './Trail';
  
  export default function About({innerRef, titleSpringRef}) {
    const aboutRef = React.useRef<any>();
    const aboutTrailRef = React.useRef<any>();

    React.useImperativeHandle(innerRef, () => ({
      handleTrail(type, anim) {
        aboutTrailRef.current.handleTrail(type, anim);
      }
    }))

    return (
      <div>
        <div className='title-text vt-align-center contact-title' ref={aboutRef}>
          <Trail type={'title'} anim={'left'} innerRef={aboutTrailRef} titleSpringRef={titleSpringRef}>
            <span>About Me</span>
            <div className='line-divider top-divi'></div>
            <div className='line-divider bottom-divi'></div>
            <div className='role-div'>
              <span className='role-text'> I'm proficient in </span>
              <span className="role-text"><Typewriter options={{
                strings: ['Angular', 'React', 'Node.js', 'Python', 'HTML', 'CSS'],
                autoStart: true,
                loop: true
              }} /></span>
            </div>
            <div className='role-div'>
              {/* <div className='brands-list contact-brands'>
                <a href="https://in.linkedin.com/in/abhinav-sanga-21a285129" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/abhinav-sanga" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                <a href="https://www.instagram.com/abhi_sanga/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
              </div> */}
            </div>
          </Trail>
        </div>
        {/* <animated.div className='contact-picture'
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
      </animated.div> */}
      </div>
    )
  }