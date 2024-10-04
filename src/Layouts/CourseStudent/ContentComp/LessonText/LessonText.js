import classNames from 'classnames/bind';
import styles from './LessonText.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useNextLesson from '~/utils/useNextLesson';
import { validateProgress } from '~/utils/validateProgress';
import { course } from '~/redux/reducer/Course';

const cx = classNames.bind(styles);

function LessonText({ data }) {
    const textContent = data.content;

    return <div className={cx('content')} dangerouslySetInnerHTML={{ __html: textContent.text }}></div>;
}

export default LessonText;
