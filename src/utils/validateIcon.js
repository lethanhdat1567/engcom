import { faLeanpub } from '@fortawesome/free-brands-svg-icons';
import { faBookOpen, faFileLines, faPlay } from '@fortawesome/free-solid-svg-icons';

const icons = [faPlay, faFileLines, faLeanpub, faBookOpen];
const texts = ['video', 'text', 'exercise', 'exam'];

export const validateIcon = (index) => {
    return icons[index] || null;
};
export const validateText = (index) => {
    return texts[index] || null;
};
