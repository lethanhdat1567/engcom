import classNames from 'classnames/bind';
import styles from './TeacherLessonVideo.module.scss';
import CreateVideo from './CreateVideo/CreateVideo';
import CreateDesc from './CreateDesc/CreateDesc';
import { useEffect, useId, useState } from 'react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import ReactPlayer from 'react-player/youtube';
import { createContentUpdate, updateContentUpdate } from '~/requestApi/requestUpdateClass';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function TeacherLessonVideo({ data }) {
    const id = useId();
    const lesson = useSelector((state) => state.activeLesson.lesson);
    const dispatch = useDispatch();
    const { slug } = useParams();

    // Khởi tạo isUpdate là false
    const [isUpdate, setIsUpdate] = useState(data !== undefined);

    const [videoValue, setVideoValue] = useState(data?.title || '');
    const [descValue, setDescValue] = useState(data?.text || '');

    const utils = {
        videoValue,
        setVideoValue,
        descValue,
        setDescValue,
    };
    useEffect(() => {
        if (data) {
            setIsUpdate(false);
            setDescValue(data.text);
            setVideoValue(data.title);
        } else {
            setDescValue('');
            setVideoValue('');
            setIsUpdate(true);
        }
    }, [data]);
    const handleSave = () => {
        if (slug) {
            const values = {
                id: data?.id || id,
                lesson_id: lesson.id,
                title: videoValue,
                text: descValue,
            };
            if (data?.id) {
                if (Number(data.id)) {
                    const newValues = {
                        text: descValue,
                        title: videoValue,
                    };
                    updateContentUpdate(lesson.id, newValues)
                        .then((res) => {
                            dispatch(teacher.actions.updateContent(res.data));
                            setIsUpdate(false);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    dispatch(teacher.actions.updateContent(values));
                    setIsUpdate(false);
                }
            } else {
                const newValues = {
                    text: descValue,
                    title: videoValue,
                    lesson_id: lesson.id,
                };
                createContentUpdate(newValues)
                    .then((res) => {
                        console.log(res.data);
                        dispatch(teacher.actions.setContent(values));
                        setIsUpdate(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            const values = {
                id: data?.id || id,
                lesson_id: lesson.id,
                title: videoValue,
                text: descValue,
            };
            if (data?.id) {
                dispatch(teacher.actions.updateContent(values));
                setIsUpdate(false);
            } else {
                dispatch(teacher.actions.setContent(values));
                setIsUpdate(false);
            }
        }
    };

    const handleUpdate = () => {
        setIsUpdate(true);
    };

    return (
        <div className={cx('wrap')}>
            {isUpdate ? (
                <>
                    <div className={cx('btn-wrap')}>
                        <Button disable={!videoValue} save onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                    <div className="row row-cols-1 g-5">
                        <div className="col">
                            <CreateVideo utils={utils} />
                        </div>
                        <div className="col">
                            <CreateDesc utils={utils} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('btn-wrap')}>
                        <Button save onClick={handleUpdate}>
                            Update
                        </Button>
                    </div>
                    <div className={cx('bg-video')}>
                        <div className={cx('video-wrap')}>
                            <div className={cx('banner')}>
                                <div className={cx('video')}>
                                    <ReactPlayer
                                        url={data?.title}
                                        controls={true}
                                        width="100%"
                                        height="100%"
                                        progressInterval={100}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: data?.text }}></div>
                </>
            )}
        </div>
    );
}

export default TeacherLessonVideo;
