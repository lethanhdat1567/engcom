import classNames from 'classnames/bind';
import styles from './TeacherCourse.module.scss';
import TeacherLessonVideo from '~/components/TeacherLessonVideo/TeacherLessonVideo';
import TeacherLessonText from '~/components/TeacherLessonText/TeacherLessonText';
import TeacherLessonPractice from '~/components/TeacherLessonPractice/TeacherLessonPractice';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function TeacherCourse() {
    const activeLesson = useSelector((state) => state.activeLesson.lesson);
    const lessonContents = useSelector((state) => state.teacher.contents);
    const data = lessonContents?.find((item) => {
        return item.lesson_id === activeLesson.id;
    });
    switch (activeLesson.type) {
        case 0: {
            return <TeacherLessonVideo data={data} />;
        }
        case 1: {
            return <TeacherLessonText data={data} />;
        }
        case 2: {
            return <TeacherLessonPractice data={data} />;
        }
        default: {
            return <div>Set your lesson type!</div>;
        }
    }
}

export default TeacherCourse;
