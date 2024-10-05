import { useDispatch, useSelector } from 'react-redux';
import { course } from '~/redux/reducer/Course';
import { validateProgress } from './validateProgress';

function useNextLesson() {
    const dispatch = useDispatch();
    const courseData = useSelector((state) => state.course.course);
    const user = useSelector((state) => state.user.user);
    const selectedLesson = useSelector((state) => state.course.selectedLesson);

    const handleNextLesson = () => {
        const lesson_id = selectedLesson.id;

        // Check the current state of the lesson
        if (!selectedLesson.is_completed && !selectedLesson.is_in_progress) {
            console.log('Cannot proceed to the next lesson. Current lesson is not completed or in progress.');
            return; // Prevent proceeding to the next lesson
        }

        const currentCourse = courseData.find((course) =>
            course.lessons.some((lesson) => lesson.id === lesson_id),
        );

        const currentIndex = currentCourse?.lessons.findIndex((lesson) => lesson.id === lesson_id);

        // Update progress for the current lesson
        const setProgressValue = validateProgress(user.id, currentCourse.id, lesson_id);
        dispatch(course.actions.setProgressed(setProgressValue));

        // Move to the next lesson
        if (currentIndex < currentCourse.lessons.length - 1) {
            const nextLesson = currentCourse.lessons[currentIndex + 1];
            const updatedNextLesson = {
                ...nextLesson,
                is_in_progress: !nextLesson.is_completed, // Only set is_in_progress if the lesson is not completed
                is_completed: nextLesson.is_completed, // Preserve the current completed state
            };
            dispatch(course.actions.setSelectedLesson(updatedNextLesson));

            // Update progress for the next lesson
            if (!nextLesson.is_completed) {
                dispatch(
                    course.actions.setProgressing(validateProgress(user.id, currentCourse.id, nextLesson.id)),
                );
            }
            dispatch(course.actions.setActiveLessonID(nextLesson.id));
        } else {
            // Move to the next course
            const currentCourseIndex = courseData.findIndex((course) => course.id === currentCourse.id);
            if (currentCourseIndex < courseData.length - 1) {
                const nextCourse = courseData[currentCourseIndex + 1];
                const firstLesson = nextCourse.lessons[0];
                dispatch(
                    course.actions.setSelectedLesson({
                        ...firstLesson,
                        is_in_progress: !firstLesson.is_completed, // Only set is_in_progress if the lesson is not completed
                        is_completed: firstLesson.is_completed, // Preserve the current completed state
                    }),
                );

                // Update progress for the first lesson of the next course
                if (!firstLesson.is_completed) {
                    const setProgressValueForFirstLesson = validateProgress(
                        user.id,
                        nextCourse.id,
                        firstLesson.id,
                    );
                    dispatch(course.actions.setProgressing(setProgressValueForFirstLesson));
                }
                dispatch(course.actions.setActiveLessonID(firstLesson.id));
            }
        }
    };

    return handleNextLesson;
}

export default useNextLesson;
