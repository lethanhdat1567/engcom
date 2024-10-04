import { useDispatch, useSelector } from 'react-redux';
import { course } from '~/redux/reducer/Course';

function usePrevLesson() {
    const dispatch = useDispatch();
    const courseData = useSelector((state) => state.course.course);
    const selectedLesson = useSelector((state) => state.course.selectedLesson);

    const handlePrevLesson = () => {
        const lesson_id = selectedLesson.id;

        const currentCourse = courseData.find((course) =>
            course.lessons.some((lesson) => lesson.id === lesson_id),
        );

        const currentIndex = currentCourse.lessons.findIndex((lesson) => lesson.id === lesson_id);

        // Check if it's the first lesson in the current course
        if (currentIndex === 0) {
            const currentCourseIndex = courseData.findIndex((course) => course.id === currentCourse.id);
            // Check if there is a previous course
            if (currentCourseIndex > 0) {
                const prevCourse = courseData[currentCourseIndex - 1];
                const lastLesson = prevCourse.lessons[prevCourse.lessons.length - 1]; // Get the last lesson of the previous course
                dispatch(course.actions.setSelectedLesson(lastLesson)); // Set the selected lesson without modifying progress
                dispatch(course.actions.setActiveLessonID(lastLesson.id));
            }
        } else {
            const prevLesson = currentCourse.lessons[currentIndex - 1];
            dispatch(course.actions.setSelectedLesson(prevLesson)); // Set the selected lesson without modifying progress
            dispatch(course.actions.setActiveLessonID(prevLesson.id));
        }
    };

    return handlePrevLesson;
}

export default usePrevLesson;
