import classNames from 'classnames/bind';
import styles from './TeacherLessonPractice.module.scss';
import QuizCreate from './components/QuizCreate/QuizCreate';
import QuizContent from './components/QuizContent/QuizContent';

const cx = classNames.bind(styles);

function TeacherLessonPractice({ data }) {
    console.log(data);

    return (
        <div className={cx('wrap')}>
            {data ? (
                <QuizContent data={data} />
            ) : (
                <div className={cx('create-wrap')}>
                    <QuizCreate data={data} />
                </div>
            )}
        </div>
    );
}

export default TeacherLessonPractice;
