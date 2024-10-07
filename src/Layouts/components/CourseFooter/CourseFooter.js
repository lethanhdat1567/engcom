import classNames from 'classnames/bind';
import styles from './CourseFooter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { courseBack, sideBar } from '~/assets/Icon';
import { useSelector } from 'react-redux';
import useCourseUtils from '~/utils/useCourseUtils';
import { useEffect, useState } from 'react';
import AskModal from '~/components/AskModal/AskModal';

const cx = classNames.bind(styles);

function CourseFooter({ setShowNav, showNav }) {
    const currentLesson = useSelector((state) => state.course.selectedLesson);
    const { handleNextLesson, handlePrevLesson } = useCourseUtils();
    const [askModal, setAskModal] = useState(false);

    const handleNext = () => {
        if (currentLesson.is_completed) {
            handleNextLesson();
        }
    };

    const handlePrev = () => {
        handlePrevLesson();
    };

    return (
        <>
            <footer className={cx('footer')}>
                <div className={cx('ask')} onClick={() => setAskModal(true)}>
                    <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className={cx('lesson')}>
                    <div className={cx('btn-wrap', 'btn-prev')} onClick={handlePrev}>
                        <span className={cx('btn-icon')}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </span>
                        <button className={cx('btn')}>Previous lesson</button>
                    </div>
                    <div
                        className={cx('btn-wrap', 'outlined', { active: currentLesson?.is_completed })}
                        onClick={handleNext}
                    >
                        <button className={cx('btn')}>Next lesson</button>
                        <span className={cx('btn-icon')}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                    </div>
                </div>
                <div className={cx('side-bar')} onClick={() => setShowNav(!showNav)}>
                    <span className={cx('side-bar-icon')}>{showNav ? courseBack : sideBar}</span>
                </div>
            </footer>
            <AskModal setAskModal={setAskModal} askModal={askModal} />
        </>
    );
}

export default CourseFooter;
