import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

import './Header.css';

export default function Header() {
    return (
        <div className='header-container'>
            <div className='header-title'>
                Abhinav Sanga
            </div>
            <div className='brands-list'>
                <a href="https://in.linkedin.com/in/abhinav-sanga-21a285129" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/abhinav-sanga" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                <a href="https://www.instagram.com/abhi_sanga/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
        </div>
    )
}