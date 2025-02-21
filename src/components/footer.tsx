import React from "react";
import "../styles/footer/footer.css";
import "../styles/footer/footer_compact.css";

// icon imports
import emailIcon from '../assets/svgs/email-icon.svg';
import githubIcon from '../assets/svgs/github-icon.svg';
import linkedinIcon from '../assets/svgs/linkedin-icon.svg';
import discordIcon from '../assets/svgs/discord-icon.svg';
// import deviantartIcon from '../assets/svgs/deviantart-icon.svg';
import instagramIcon from '../assets/svgs/instagram-icon.svg';

import copyIcon from '../assets/svgs/copy.svg';
import checkIcon from '../assets/svgs/check.svg';

const Footer = () => {
	
	const [showCheckIconForEmail, setShowCheckIconForEmail] = React.useState(false);

  return (
		<div className='footer-container'>
			<div className="footer-body">
				<div className="footer-hero-container">
					<h2 className="footer-maintext">Thanks for visiting!</h2>
					<div>Let's keep in touch! &rarr;</div>
					<div>
						Made with&nbsp;
						<span className="text-red-500">&#10084;</span>
						&nbsp;by&nbsp;
						<a className='link' href='https://github.com/crystaltine' target='_blank' rel="noopener noreferrer">crystaltine (me!)</a>
					</div>
				</div>
				
				<div className="footer-links-container">
					<a 
					className="footer-link" 
					onClick={() => {
						navigator.clipboard.writeText("msh379c@outlook.com");
						setShowCheckIconForEmail(true);
					}}
					onMouseEnter={() => setShowCheckIconForEmail(false)}>
						<img className="footer-link-icon invert-on-light-theme" src={emailIcon} alt="email" />
						<span>msh379c@outlook.com</span>
						<span className="footer-nbsp">&nbsp;</span>
						{showCheckIconForEmail?
							<img className="check-icon invert-on-dark-theme" src={checkIcon} alt="success" /> :
							<img className="copy-icon invert-on-dark-theme" src={copyIcon} alt="copy" />
						}
					</a>
					<a className="footer-link" href="https://github.com/crystaltine" target="_blank" rel="noopener noreferrer">
						<img className="footer-link-icon" src={githubIcon} alt="github" />
						<span>crystaltine &#8599;</span>
					</a>
					<a className="footer-link" href="https://www.linkedin.com/in/msh379/" target="_blank" rel="noopener noreferrer">
						<img className="footer-link-icon" src={linkedinIcon} alt="linkedin" />
						<span>msh379 &#8599;</span>
					</a>
					{/*<a className="footer-link" href="https://www.deviantart.com/crystaltine" target="_blank" rel="noopener noreferrer">
						<img className="footer-link-icon" src={deviantartIcon} alt="deviantart" />
						<span>crystaltine &#8599;</span>
					</a>*/}
					<a className="footer-link" href="https://www.instagram.com/michaelsh379/" target="_blank" rel="noopener noreferrer">
						<img className="footer-link-icon" src={instagramIcon} alt="instagram" />
						<span>michaelsh379 &#8599;</span>
					</a>
					<div className="footer-link">
						<img className="footer-link-icon" src={discordIcon} alt="discord" />
						<span>crystaltine</span>
					</div>
				</div>

			</div>
		</div>
  );
};

export default Footer;