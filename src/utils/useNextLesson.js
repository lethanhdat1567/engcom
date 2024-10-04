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

        // Kiểm tra trạng thái của bài học hiện tại
        if (!selectedLesson.is_completed && !selectedLesson.is_in_progress) {
            console.log('Cannot proceed to the next lesson. Current lesson is not completed or in progress.');
            return; // Không cho phép chuyển đến bài học tiếp theo
        }

        const currentCourse = courseData.find((course) =>
            course.lessons.some((lesson) => lesson.id === lesson_id),
        );

        const currentIndex = currentCourse.lessons.findIndex((lesson) => lesson.id === lesson_id);

        // Gọi setProgressed cho lesson hiện tại
        const setProgressValue = validateProgress(user.id, currentCourse.id, lesson_id);
        dispatch(course.actions.setProgressed(setProgressValue));

        // Chuyển sang bài học tiếp theo
        if (currentIndex < currentCourse.lessons.length - 1) {
            const nextLesson = currentCourse.lessons[currentIndex + 1];
            const updatedNextLesson = {
                ...nextLesson,
                is_in_progress: true,
                is_completed: false,
            };
            dispatch(course.actions.setSelectedLesson(updatedNextLesson));
            dispatch(
                course.actions.setProgressing(validateProgress(user.id, currentCourse.id, nextLesson.id)),
            );
            dispatch(course.actions.setActiveLessonID(nextLesson.id));
        } else {
            // Chuyển sang khóa học tiếp theo
            const currentCourseIndex = courseData.findIndex((course) => course.id === currentCourse.id);
            if (currentCourseIndex < courseData.length - 1) {
                const nextCourse = courseData[currentCourseIndex + 1];
                const firstLesson = nextCourse.lessons[0];
                dispatch(
                    course.actions.setSelectedLesson({
                        ...firstLesson,
                        is_in_progress: true,
                        is_completed: false,
                    }),
                );
                // Chỉ gọi setProgressing một lần
                const setProgressValueForFirstLesson = validateProgress(
                    user.id,
                    nextCourse.id,
                    firstLesson.id,
                );
                dispatch(course.actions.setProgressing(setProgressValueForFirstLesson));
                dispatch(course.actions.setActiveLessonID(firstLesson.id));
            }
        }
    };

    return handleNextLesson;
}

export default useNextLesson;
