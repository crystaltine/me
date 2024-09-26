import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';

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

type sizeSpecifier = { x: number, y: number };
const ALTERNATE_TITLES: ((s: sizeSpecifier, r: React.RefObject<HTMLHeadingElement>) => ReactNode)[] = [
	(s, r) => <h1 style={{width: s.x, height: s.y}} ref={r} className='hero-maintext'>Welcome!</h1>,
	(s, r) => <h1 style={{width: s.x, height: s.y}} ref={r} className='hero-maintext'>Greetings!</h1>,
	(s, r) => {
		const hours = new Date().getHours();
		const greeting = 
			(hours >=2 && hours < 12)? 'Good morning!' : 
			(hours >= 12 && hours < 18)? 'Good afternoon!' :
			'Good evening!';
		return <h1 ref={r} style={{width: s.x, height: s.y}} className='hero-maintext'>{greeting}</h1>
	},
];

const Homepage = () => {

	const maintext1Ref = useRef<HTMLHeadingElement>(null);
	const { theme } = useTheme();

	// the title that flashes in the hero section
	// alternates with main title (basically flashes 1, 2, 1, 3, 1, 4, 1, 2, ...)
	const [titleSwitchCounter, setTitleSwitchCounter] = useState(0);
	const [cachedMaintextSize, setCachedMaintextSize] = useState({ x: 0, y: 0 });

	/** snapshot size of maintext <h1>, then force that size
	* since title changes (which might cause the div to resize)
	* 
	* Update on every window resize
	*/
	const snapshotMaintextSize = useCallback(() => {
		const maintext1Ele = maintext1Ref.current;
		const sizeX = maintext1Ele?.clientWidth;
		const sizeY = maintext1Ele?.clientHeight;
		console.log(`caching size, element: ${maintext1Ele}, x: ${sizeX}, y: ${sizeY}`);
		setCachedMaintextSize({ x: sizeX || 0, y: sizeY || 0 });
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Home | Michael Sheng';

		// window.addEventListener('resize', snapshotMaintextSize);
		snapshotMaintextSize(); // initial call

		const titleSwitchInterval = setInterval(() => {
			snapshotMaintextSize();
			setTitleSwitchCounter((prev) => (prev + 1));
		}, 1500);

		return () => {
			clearInterval(titleSwitchInterval);
			// window.removeEventListener('resize', snapshotMaintextSize);
		}
	}, [snapshotMaintextSize])

	const smoothScrollToExperience = useCallback(() => {
		const experienceElement = document.getElementById('experience-scrollto');
		if (experienceElement) {
			experienceElement.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

	// on even counts, show normal, else switch between alternates
	const titleIndexToShow = titleSwitchCounter % 2 === 1?
		((Math.floor(titleSwitchCounter/2)) % ALTERNATE_TITLES.length) + 1 : 0;

  return (
    <GenericPage selected='Experience'>
			<div className='homepage-hero-backdrop'>
				<div className='homepage-hero-main'>

					<div className='homepage-hero-left'>

						
						<div className='homepage-hero-1-blur'>
							<div className='homepage-hero-1'>
								
								{/* This allows for the animation to play, using titleIndexToShow === 0? doesnt work lol */}
								{titleIndexToShow === 0 && <h1 ref={maintext1Ref} className='hero-maintext'><span className='hero-accent-col'>Hey!</span> I'm Michael!</h1>}
								{titleIndexToShow !== 0 && ALTERNATE_TITLES[titleIndexToShow - 1](cachedMaintextSize, maintext1Ref)}

								<p className='hero-faded-col'><span className='font-semibold'>B.S. Computer Science</span> @ Georgia Tech</p>
								<p className='hero-faded-col'>Currently <span className="text-red-500">&#10084;</span> RL, Web dev, Design</p>
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