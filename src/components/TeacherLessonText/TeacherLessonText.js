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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TeacherLessonText({ data }) {
    const { slug } = useParams();
    const [descValue, setDescValue] = useState(data?.text || '');
    const [isUpdate, setIsUpdate] = useState(false);
    const [loadingContent, setLoadingContent] = useState(false);
    const id = useId();
    const lesson = useSelector((state) => state.activeLesson.lesson);
    const dispatch = useDispatch();

    const handleSave = () => {
        if (data) {
            setIsUpdate(true);
        } else {
            if (slug) {
                setLoadingContent(true);
                const values = {
                    lesson_id: lesson.id,
                    text: descValue,
                };

                createContentUpdate(values)
                    .then((res) => {
                        setLoadingContent(false);
                        dispatch(teacher.actions.setContent(res.data));
                    })
                    .catch((error) => {
                        setLoadingContent(false);
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
                            {loadingContent ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="fa-solid fa-spinner fa-spin-pulse"
                                />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Flex>
                    <JoditEditor config={{ height: 600 }} onBlur={(content) => setDescValue(content)} />
                </div>
            )}
        </div>
    );
}

export default TeacherLessonText;
