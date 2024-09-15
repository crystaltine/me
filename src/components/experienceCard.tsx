import React from 'react';
import '../styles/home/experienceCard.css';
import { Popup } from './popup';
import SkillTag from './skillTag';

export interface ExperienceCardProps {
	sectionId: string;
	title: string;
	role: string;
	dates: string;
	location: string;
	tags: string[];
	overview: string;
	descFile: string;
	image: string;
}

const ExperienceCard = (props: ExperienceCardProps) => {

	const [popupOpen, setPopupOpen] = React.useState<boolean>(false);
	const [image, setImage] = React.useState<string>('');
	const [desc, setDesc] = React.useState<string>('');

	React.useEffect(() => {
		// must be hardcoded to satisfy vite dynamic import
		import(`../content/experience/images/${props.image}.png`).then((image) => {
			setImage(image.default);
		});
	}, [props.image]);

	React.useEffect(() => {
		fetch(`/me/src/content/experience/${props.descFile}.txt`)
		.then(res => res.text())
		.then(data => {
			setDesc(data);
		});
	}, [props.descFile]);

	return (
		<section className='experience-card' id={props.sectionId} onClick={() => setPopupOpen(true)}>

			<div className='ec-left'>
				<h1 className='mopo font-semibold text-3xl'>{props.title}</h1>
				<h2 className='mopo font-medium text-lg'>{props.role}</h2>
				<p className='mopo font-normal text-sm text-muted'>{props.dates}<span>&ensp;&#183;&ensp;</span>{props.location}</p>
				<div className="experience-card-tags-container">{props.tags.map((tag, i) => <SkillTag key={i} tag={tag} />)}</div>
				<img src={image} alt={props.title} className='experience-card-image' />
			</div>

			<div className='experience-card-text'>
				<p className='mopo text-sm text-muted' dangerouslySetInnerHTML={{__html: props.overview}} />
				<br/>
				<p className='ec-click'>Click this card to learn more...</p>
			</div>

			<Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
				<div className="experience-popup-header">
					<div>
						<p className="experience-myexp">My experience at...</p>
						<h1>{props.title}</h1>
						<h3>{props.role}</h3>
						<p className="text-muted mopo"><span>{props.dates}</span><span>&ensp;&#183;&ensp;</span>{props.location}</p>
						<div className="experience-card-tags-container">{props.tags.map((tag, i) => <SkillTag key={i} tag={tag} />)}</div>
					</div>
					<img src={image} alt={props.title} />
				</div>
				<div dangerouslySetInnerHTML={{__html: desc}} />
			</Popup>
		</section>
	);
};

export default ExperienceCard;