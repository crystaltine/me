import { useEffect, useCallback } from 'react';

import '../styles/home/homepage.css';
import '../styles/home/experience.css';
import '../styles/home/homepage_compact.css';
import { GenericPage } from '../components/generics';

import _experienceData from '../content/experience/experiences.json';
const experienceData = _experienceData as ExperienceCardProps[];

import homepageHeroLight from '../assets/graphics/homepage-hero-light.png';
import homepageHeroDark from '../assets/graphics/homepage-hero-dark.png';

import graphic5Light from '../assets/graphics/graphic5-light.png';
import graphic5Dark from '../assets/graphics/graphic5-dark.png';

import experienceIcon from '../assets/page_icons/experience-icon.png';
import projectsIcon from '../assets/page_icons/projects-icon.png';
import artIcon from '../assets/page_icons/art-icon.png';
import resumeIcon from '../assets/page_icons/resume-icon.png';
import { useTheme } from '../themeHook';
import ExperienceCard, { ExperienceCardProps } from '../components/experienceCard';

const Homepage = () => {

	const { theme } = useTheme();

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Home | Michael Sheng';
	}, [])

	const smoothScrollToExperience = useCallback(() => {
		const experienceElement = document.getElementById('experience-scrollto');
		if (experienceElement) {
			experienceElement.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

  return (
    <GenericPage selected='Experience'>
			<div className='homepage-hero-backdrop'>
				<div className='homepage-hero-main'>

					<div className='homepage-hero-left'>

						
						<div className='homepage-hero-1-blur'>
							<div className='homepage-hero-1'>
								<h1 className='hero-maintext'><span className='hero-accent-col'>Hey!</span> I'm Michael!</h1>
								<p className='hero-faded-col'><span className='font-semibold'>B.S. Computer Science</span> @ Georgia Tech</p>
								<p className='hero-faded-col'><span className="text-red-500">&#10084;</span> AI, Web Dev, Design, Art</p>
							</div>
						</div>

						<div className='homepage-hero-2-blur'>
							<div className='homepage-hero-2'>
								<h6 className='homepage-hero-2-text'>Thanks for stopping by! Check out my...</h6>
								<div className='homepage-lg-icons-container'>
									<div className='link-invis icon-wrapper-link' onClick={smoothScrollToExperience}>
										<div className='homepage-lg-icon-wrapper lgi-0'>
											<img src={experienceIcon} alt='Experience' className='homepage-lg-icon' />
											<h6 className='homepage-lg-icon-text'>Experience</h6>
										</div>
									</div>
									<a className='link-invis icon-wrapper-link' href='/#/projects'>
										<div className='homepage-lg-icon-wrapper lgi-1'>
											<img src={projectsIcon} alt='Projects' className='homepage-lg-icon' />
											<h6 className='homepage-lg-icon-text'>Projects</h6>
										</div>
									</a>
									<a className='link-invis icon-wrapper-link' href='/#/art'>
										<div className='homepage-lg-icon-wrapper lgi-2'>
											<img src={artIcon} alt='Art' className='homepage-lg-icon' />
											<h6 className='homepage-lg-icon-text'>Art</h6>
										</div>
									</a>
									<a className='link-invis icon-wrapper-link' href='/#/resume'>
										<div className='homepage-lg-icon-wrapper lgi-3'>
											<img src={resumeIcon} alt='Resume' className='homepage-lg-icon' />
											<h6 className='homepage-lg-icon-text'>Resume</h6>
										</div>
									</a>
								</div>
							</div>
						</div>

					</div>

					<img src={theme === "dark"? homepageHeroDark : homepageHeroLight} alt='Hero' className='homepage-hero-img' />

				</div>
			</div>

			<hr id="experience-scrollto" className='homepage-separator' />

			<div className='page-hero'>
				<img src={experienceIcon} alt='Experience' className='page-hero-icon' />
				<img src={theme === 'light'? graphic5Light : graphic5Dark} alt='graphic' className='page-hero-graphic' />
				<h1 className='page-hero-title'>
					<span className='page-hero-title-muted'>msh~$</span>
					Experience
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

export default Homepage;