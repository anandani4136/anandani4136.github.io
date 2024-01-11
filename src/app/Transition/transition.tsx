"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './transition.module.css'
import 'animate.css'
import { throttle } from 'lodash';


export default function Transition() {
    const [color, setColor] = useState('blue');
    const [transPercent, setTransPercent] = useState(0);
    const [textOpacity, setTextOpacity] = useState(0);
    const [text2Opacity, setText2Opacity] = useState(0);
    const [text3Opacity, setText3Opacity] = useState(0);
    const [endTextOpacity, setEndTextOpacity] = useState(0);
    const [aboveMiddle, setAboveMiddle] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const textRef = useRef(null);
    const textRef2 = useRef(null);
    const textRef3 = useRef(null);
    const endTextRef = useRef(null);
    const [zIdx, setZIdx] = useState(-1);
    const divRef = useRef(null); // Ref to the target div

    useEffect(() => {
        const handleScroll = throttle(() => {
            setScrollPosition(window.scrollY);
            const windowHeight = window.innerHeight;
            const middleScreen = windowHeight / 2;


            if (textRef.current) {
                const divRect = (textRef.current as HTMLElement).getBoundingClientRect();
                const divTop = divRect.top;
                const divBottom = divRect.bottom;
        
                if (divTop < 1.5*middleScreen && divBottom > 0.5*middleScreen) {
                //   console.log(divTop + " " + divBottom);
                  // Calculate opacity based on distance to the middle of the screen
                  const distanceToMiddle = middleScreen - (divTop + divRect.height / 2);
                  const newOpacity = 1 - (6 * Math.abs(distanceToMiddle) / windowHeight);
                  setAboveMiddle(distanceToMiddle < 0);
                  setTextOpacity(Math.max(0, newOpacity));
                } else {
                  setTextOpacity(0);
                }
            }

            if (textRef2.current) {
                const divRect = (textRef2.current as HTMLElement).getBoundingClientRect();
                const divTop = divRect.top;
                const divBottom = divRect.bottom;
        
                if (divTop < 1.5*middleScreen && divBottom > 0.5*middleScreen) {
                //   console.log(divTop + " " + divBottom);
                  // Calculate opacity based on distance to the middle of the screen
                  const distanceToMiddle = middleScreen - (divTop + divRect.height / 2);
                  const newOpacity = 1 - (6 * Math.abs(distanceToMiddle) / windowHeight);
                  setText2Opacity(Math.max(0, newOpacity));
                } else {
                  setText2Opacity(0);
                }
            }

            if (textRef3.current) {
                const divRect = (textRef3.current as HTMLElement).getBoundingClientRect();
                const divTop = divRect.top;
                const divBottom = divRect.bottom;
        
                if (divTop < 1.5*middleScreen && divBottom > 0.5*middleScreen) {
                //   console.log(divTop + " " + divBottom);
                  // Calculate opacity based on distance to the middle of the screen
                  const distanceToMiddle = middleScreen - (divTop + divRect.height / 2);
                  const newOpacity = 1 - (6 * Math.abs(distanceToMiddle) / windowHeight);
                  setText3Opacity(Math.max(0, newOpacity));
                } else {
                  setText3Opacity(0);
                }
            }

            if (endTextRef.current) {
                const divRect = (endTextRef.current as HTMLElement).getBoundingClientRect();
                const divTop = divRect.top;
                const divBottom = divRect.bottom;
        
                if (divTop < 1.5*middleScreen && divBottom > 0.5*middleScreen) {
                //   console.log(divTop + " " + divBottom);
                  // Calculate opacity based on distance to the middle of the screen
                  const distanceToMiddle = middleScreen - (divTop + divRect.height / 2);
                  const newOpacity = 1 - (6 * Math.abs(distanceToMiddle) / windowHeight);
                  setEndTextOpacity(Math.max(0, newOpacity));
                } else {
                  setEndTextOpacity(0);
                }
            }

            if (divRef.current) {
                const divRect =  (divRef.current as HTMLElement).getBoundingClientRect();
                const divTop = divRect.top + window.scrollY;
                const windowHeight = window.innerHeight + window.scrollY;
                // console.log(divTop + " " + window.scrollY);
                // console.log(windowHeight);

                if (divTop <= windowHeight) {
                    // The div is now in the viewport
                    const scrollDistance = windowHeight - divTop;
                    const maxScroll = 355; // Adjust as needed
                    // const newOpacity = Math.max(0, scrollDistance / maxScroll);
                    // setTransPercent(newOpacity);
                    // console.log(scrollDistance / divRect.height);
                    setTransPercent(4 * (scrollDistance / divRect.height));
                    // setColor(`rgba(0, 0, 255, ${newOpacity})`);
                }
            } else {
                // The div is not in the viewport
                if (aboveMiddle) {
                    setTransPercent(0);
                } else {
                    setTransPercent(4);
                }
            }
            requestAnimationFrame(handleScroll);
        }, 130);

        window.addEventListener('scroll', handleScroll);
        requestAnimationFrame(handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    interface Color {
        r: number;
        g: number;
        b: number;
    }

    function interpolateColor(value : number) {
        // Ensure value is within 0 to 1
        value = Math.max(0, Math.min(1, value));
    
        // Define start and end colors in RGB
        const startColor1 = { r: 0, g: 0, b: 0 }; // #000000
        const midColor = { r: 115, g: 115, b: 115 }; // #737373
        const endColor = { r: 230, g: 230, b: 230 }; // #e6e6e6
    
        // Function to interpolate between two colors
        const interpolate = (start: Color, end: Color, t: number) => ({
            r: Math.round(start.r + (end.r - start.r) * t),
            g: Math.round(start.g + (end.g - start.g) * t),
            b: Math.round(start.b + (end.b - start.b) * t)
        });
    
        // Determine which colors to use based on the input value
        let color;
        if (value < 0.5) {
            // Scale value to range from 0 to 1 for the first half
            const scaledValue = value * 2;
            color = interpolate(startColor1, midColor, scaledValue);
        } else {
            // Scale value to range from 0 to 1 for the second half
            const scaledValue = (value - 0.5) * 2;
            color = interpolate(midColor, endColor, scaledValue);
        }
    
        // Convert RGB to Hex
        const toHex = (c : number) => c.toString(16).padStart(2, '0');
        return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
    }

    function getTransformStyle(transPercent : number) {
        // Example multi-step transformation
        if (transPercent < 1) {
            // 0% to 25%: No transformation
            return '';
        }

        if (transPercent > 1 && transPercent < 2) {
          // First 25%: Scale transformation
        //   console.log(transPercent/1.3);
          const scale = Math.max(0.6, 1.5 - (transPercent/1.5));//(transPercent / 1);
          const rotate = (transPercent) * 18;
          return `scale(${scale}) translateY(${80*(transPercent-1)}%) translateX(${130*(transPercent-1)}%) rotate3d(10, 2, 1, ${rotate}deg)`;
        } else if (transPercent > 2 && transPercent < 3) {
          // 25% to 50%: Rotate transformation
        //   const rotate = (transPercent) * 3.6; // Rotate up to 90 degrees
        //   return `rotate3d(0, 1, 1, ${rotate}deg) `
          return `scale(0.6) translateY(${80}%) translateX(${120 + -200*(transPercent-2)}%)`;
        } else if (transPercent > 3) {
            // 50% to 75%: TranslateX transformation
            // console.log(interpolateColor(transPercent-3));
            return `scale(0.6) translateY(80%) translateX(-150%)`;
        }
        // if (transPercent > 3) {
        //   // 50% to 75%: TranslateX transformation
        //   const translateX = (transPercent - 2) * 4; // Translate up to 100px
        //   return `translateX(${translateX}px)`;
        // } else 
        else {
          // 75% to 100%: Opacity transformation
          const opacity = 1 - ((transPercent - 3) / 25);
          return `opacity(${opacity})`;
        }
      }
      
      const transformStyle = getTransformStyle(transPercent);

    return (
        <div ref={divRef} id="main" className={styles.main} style={{display: transPercent < 0 ? 'none' : '', backgroundColor: (transPercent > 3) ? `${interpolateColor(transPercent - 3)}` : ''}}>
            {/* <div className={styles.fadeBox}> */}
                <div id="square" className={styles.square} 
                style={{ 
                    // borderColor: color, 
                    opacity: transPercent, 
                    filter: `blur(${transPercent < 1 ? 45*(1-transPercent): 0}px)`, 
                // position: transPercent>=1 ? 'fixed' : 'relative',
                display: transPercent>=-1 ? 'flex' : 'none',
                zIndex: transPercent>=1 ? 0 : -1 ,
                transform: transformStyle,
                // transform: `scale(${transPercent > 1 && transPercent < 4 ? Math.max(0.4, transPercent/1.3) : 1}) rotate3d(0, 1, 1, ${transPercent > 1 && transPercent < 4 ? 70*(transPercent-1) : 0}deg) translateX(${transPercent > 1 && transPercent < 4 ? 100*(transPercent-1) : 0}px) translateY(${transPercent > 1 && transPercent < 4 ? 100*(transPercent-1) : 0}px)`
                }}>
                    <h2 className={styles.box} style={{display: transPercent > 2 ? 'flex' : 'none'}}>box</h2>
                    {/* <div className={`${styles.cubeFace} ${styles.cubeFaceFront}`}>front</div>
                    <div className={`${styles.cubeFace} ${styles.cubeFaceBack}`}>back</div>
                    <div className={`${styles.cubeFace} ${styles.cubeFaceRight}`}>right</div>
                    <div className={`${styles.cubeFace} ${styles.cubeFaceLeft}`}>left</div>
                    <div className={`${styles.cubeFace} ${styles.cubeFaceTop}`}>top</div>
                    <div className={`${styles.cubeFace} ${styles.cubeFaceBottom}`}>bottom</div> */}
                    {/* <div className="cube__face cube__face--front">front</div> */}
                    {/* <div className="cube__face cube__face--back">back</div>
                    <div className="cube__face cube__face--right">right</div>
                    <div className="cube__face cube__face--left">left</div>
                    <div className="cube__face cube__face--top">top</div>
                    <div className="cube__face cube__face--bottom">bottom</div> */}
                </div>
            {/* </div> */}
            <div ref={textRef} className={styles.text1} style={{opacity: textOpacity}}>
                <h2>and bring unique ideas into <b style={{filter: `blur(${aboveMiddle ? 12*(1-textOpacity) : 0}px)`}}>focus</b></h2>
            </div>
            <div ref={textRef2} className={styles.text2} style={{opacity: text2Opacity}}>
                <h2>Exploring diverse and inventive solutions</h2>
            </div>
            <div ref={textRef3} className={styles.text3} style={{opacity: text3Opacity}}>
                <h2>thinking out of the</h2>
            </div>
            <div ref={endTextRef} className={styles.endText} style={{opacity: endTextOpacity}}>
                <h2>and always ready to adapt.</h2>
            </div>
        </div>
    );
}