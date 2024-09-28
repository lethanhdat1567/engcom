import classNames from 'classnames/bind';
import styles from './TeacherLessonText.module.scss';
import JoditEditor from 'jodit-react';
import { Button, Flex } from 'antd';
import { useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import UpdateLesson from './UpdateLesson';

const cx = classNames.bind(styles);

function TeacherLessonText({ data }) {
    const [descValue, setDescValue] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const id = useId();
    const lesson = useSelector((state) => state.activeLesson.lesson);
    const dispatch = useDispatch();
    const handleSave = () => {
        if (data) {
            setIsUpdate(true);
        } else {
            const values = {
                id,
                lesson_id: lesson.id,
                content: descValue,
            };
            dispatch(teacher.actions.setContent(values));
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
                    <div className={cx('content')} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                </>
            ) : (
                // Create
                <div className={cx('create')}>
                    <Flex justify="end">
                        <Button type="primary" className={cx('btn')} onClick={handleSave}>
                            Export
                        </Button>
                    </Flex>
                    <JoditEditor config={{ height: 600 }} onBlur={(content) => setDescValue(content)} />
                </div>
            )}
        </div>
    );
}

export default TeacherLessonText;
