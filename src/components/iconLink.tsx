import React from 'react'
import '../styles/general/iconLink.css'

const LINK_ICONS: {[name: string] : string} = {
	"Github": "github",
	"PyPI": "box",
	"Website": "globe",
}

interface IconLinkProps {
	href: string;
	icon: string;
	name: string;
	a:()=>void;
}

const IconLink = (props: IconLinkProps) => {

	const [image, setImage] = React.useState<string>('');
	React.useEffect(() => {
		import(`../assets/svgs/${LINK_ICONS[props.icon]}.svg`).then((image) => {
			setImage(image.default);
		});
	}, [props.icon]);

	return (
		<div className='inline' onClick={props.a}>
			<img className='icon-link-icon' src={image} alt={props.name} />
			<a className='icon-link-a' href={props.href} target='_blank' rel='noreferrer'>
				{props.name}
			</a>
		</div>
	);
};

export default IconLink;