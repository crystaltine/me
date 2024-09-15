import React from 'react';
import '../styles/projects/card.css';
import SkillTag from './skillTag';
import IconLink from './iconLink';

export interface ProjectCardProps {
	title: string;
	desc: string;
	tags: string[];
	image: string;
	links: { [key: string]: string};
}

const ProjectCard = (props: ProjectCardProps) => {
	
	const [image, setImage] = React.useState<string>('');
	React.useEffect(() => {
		
		import(`../content/projects/images/${props.image}.png`).then((image) => {
			setImage(image.default);
		}).catch(() => {
			fetch("https://placehold.co/300x200").then((res) => {
				setImage(res.url);
			})});
		}, [props.image]);

	return (
		<div className='project-page-card'>
			{image && <img className='card-preview' src={image} alt={props.title} />}
			
			<h2 className='card-title'>{props.title}</h2>
			<p className='card-desc'>{props.desc}</p>

			<div className='card-tags-container'>
				{props.tags.map((tag, idx) => (
					<SkillTag key={idx} tag={tag} />
				))}
			</div>

			<div className='card-links-container'>
				{Object.keys(props.links).map((key, idx) => {
					return (
						<div key={idx} className='inline'>
							{idx !== 0 && <span className='mx-2'>&#183;</span>}
							<IconLink href={props.links[key]} icon={key} name={key} /> 
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProjectCard;