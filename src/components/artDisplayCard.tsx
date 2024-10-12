import React from 'react';
import '../styles/art/card.css';

export interface ArtDisplayCardProps {
	title?: string; // undef = <untitled>
	desc?: string;
	timestamp?: string;
	image: string;
}

const ArtDisplayCard = (props: ArtDisplayCardProps) => {
	
	const [image, setImage] = React.useState<string>('');
	React.useEffect(() => {
		// must be hardcoded to satisfy vite dynamic import
		import(`../content/art/drawings/${props.image}.png`).then((image) => {
			setImage(image.default);
		});
	}, [props.image]);

	return (
		<div className='art-display-card'>
			<img className='adc-image' src={image} alt={props.title} />
			<div>
				<div className='adc-caption-line1'>
					{props.title?
						<h2 className='adc-caption-title'>{props.title}</h2> :
						<h2 className='adc-caption-title untitled'>(untitled)</h2>
					}
					<p className='adc-caption-timestamp'>{props.timestamp}</p>
				</div>
				{props.desc && <p className='adc-caption-desc' dangerouslySetInnerHTML={{__html: props.desc}}></p>}
			</div>
		</div>
	);
};

export default ArtDisplayCard;