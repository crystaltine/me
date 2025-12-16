import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';

import '../styles/home/homepage.css';
import '../styles/home/homepage_compact.css';
import { GenericPage } from '../components/generics';

import homepageHeroLight from '../assets/graphics/homepage-hero-light.png';
import homepageHeroDark from '../assets/graphics/homepage-hero-dark.png';

import graphic3Light from '../assets/graphics/graphic3-light.png';
import graphic3Dark from '../assets/graphics/graphic3-dark.png';

import homeIcon from '../assets/page_icons/home-icon.png';
import projectsIcon from '../assets/page_icons/projects-icon.png';
import experienceIcon from '../assets/page_icons/experience-icon.png';
import resumeIcon from '../assets/page_icons/resume-icon.png';
import { useTheme } from '../themeHook';

import portraitImg from '../assets/portrait.jpg';
import { A } from '../a';

const TITLE_BLINK_INTERVAL = 3; // seconds

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
	(s, r) => <h1 style={{width: s.x, height: s.y}} ref={r} className='hero-maintext'>Hello! :D</h1>,
];

const Homepage = () => {
	useEffect(()=>A.c,[]);
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
		// console.log(`caching size, element: ${maintext1Ele}, x: ${sizeX}, y: ${sizeY}`);
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
		}, 1000 * TITLE_BLINK_INTERVAL);

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
    <GenericPage selected='Home'>
			<div className='homepage-hero-backdrop'>
				<div className='homepage-hero-main'>

					<div className='homepage-hero-left'>
		
						<div className='homepage-hero-1-blur'>
							<div className='homepage-hero-1'>
								
								{/* This allows for the animation to play, using titleIndexToShow === 0? doesnt work lol */}
								{titleIndexToShow === 0 && <h1 ref={maintext1Ref} className='hero-maintext'><span className='hero-accent-col'>Hey!</span> I'm Michael!</h1>}
								{titleIndexToShow !== 0 && ALTERNATE_TITLES[titleIndexToShow - 1](cachedMaintextSize, maintext1Ref)}

								<p className='hero-faded-col'><span className='font-semibold'>B.S. Computer Science</span> @ Georgia Tech</p>
								<p className='hero-faded-col'>
									<span className="text-red-500">&#10084;</span> Fullstack, Graphics, Trading
								</p>
							</div>
						</div>

						<div className='homepage-hero-2-blur'>
							<div className='homepage-hero-2'>
								<h6 className='homepage-hero-2-text'>Thanks for stopping by! Check out my...</h6>
								<div className='homepage-lg-icons-container'>
									<div className='link-invis icon-wrapper-link' onClick={smoothScrollToExperience}>
										<div className='homepage-lg-icon-wrapper lgi-0'>
											<img src={homeIcon} alt='Bio' className='homepage-lg-icon' />
											<h6 className='homepage-lg-icon-text'>Bio</h6>
										</div>
									</div>
									<a className='link-invis icon-wrapper-link' href='/#/experience'>
										<div className='homepage-lg-icon-wrapper lgi-1'>
											<img src={experienceIcon} alt='Experience' className='homepage-lg-icon' />
											<h6 className='homepage-lg-icon-text'>Experience</h6>
										</div>
									</a>
									<a className='link-invis icon-wrapper-link' href='/#/projects'>
										<div className='homepage-lg-icon-wrapper lgi-2'>
											<img src={projectsIcon} alt='Projects' className='homepage-lg-icon' />
											<h6 className='homepage-lg-icon-text'>Projects</h6>
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
				<img src={homeIcon} alt='Bio' className='page-hero-icon' />
				<img src={theme === 'light'? graphic3Light : graphic3Dark} alt='graphic' className='page-hero-graphic' />
				<h1 className='page-hero-title'>
					<span className='page-hero-title-muted'>msh:~$</span>About Me
				</h1>
				<p className='aboutme-main-desc'>
					A bit about my interests, goals, and random fun things...
				</p>
			</div>

			<hr className='page-separator'/>
	
			<div className='section-medium section-bottom aboutme-bio-top'>
				<div>
					<h2>Hey there!</h2>
					<p className='text-muted'>
						I'm Michael Sheng, currently in my second year studying CS @ Georgia Tech. I'm experienced in full-stack and especially frontend development, 
						and I love working on software applications in general. I also love working on graphics projects (currently  
						building <a href="https://Github.com/crystaltine/graphling" target='_blank' rel="noopener noreferrer">Graphling</a>). 
						Additionally, I'm interested in research in decision-making AI and Reinforcement learning,
						and I'm currently working on human perception modeling at the Rahnev Lab here at GT. 
						On the personal side, I love drawing, speedrunning, walking, trading stocks, and writing game AI!
						<br /><br />
						Alongside being an RA at Rahnev, I recently completed a software engineering internship at
						at <a href='https://carbon3d.com' target='_blank' rel='noopener noreferrer'>Carbon</a>,
						where I worked on a full-stack system for a new 3D printing post-processing machine. It was a truly 
						amazing experience and I learned so much working on the most diverse and multidisciplinary team I've 
						ever been a part of.
						<br /><br />
						I'm now co-directing the technology team for HackGT 13, Georgia Tech's premier student-run hackathon! Last year we had over 1,200 participants
						and I'm excited to make next year even better.
						<br /><br />
						I'm also a developer and frontend lead at <a href="https://bytefight.org">ByteFight</a>, Georgia Tech's largest AI competition.
						We hold monthlong programming competitions where players submit game-playing agents and compete on a leaderboard with intense tournaments and cash prizes!
						<br /><br />
						Thanks for checking out my site. Feel free to explore my projects, experiences, and resume!
					</p>
				</div>
				<img src={portraitImg} alt='Portrait' className='portrait-img' />
			</div>

			{/*<div className='section-medium section-bottom'>
				<h3 className='text-center w-full'>Other things about me...</h3>
				<RandomAboutMeScroller />
			</div>*/}

		</GenericPage>
  );
};

export default Homepage;
