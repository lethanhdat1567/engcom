import classNames from 'classnames/bind';
import styles from './CourseFooter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { courseBack, sideBar } from '~/assets/Icon';
import { useSelector } from 'react-redux';
import useCourseUtils from '~/utils/useCourseUtils';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import { validateIcon } from '~/utils/validateIcon';

const cx = classNames.bind(styles);

function CourseFooter({ setShowNav, showNav }) {
    const user = useSelector((state) => state.user.user);
    const currentLesson = useSelector((state) => state.course.selectedLesson);
    const { handleNextLesson, handlePrevLesson } = useCourseUtils();
    const [showTippy, setShowTippy] = useState(false);

    const handleNext = () => {
        if (currentLesson.is_completed) {
            handleNextLesson();
        } else {
            setShowTippy(true);
        }
    };

    const handlePrev = () => {
        handlePrevLesson();
    };

    return (
        <>
            <footer className={cx('footer')}>
                {user.role_id !== 4 && (
                    <>
                        <span className={cx('unit-wrap')}>
                            <FontAwesomeIcon icon={validateIcon(currentLesson?.type)} />
                        </span>
                        <div className={cx('lesson')}>
                            <div className={cx('btn-wrap', 'btn-prev')} onClick={handlePrev}>
                                <span className={cx('btn-icon')}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </span>
                                <button className={cx('btn')}>Previous lesson</button>
                            </div>
                            <Tippy
                                visible={showTippy}
                                onClickOutside={() => setShowTippy(false)}
                                content="Your need to done your lesson"
                            >
                                <div
                                    className={cx('btn-wrap', 'outlined', {
                                        active: currentLesson?.is_completed,
                                    })}
                                    onClick={handleNext}
                                >
                                    <button className={cx('btn')}>Next lesson</button>
                                    <span className={cx('btn-icon')}>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </span>
                                </div>
                            </Tippy>
                        </div>
                    </>
                )}
                <div
                    className={cx('side-bar')}
                    onClick={() => setShowNav(!showNav)}
                    style={user.role_id == 4 ? { marginLeft: 'auto' } : {}}
                >
                    <span className={cx('side-bar-icon')}>{showNav ? courseBack : sideBar}</span>
                </div>
            </footer>
        </>
    );
}

export default CourseFooter;
