import * as React from 'react'
import { animated } from '@react-spring/web'

import Trail from './Trail';
import './LandingPage.css';

export default function LandingPage({ innerRef, titleSpringRef }) {
  const titleRef = React.useRef<any>();
  const titleTrailRef = React.useRef<any>();
  const mainRef = React.useRef<any>();
  React.useImperativeHandle(innerRef, () => ({
    handleTrail(type, anim) {
      titleTrailRef.current.handleTrail(type, anim);
    }
  }))

  React.useEffect(() => {})

  return (
    <animated.div ref={mainRef}>
      <div className='title-text vt-align-center' ref={titleRef}>
        <Trail type={'title'} anim={'left'} innerRef={titleTrailRef} titleSpringRef={titleSpringRef}>
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
    </animated.div>
  )
}


