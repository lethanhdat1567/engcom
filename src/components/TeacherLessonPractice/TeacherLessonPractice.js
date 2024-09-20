import classNames from 'classnames/bind';
import styles from './TeacherLessonPractice.module.scss';
import CreatePractice from './CreatePractice/CreatePractice';
import QuizCreate from './components/QuizCreate/QuizCreate';

const cx = classNames.bind(styles);

function TeacherLessonPractice() {
    return (
        <div className={cx('wrap')}>
            {/* <CreatePractice /> */}
            <div className={cx('create-wrap')}>
                <QuizCreate />
            </div>
        </div>
    );
}

export default TeacherLessonPractice;
