import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import TeacherLessonText from '~/components/TeacherLessonText/TeacherLessonText';
import TeacherLessonPractice from '~/components/TeacherLessonPractice/TeacherLessonPractice';
import LessonVideo from '../ContentComp/LessonVideo/LessonVideo';
import LessonText from '../ContentComp/LessonText/LessonText';
import LessonExercise from '../ContentComp/LessonExercise/LessonExercise';

const cx = classNames.bind(styles);

function Content({ lessonContent }) {
    if (lessonContent) {
        switch (lessonContent.type) {
            case '0': {
                return <LessonVideo data={lessonContent} />;
            }
            case '1': {
                return <LessonText data={lessonContent} />;
            }
            case '2': {
                return <LessonExercise data={lessonContent.content} />;
            }
            default: {
                return <div>Teacher is so lazyyyyyy!!!!</div>;
            }
        }
    }
}

export default Content;
