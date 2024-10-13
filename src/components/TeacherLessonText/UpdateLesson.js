import classNames from 'classnames/bind';
import styles from './TeacherLessonText.module.scss';
import { useState } from 'react';
import JoditEditor from 'jodit-react';
import { Button, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';

const cx = classNames.bind(styles);

function UpdateLesson({ data, setIsUpdate }) {
    const dispatch = useDispatch();
    const [contentValue, setContentValue] = useState(data.text);

    const handleSave = () => {
        const values = {
            id: data.id,
            lesson_id: data.lesson_id,
            text: contentValue,
        };
        dispatch(teacher.actions.updateContent(values));
        setIsUpdate(false);
    };
    return (
        <div className={cx('create')}>
            <Flex justify="end" gap={10} style={{ marginBottom: 10 }}>
                <Button type="primary" danger onClick={() => setIsUpdate(false)}>
                    Cancle
                </Button>
                <Button type="primary" onClick={handleSave}>
                    Save
                </Button>
            </Flex>
            <JoditEditor
                value={contentValue}
                config={{ height: 600 }}
                onBlur={(content) => setContentValue(content)}
            />
        </div>
    );
}

export default UpdateLesson;
