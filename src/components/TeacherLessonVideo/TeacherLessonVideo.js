import classNames from 'classnames/bind';
import styles from './TeacherLessonVideo.module.scss';
import CreateVideo from './CreateVideo/CreateVideo';
import CreateDesc from './CreateDesc/CreateDesc';
import { useEffect, useId, useState } from 'react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';
import ReactPlayer from 'react-player/youtube';

const cx = classNames.bind(styles);

function TeacherLessonVideo({ data }) {
    const id = useId();
    const lesson = useSelector((state) => state.activeLesson.lesson);
    const dispatch = useDispatch();

    // Khởi tạo isUpdate là false
    const [isUpdate, setIsUpdate] = useState(!data?.id); // Thiết lập isUpdate dựa trên data.id
    const [videoValue, setVideoValue] = useState(data?.video || '');
    const [descValue, setDescValue] = useState(data?.content || '');

    const utils = {
        videoValue,
        setVideoValue,
        descValue,
        setDescValue,
    };

    const handleSave = () => {
        const values = {
            id: data?.id || id,
            lesson_id: lesson.id,
            video: videoValue,
            content: descValue,
        };

        if (data?.id) {
            dispatch(teacher.actions.updateContent(values));
        } else {
            dispatch(teacher.actions.setContent(values));
        }

        // Chuyển sang chế độ xem
        setIsUpdate(false);
    };

    const handleUpdate = () => {
        // Chuyển sang chế độ chỉnh sửa
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
                                        url={data?.video}
                                        controls={true}
                                        width="100%"
                                        height="100%"
                                        progressInterval={100}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: data?.content }}></div>
                </>
            )}
        </div>
    );
}

export default TeacherLessonVideo;
