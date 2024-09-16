import { useEffect } from 'react';
import '../styles/projects/projectsPage.css';
import '../styles/art/artPage.css';
import { GenericPage } from '../components/generics';
import { useTheme } from '../themeHook';
import ProjectCard, { ProjectCardProps } from '../components/projectCard';
import SkillTag from '../components/skillTag';

import icon from '../assets/page_icons/projects-icon.png';
import graphic4Light from '../assets/graphics/graphic4-light.png';
import graphic4Dark from '../assets/graphics/graphic4-dark.png';

import _projectsData from '../content/projects/projects.json';
const projectsData = _projectsData as ProjectCardProps[]; // so ts doesnt complain

import _projectTags from '../content/projects/projectTags.json';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
const projectTags = _projectTags as { [key: string] : {name: string, color: string, icon: string }};

const ProjectsPage = () => {
	
	const { theme } = useTheme();

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Projects | Michael Sheng';
	}, [])

  return (
    <GenericPage selected='Projects'>

			<div className='page-hero'>
				<img src={icon} alt='Projects' className='page-hero-icon' />
				<img src={theme === 'light'? graphic4Light : graphic4Dark} alt='graphic' className='page-hero-graphic' />
				<h1 className='page-hero-title'>
					<span className='page-hero-title-muted'>msh~$</span>
					Projects
				</h1>

				<div className='projects-main-desc fadein_0_6'>
					Fun and interesting stuff I've built! Below is a list of languages, skills, and tools I'm
					most familiar with in my personal projects/experiences:
					<div className='mt-6 project-page-tags-container fadein_0_6'>
						{Object.keys(projectTags).map((tagKey: string) => {
							return <SkillTag key={tagKey} tag={tagKey}/>
						})}
					</div>
					<div className='mt-6 boxedtext-primary fadein_0_6'>
						Find more projects on <a href='https://github.com/crystaltine' target='_blank' rel='noreferrer'>my GitHub</a>!
					</div>
				</div>

			</div>
			
			<hr className='page-separator fadein_0_6' />
				
			<div className='project-page-cards-container section-medium section-bottom'>
				<ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2}}>
					<Masonry gutter='2rem'>
						{projectsData.map((project) => {
							return <ProjectCard key={project.title} {...project} />;
						})}
					</Masonry>
				</ResponsiveMasonry>
			</div>

		</GenericPage>
  );
};

export default ProjectsPage;