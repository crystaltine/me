import { useEffect } from 'react';
import '../styles/art/artPage.css';
import { GenericPage } from '../components/generics';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTheme } from '../themeHook';
import icon from '../assets/page_icons/art-icon.png';

import _artData from '../content/art/art.json';
const artData = _artData as {title: string, desc: string, timestamp: string, image: string }[];

import graphic3Light from '../assets/graphics/graphic3-light.png';
import graphic3Dark from '../assets/graphics/graphic3-dark.png';
import ArtDisplayCard from '../components/artDisplayCard';


const ArtPage = () => {
	
	const { theme } = useTheme();

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Art | Michael Sheng';
	}, [])

  return (
    <GenericPage selected='Art'>
			
			<div className='page-hero'>
				<img src={icon} alt='Art' className='page-hero-icon' />
				<img src={theme === 'light'? graphic3Light : graphic3Dark} alt='graphic' className='page-hero-graphic' />
				<h1 className='page-hero-title'>
					<span className='page-hero-title-muted'>msh~$</span>
					Art
				</h1>
			</div>

			<div className='art-main-desc'>
				I make digital art and animations as a side hobby! This gallery
				contains things I've made that I feel like sharing. I'm still very new to art
				in general, so proceed at your eyes' risk.

				<div className='mt-6 boxedtext-primary'>
					Also check out <a href='https://www.deviantart.com/crystaltine' target='_blank' rel='noreferrer'>my DeviantArt</a>!
				</div>
			</div>

			<hr className='page-separator fadein_0_6' />

			<div className='art-page-cards-container section-medium section-bottom'>
				<ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2}}>
					<Masonry gutter='2rem'>
						{artData.map((item, idx) => (
							<ArtDisplayCard key={idx} {...item} />
						))}
					</Masonry>
				</ResponsiveMasonry>
			</div>
				
		</GenericPage>
  );
};

export default ArtPage;