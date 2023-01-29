// import * as React from 'react'
// import { useScroll, animated, useSpring, useSpringValue } from '@react-spring/web'

// import styles from './styles.module.scss'

// const X_LINES = 40

// const PAGE_COUNT = 5

// const INITIAL_WIDTH = 20

// export default function App() {
//   const containerRef = React.useRef<HTMLDivElement>(null!)
//   const barContainerRef = React.useRef<HTMLDivElement>(null!)

//   React.useEffect(() => {
//     clipValue.start(100);
//   }, []);

//   const [textStyles, textApi] = useSpring(() => ({
//     y: '100%',
//   }))

//   const clipValue = useSpringValue(0, {
//     config: {
//       duration: 750
//     }
//   })

//   return (
//     <div ref={containerRef} className={styles.body}>
//       <div className={styles.animated__layers}>
//         <animated.div ref={barContainerRef} className={styles.bar__container}>
//           {Array.from({ length: X_LINES }).map((_, i) => (
//             <animated.div
//               key={i}
//               className={styles.bar}
//               style={{
//                 width: clipValue.to(val => {
//                   const percentilePosition = (i + 1) / X_LINES

//                   return INITIAL_WIDTH / 4 + 40 * Math.cos(((percentilePosition - val/100) * Math.PI) / 1.5) ** 32
//                 }),
//                 opacity: clipValue.to((val) => {
//                   return `${100 - val}%`;
//                 })
//               }}
//             />
//           ))}
//         </animated.div>
//         <animated.div className={styles.bar__container__inverted}>
//           {Array.from({ length: X_LINES }).map((_, i) => (
//             <animated.div
//               key={i}
//               className={styles.bar}
//               style={{
//                 width: clipValue.to(val => {
//                   const percentilePosition = 1 - (i + 1) / X_LINES

//                   return INITIAL_WIDTH / 4 + 40 * Math.cos(((percentilePosition - val/100) * Math.PI) / 1.5) ** 32
//                 }),
//                 opacity: clipValue.to((val) => {
//                   return `${100 - val}%`;
//                 })
//               }}
//             />
//           ))}
//         </animated.div>
//         <animated.div
//           className={styles.dot}
//           style={{
//             clipPath: clipValue.to((val) => {
//               if (val > 70) {
//                 textApi.start({ y: '0' })
//               }
//               return `circle(${val}%)`
//             })
//           }}>
//           <h1 className={styles.title}>
//             <span>
//               <animated.span style={textStyles}>ABHINAV</animated.span>
//             </span>
//             <span>
//               <animated.span style={textStyles}>SANGA</animated.span>
//             </span>
//           </h1>
//         </animated.div>
//       </div>
//       {new Array(PAGE_COUNT).fill(null).map((_, index) => (
//         <div className={styles.full__page} key={index} />
//       ))}
//     </div>
//   )
// }