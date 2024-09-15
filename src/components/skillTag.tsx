import '../styles/projects/tag.css';
import { useTheme } from '../themeHook';

import projectTagsObj from '../content/projects/projectTags.json';
const projectTags = projectTagsObj as { [key: string]: { name: string, color: string, icon: string }};

interface SkillTagProps {
	tag: string;
}

function isCloserToWhite(color: string) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
		if (!result) { return false; }
		const r = parseInt(result[1], 16)
		const g = parseInt(result[2], 16)
		const b = parseInt(result[3], 16)

		const brightness = (r * 299 + g * 587 + b * 114) / 1000;
		return brightness > 155;
}

/**
 * Icons not implemented yet
 */
const SkillTag = (props: SkillTagProps) => {

	const { theme } = useTheme();

	const tagName = projectTags[props.tag]?.name || props.tag;
	const tagColor = projectTags[props.tag]?.color ?? (theme === 'light'? '#000000' : '#ffffff');
	// const tagIcon = projectTags[props.tag]?.icon || ''; // make default skill icon

	return (
		<div className='project-page-tag' style={{ backgroundColor: tagColor, borderColor: tagColor, color: isCloserToWhite(tagColor)? "black" : "white" }}>
			{tagName}
		</div>
	);
};

export default SkillTag;