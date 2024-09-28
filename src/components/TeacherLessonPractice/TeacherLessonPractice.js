import classNames from 'classnames/bind';
import styles from './TeacherLessonPractice.module.scss';
import CreatePractice from './CreatePractice/CreatePractice';
import QuizCreate from './components/QuizCreate/QuizCreate';
import QuizContent from './components/QuizContent/QuizContent';

const cx = classNames.bind(styles);

function TeacherLessonPractice({ data }) {
    return (
        <div className={cx('wrap')}>
            {data ? (
                <QuizContent data={data} />
            ) : (
                <div className={cx('create-wrap')}>
                    <QuizCreate />
                </div>
            )}
        </div>
    );
}

export default TeacherLessonPractice;
