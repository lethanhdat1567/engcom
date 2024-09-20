import classNames from 'classnames/bind';
import styles from './TeacherCourse.module.scss';
import TeacherLessonVideo from '~/components/TeacherLessonVideo/TeacherLessonVideo';
import TeacherLessonText from '~/components/TeacherLessonText/TeacherLessonText';
import TeacherLessonPractice from '~/components/TeacherLessonPractice/TeacherLessonPractice';

const cx = classNames.bind(styles);

function TeacherCourse() {
    return (
        <div className={cx('wrap')}>
            {/* <TeacherLessonVideo /> */}
            {/* <TeacherLessonText /> */}
            <TeacherLessonPractice />
        </div>
    );
}

export default TeacherCourse;
