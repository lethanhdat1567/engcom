import { useDispatch, useSelector } from 'react-redux';
import { course } from '~/redux/reducer/Course';

function useCourseUtils() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.course.course);
    const selectedLesson = useSelector((state) => state.course.selectedLesson);

    const courseUtils = {
        filterFirst(coursesData) {
            if (!coursesData || coursesData.length === 0) return;

            const allLessonsCompleted = coursesData.every((courseItem) =>
                courseItem.lessons.every((lesson) => lesson.is_completed),
            );

            const anyLessonInProgress = coursesData.some((courseItem) =>
                courseItem.lessons.some((lesson) => lesson.is_in_progress && !lesson.is_completed),
            );

            if (!anyLessonInProgress) {
                if (!allLessonsCompleted) {
                    // Nếu không có bài học nào đang làm và có bài học chưa hoàn thành
                    const firstLesson = coursesData[0].lessons[0];

                    // Dispatch ID bài học hoạt động
                    dispatch(course.actions.setActiveLessonID(firstLesson.id));
                    dispatch(course.actions.setProgressing(firstLesson));

                    // Cập nhật bài học đầu tiên trong danh sách lessons
                    const updatedLessons = coursesData[0].lessons.map((lessonItem, index) =>
                        index === 0
                            ? { ...lessonItem, is_in_progress: true, is_completed: false }
                            : lessonItem,
                    );

                    // Cập nhật coursesData với lessons mới
                    const updatedCoursesData = [
                        {
                            ...coursesData[0],
                            lessons: updatedLessons,
                        },
                        ...coursesData.slice(1),
                    ];

                    // Dispatch bài học đã chọn và cập nhật khóa học
                    dispatch(course.actions.setSelectedLesson(updatedLessons[0]));
                    dispatch(course.actions.setCourse(updatedCoursesData));
                } else {
                    // Nếu tất cả bài học đều đã hoàn thành
                    const lastLesson = coursesData[0].lessons[coursesData[0].lessons.length - 1]; // Bài học cuối cùng

                    // Dispatch bài học cuối cùng
                    dispatch(course.actions.setActiveLessonID(lastLesson.id));
                    dispatch(course.actions.setSelectedLesson(lastLesson));
                    dispatch(course.actions.setCourse(coursesData));
                }
            } else {
                // Nếu có bài học đang làm
                coursesData.forEach((courseItem) => {
                    courseItem.lessons.forEach((lesson) => {
                        if (lesson.is_in_progress && !lesson.is_completed) {
                            dispatch(course.actions.setActiveLessonID(lesson.id));
                            dispatch(course.actions.setSelectedLesson(lesson));
                            dispatch(course.actions.setCourse(coursesData));
                        }
                    });
                });
            }
        },
        handleDoneLesson() {
            if (selectedLesson.is_in_progress && !selectedLesson.is_completed) {
                // Đánh dấu bài học hiện tại là đã hoàn thành

                dispatch(course.actions.setProgressed(selectedLesson));

                // Cập nhật selectedLesson với trạng thái mới
                const updatedSelectedLesson = {
                    ...selectedLesson,
                    is_completed: true,
                    is_in_progress: false,
                };

                // Cập nhật lại selectedLesson trong Redux
                dispatch(course.actions.setSelectedLesson(updatedSelectedLesson));

                // Lấy bài học tiếp theo
                const currentCourse = courses.find(
                    (courseItem) => courseItem.id === selectedLesson.course_id,
                );
                const nextLessonIndex =
                    currentCourse.lessons.findIndex((lesson) => lesson.id === selectedLesson.id) + 1;

                if (nextLessonIndex < currentCourse.lessons.length) {
                    const nextLesson = currentCourse.lessons[nextLessonIndex];

                    // Cập nhật trạng thái cho bài học tiếp theo
                    dispatch(course.actions.setProgressing(nextLesson));
                }
            }
        },
        handleNextLesson() {
            // Lấy khóa học hiện tại
            const currentCourse = courses.find((courseItem) => courseItem.id === selectedLesson.course_id);

            // Tìm chỉ số của bài học hiện tại
            const currentLessonIndex = currentCourse.lessons.findIndex(
                (lesson) => lesson.id === selectedLesson.id,
            );

            // Tính chỉ số của bài học tiếp theo
            const nextLessonIndex = currentLessonIndex + 1;

            if (nextLessonIndex < currentCourse.lessons.length) {
                const nextLesson = currentCourse.lessons[nextLessonIndex];

                // Cập nhật trạng thái cho bài học tiếp theo
                dispatch(course.actions.setActiveLessonID(nextLesson.id));
                dispatch(course.actions.setSelectedLesson(nextLesson));
            } else {
                console.log('Đã đến bài học cuối cùng.');
            }
        },
        handlePrevLesson() {
            // Lấy khóa học hiện tại
            const currentCourse = courses.find((courseItem) => courseItem.id === selectedLesson.course_id);

            // Tìm chỉ số của bài học hiện tại
            const currentLessonIndex = currentCourse.lessons.findIndex(
                (lesson) => lesson.id === selectedLesson.id,
            );

            // Tính chỉ số của bài học trước đó
            const prevLessonIndex = currentLessonIndex - 1;

            if (prevLessonIndex >= 0) {
                const prevLesson = currentCourse.lessons[prevLessonIndex];

                // Cập nhật bài học trước đó mà không thay đổi trạng thái progress
                dispatch(course.actions.setActiveLessonID(prevLesson.id));
                dispatch(course.actions.setSelectedLesson(prevLesson));
            } else {
                console.log('Đã đến bài học đầu tiên.');
            }
        },
    };

    return courseUtils;
}

export default useCourseUtils;