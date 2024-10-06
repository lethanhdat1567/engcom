import classNames from 'classnames/bind';
import styles from './TeacherLessonVideo.module.scss';
import CreateVideo from './CreateVideo/CreateVideo';
import CreateDesc from './CreateDesc/CreateDesc';
import imgs from '~/assets/Image';
import { useId, useState } from 'react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import { Flex } from 'antd';

const cx = classNames.bind(styles);

function TeacherLessonVideo({ data }) {
    const id = useId();
    const lesson = useSelector((state) => state.activeLesson.lesson);
    const dispatch = useDispatch();

    const [videoValue, setVideoValue] = useState(null);
    const [descValue, setDescValue] = useState('');

    const utils = {
        videoValue,
        setVideoValue,
        descValue,
        setDescValue,
    };

    const handleSave = () => {
        const values = {
            id,
            lesson_id: lesson.id,
            video: videoValue,
            content: descValue,
        };
        dispatch(teacher.actions.setContent(values));
        setVideoValue('');
        setDescValue('');
    };
    return (
        <div className={cx('wrap')}>
            {data ? (
                <>
                    <div className={cx('bg-video')}>
                        <div className={cx('video-wrap')}>
                            <div className={cx('banner')}>
                                <video className={cx('video')} controls>
                                    <source
                                        src={`${process.env.REACT_APP_BACKEND_UPLOAD}/videos/${data.video}`}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                    <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                </>
            ) : (
                <>
                    <div className={cx('btn-wrap')}>
                        <Button save onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                    <div className="row row-cols-1 g-5">
                        <div className="col">
                            <CreateVideo utils={utils} />
                        </div>
                        <div className="col">{videoValue && <CreateDesc utils={utils} />}</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default TeacherLessonVideo;
