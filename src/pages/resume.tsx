import React from 'react';
import '../styles/resume/resumePage.css';
import { GenericPage } from '../components/generics';
import { useTheme } from '../themeHook';
import icon from '../assets/resume-icon.png';

import graphic2Light from '../assets/graphic2-light.png';
import graphic2Dark from '../assets/graphic2-dark.png';

import downloadIcon from '../assets/download.svg';
import linkIcon from '../assets/external-link.svg';
import copyIcon from '../assets/copy.svg';
import checkIcon from '../assets/check.svg';

import resumePreview from '../content/resume/resume_preview.jpg';

const resumeTimestamp = "9 September 2024";

const ResumePage = () => {
	
	const [showCheckIconForCopy, setShowCheckIconForCopy] = React.useState(false);
	const { theme } = useTheme();

  return (
    <GenericPage selected='Resume'>
			<div className='page-hero'>
				<img src={icon} alt='Resume' className='page-hero-icon' />
				<img src={theme === 'light'? graphic2Light : graphic2Dark} alt='graphic' className='page-hero-graphic' />
				<h1 className='page-hero-title'>
					<span className='page-hero-title-muted'>msh~$</span>
					Resume
				</h1>
				<div className='resume-main-desc'>Thank you for your interest! Get a copy of my current resume below:</div>
			</div>

			<hr className='page-separator fadein_0_6'/>

			<div className='resume-page-content section-medium section-bottom'>
				<img src={resumePreview} alt="Resume Preview" className='resume-preview-img' />
				<div className='resume-preview-right'>
					<h1 className='resume-preview-title'>Current Resume</h1>
					<p className='resume-timestamp'>Last updated {resumeTimestamp}</p>

					<div className='resume-actions-container'>
						<a className='link-invis' download href="src/content/resume/MS_Resume_PDF_I.pdf" target="_blank" rel="noopener noreferrer">
							<button className='button-primary button-medium'>
								<img className="muted-icon invert" src={downloadIcon} alt="download" />
								&nbsp;Download PDF
							</button>
						</a>

						<a className='link-invis' href="src/content/resume/MS_Resume_PDF_I.pdf" target="_blank" rel="noopener noreferrer">
							<button className='button-primary button-medium'>
								<img className="muted-icon invert" src={linkIcon} alt="view" />
								&nbsp;View File
							</button>
						</a>

						<button 
						className='button-secondary button-medium'
						onClick={() => {
							navigator.clipboard.write([new ClipboardItem({ "image/png": resumePreview })]).then(() => {
								setShowCheckIconForCopy(true);
							});
						}}
						onMouseEnter={() => setShowCheckIconForCopy(false)}>
							{showCheckIconForCopy?
								<img className="check-icon invert-on-dark-theme" src={checkIcon} alt="success" /> :
								<img className="muted-icon invert-on-dark-theme" src={copyIcon} alt="copy" />
							}&nbsp;
							Copy Image
						</button>
					</div>

				</div>
			</div>
				
		</GenericPage>
  );
};

export default ResumePage;