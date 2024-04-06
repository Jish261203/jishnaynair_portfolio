import { useState } from 'react';
import './cursor.scss'
import { useEffect } from 'react';
import { motion } from 'framer-motion'

const Cursor = () => {
    const [postion, setPostion] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const mouseMove = (e) => {
            setPostion({x:e.clientX,y:e.clientY})
        }

        window.addEventListener("mousemove", mouseMove)
        
        return () => {
            window.removeEventListener("mousemove",mouseMove)
        }
    },[])


  return <motion.div className='cursor' animate={{x:postion.x+10,y:postion.y+10}}></motion.div>;
};

export default Cursor;
