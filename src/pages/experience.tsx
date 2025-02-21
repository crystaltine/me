import { useEffect } from 'react';
import '../styles/experience/experience.css';
import '../styles/experience/experienceCard.css';
import { GenericPage } from '../components/generics';
import { useTheme } from '../themeHook';

import _experienceData from '../content/experience/experiences.json';
const experienceData = _experienceData as ExperienceCardProps[];

import graphic5Light from '../assets/graphics/graphic5-light.png';
import graphic5Dark from '../assets/graphics/graphic5-dark.png';
import ExperienceCard, { ExperienceCardProps } from '../components/experienceCard';
import experienceIcon from '../assets/page_icons/experience-icon.png';
import { A } from '../a';

const ExperiencePage = () => {
	
	const { theme } = useTheme();

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Experience | Michael Sheng';
		A.c();
	}, [])
	
  return (
    <GenericPage selected='Experience'>

			<div className='page-hero'>
				<img src={experienceIcon} alt='Experience' className='page-hero-icon' />
				<img src={theme === 'light'? graphic5Light : graphic5Dark} alt='graphic' className='page-hero-graphic' />
				<h1 className='page-hero-title'>
					<span className='page-hero-title-muted'>msh~$</span>Experience
				</h1>

				<p className='experience-main-desc'>
					Featured work experiences and meaningful opportunities I've participated in! 
				</p>
			</div>

			<hr className='page-separator'/>
	
			<div className='experience-card-container section-medium section-bottom'>
				{experienceData.map((exp, index) => (
					<ExperienceCard key={index} {...exp} />
				))}
				<p className='experience-subtext'>
					... and more to come!
				</p>
			</div>

		</GenericPage>
  );
};

export default ExperiencePage;