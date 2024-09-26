import classNames from 'classnames/bind';
import styles from './TeacherCourse.module.scss';
import TeacherLessonVideo from '~/components/TeacherLessonVideo/TeacherLessonVideo';
import TeacherLessonText from '~/components/TeacherLessonText/TeacherLessonText';
import TeacherLessonPractice from '~/components/TeacherLessonPractice/TeacherLessonPractice';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function TeacherCourse() {
    const activeLesson = useSelector((state) => state.activeLesson.lesson);
    switch (activeLesson.type) {
        case 0: {
            return <TeacherLessonVideo />;
        }
        case 1: {
            return <TeacherLessonText />;
        }
        case 2: {
            return <TeacherLessonPractice />;
        }
        default: {
            return <div>Alo chua co gi het !</div>;
        }
    }
}

export default TeacherCourse;
