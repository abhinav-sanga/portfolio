import * as React from 'react';
import { useTrail, a } from '@react-spring/web';

const Trail = ({ children, type, anim, innerRef, titleSpringRef }) => {
  const items = React.Children.toArray(children);
  let isStart = false;
  let springConfig;
  const [finishedCount, setFinishedCount] = React.useState(0);

  const setupConfig = (type, anim) => {
    springConfig = type == 'title' ? {
      config: {
        mass: 0.5, tension: 3500, friction: 350
      },
      opacity: anim == 'left' ? 1 : 0,
      x: anim == 'left' ? 100 : -700,
      from: { opacity: anim == 'left' ? 0 : 1, x: anim == 'left' ? -700 : 100 },
      onRest: handleCallBack,////// CHECK THIS CODE. BECOZ OF WHICH NO SCROLL
    } : {
      config: {
        duration: anim == 'right' ? 1000 : 400,
      },
      opacity: anim == 'right' ? 1 : 0,
      x: 0,
      from: {
        opacity: anim == 'right' ? 0 : 1
      },
      onRest: handleCallBack,
    }

    springConfig.onStart = () => {
      isStart = true;
    }
    return springConfig;
  }

  const handleCallBack = React.useCallback(() => {
    if(finishedCount == 0) {
      setFinishedCount(finishedCount => finishedCount + 1)
    }
    
    if (finishedCount === items.length) {
      setFinishedCount(0);
    }
    isStart = false;
  }, [finishedCount, items.length])

  const handleTrail = (type, anim) => {
    if (type === 'moon' && anim === 'right') {
    }
    if (!isStart) {
      api.start(setupConfig(type, anim));
    }
  }

  React.useImperativeHandle(innerRef, () => ({
    handleTrail(type, anim) {
      handleTrail(type, anim)
    }
  }))

  const [trail, api] = useTrail(items.length, () => (setupConfig(type, anim)), [])
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

export default Trail;