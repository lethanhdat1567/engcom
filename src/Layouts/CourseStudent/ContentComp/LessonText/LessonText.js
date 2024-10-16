import classNames from 'classnames/bind';
import styles from './LessonText.module.scss';
import { useEffect } from 'react';
import useCourseUtils from '~/utils/useCourseUtils';

const cx = classNames.bind(styles);

function LessonText({ data }) {
    const textContent = data.content;
    console.log(data);

    const { handleDoneLesson } = useCourseUtils();

    useEffect(() => {
        handleDoneLesson();
    });

    return <div className={cx('content')} dangerouslySetInnerHTML={{ __html: textContent.text }}></div>;
}

export default LessonText;
