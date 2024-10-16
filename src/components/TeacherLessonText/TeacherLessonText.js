import classNames from 'classnames/bind';
import styles from './TeacherLessonText.module.scss';
import JoditEditor from 'jodit-react';
import { Button, Flex } from 'antd';
import { useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import UpdateLesson from './UpdateLesson';
import { useParams } from 'react-router-dom';
import { createContentUpdate } from '~/requestApi/requestUpdateClass';

const cx = classNames.bind(styles);

function TeacherLessonText({ data }) {
    const { slug } = useParams();
    const [descValue, setDescValue] = useState(data?.text || '');
    const [isUpdate, setIsUpdate] = useState(false);
    const id = useId();
    const lesson = useSelector((state) => state.activeLesson.lesson);
    const dispatch = useDispatch();

    const handleSave = () => {
        if (slug) {
            if (data) {
                setIsUpdate(true);
            } else {
            }
        } else {
        }
        if (data) {
            setIsUpdate(true);
        } else {
            if (slug) {
                const values = {
                    lesson_id: lesson.id,
                    text: descValue,
                };
                createContentUpdate(values)
                    .then((res) => {
                        dispatch(teacher.actions.updateContent(res.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                const values = {
                    id,
                    lesson_id: lesson.id,
                    text: descValue,
                };
                dispatch(teacher.actions.setContent(values));
            }
        }
    };
    return (
        <div className={cx('wrap')}>
            {isUpdate ? (
                // Update
                <UpdateLesson setIsUpdate={setIsUpdate} data={data ? data : ''} />
            ) : data ? (
                // render view
                <>
                    <Flex justify="end">
                        <Button type="primary" className={cx('btn')} onClick={handleSave}>
                            Update
                        </Button>
                    </Flex>
                    <div className={cx('content')} dangerouslySetInnerHTML={{ __html: data.text }}></div>
                </>
            ) : (
                // Create
                <div className={cx('create')}>
                    <Flex justify="end">
                        <Button type="primary" className={cx('btn')} onClick={handleSave}>
                            Save
                        </Button>
                    </Flex>
                    <JoditEditor config={{ height: 600 }} onBlur={(content) => setDescValue(content)} />
                </div>
            )}
        </div>
    );
}

export default TeacherLessonText;
