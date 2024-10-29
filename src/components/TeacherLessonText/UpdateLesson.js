import classNames from 'classnames/bind';
import styles from './TeacherLessonText.module.scss';
import { useState } from 'react';
import JoditEditor from 'jodit-react';
import { Button, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { useParams } from 'react-router-dom';
import { createContentUpdate, updateContentUpdate } from '~/requestApi/requestUpdateClass';
import { toastify } from '~/utils/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function UpdateLesson({ data, setIsUpdate }) {
    const dispatch = useDispatch();
    const [contentValue, setContentValue] = useState(data.text);
    const [loadingContent, setLoadingContent] = useState(false);
    const slug = useParams();

    const handleSave = () => {
        if (Object.keys(slug).length > 0) {
            if (Number(data?.id)) {
                setLoadingContent(true);
                const newValues = {
                    text: contentValue,
                    title: '',
                };
                updateContentUpdate(data.lesson_id, newValues)
                    .then((res) => {
                        setLoadingContent(false);
                        dispatch(teacher.actions.updateContent({ ...newValues, id: data.id }));
                        setIsUpdate(false);
                    })
                    .catch((error) => {
                        setLoadingContent(false);
                        toastify('Update content fail', 'error', 2000, 'top-right');
                        console.log(error);
                    });
            } else {
                const values = {
                    id: data.id,
                    lesson_id: data.lesson_id,
                    text: contentValue,
                };
                dispatch(teacher.actions.updateContent(values));
                setIsUpdate(false);
            }
        } else {
            const values = {
                id: data.id,
                lesson_id: data.lesson_id,
                text: contentValue,
            };
            dispatch(teacher.actions.updateContent(values));
            setIsUpdate(false);
        }
    };
    return (
        <div className={cx('create')}>
            <Flex justify="end" gap={10} style={{ marginBottom: 10 }}>
                <Button type="primary" danger onClick={() => setIsUpdate(false)}>
                    Cancel
                </Button>
                <Button type="primary" onClick={handleSave}>
                    {loadingContent ? (
                        <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner fa-spin-pulse" />
                    ) : (
                        'Save'
                    )}
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
