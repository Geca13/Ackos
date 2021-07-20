import React, { useEffect, useState,useRef } from 'react'
import {FaBars, FaTwitter } from 'react-icons/fa'
import { links ,social} from '../api/links'

const Navbar =() => {

   const [showLinks, setShowLinks] = useState(false);
   const linksContainerRef = useRef(null);
   const linksRef = useRef(null);

   useEffect(()=>{
    const linksHeight = linksRef.current.getBoundingClientRect().height
    if(showLinks) {
       linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
       linksContainerRef.current.style.height = '0px'
    }
   },[showLinks])
        return (
            <nav >
               <div className='nav-center'>
                <div className='nav-header'>
                   <button className='nav-toggle' onClick={()=> setShowLinks(!showLinks)}>
                     
                   </button>
                </div>
                <div className='links-container' ref={linksContainerRef}>
                  <ul className='links' ref={linksRef}>
                    {links.map((link)=>{
                     const { id , url, text}= link; 
                      return (
                       <li key={id}>
                         <a href={url}>
                            {text}
                         </a>
                       </li>
                       )
                    })}
                   </ul>
                </div>
                  <ul className='social-icons'>
                    {social.map((media) =>{
                     const {id, url ,icon} = media;
                      return (
                       <li key={id}>
                         <a href={url}>
                            {icon}
                         </a>
                       </li>
                       )
                     })}
                  </ul>
               </div>
            </nav>
        );
    }


export default Navbar;