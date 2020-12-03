import React, { useEffect, useState } from 'react'

function Learnhook() {
       const [windoWidth,setwindoWidth]=    useState(window.innerWidth);
      
       const handleResize= () => {
           setwindoWidth(window.innerWidth)
       }

       useEffect(() => {
            
         window.addEventListener('resize',handleResize)
   
         return () => {
          window.removeEventListener('resize',handleResize)
      }
 
    },[])
       return (
      
        <div>{windoWidth}</div>

    )
}

export default Learnhook
