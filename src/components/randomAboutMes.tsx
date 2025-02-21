import '../styles/home/randoms.css';

import _factContent from '../content/about/randomFacts.json';
const factContent: { fact: string, color: string }[] = _factContent;

const FactCard = ({ fact, color }: { fact: string, color: string }) => {
	return (
		<div className='fact-card' style={{boxShadow: `0 10px 30px -10px rgba(${color}, 0.2)`}}>
			{fact}
		</div>
	);
}
const RandomAboutMeScroller = () => {
	return (
		<div className='fact-card-scroller'>
			{factContent.map((item, idx) => <FactCard key={idx} fact={item.fact} color={item.color} />)}
		</div>
	);
};

export default RandomAboutMeScroller;