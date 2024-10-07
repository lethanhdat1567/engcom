import classNames from 'classnames/bind';
import styles from './ReplyItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';
import { useEffect, useState } from 'react';
import Item from './Item';
import { getReply } from '~/requestApi/requestAsk';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ReplyItem({ replyData, setReplyData, askDataItem }) {
    const [active, setActive] = useState(false);
    const [newReply, setNewReply] = useState([]);
    const currentLesson = useSelector((state) => state.course.selectedLesson);

    useEffect(() => {
        getReply(currentLesson.id)
            .then((res) => {
                setReplyData(res.data);
                const newArr = res.data.filter((item) => item.ask.parent_id === askDataItem.id);
                setNewReply(newArr);
            })
            .catch((error) => {
                setReplyData([]);
            });
    }, [replyData]);

    return (
        <div className={cx('wrap')}>
            {newReply.length > 0 && (
                <div className={cx('res')} onClick={() => setActive(!active)}>
                    <span className={cx('res-text')}>
                        {newReply.length} responses
                        <FontAwesomeIcon
                            icon={active ? faChevronUp : faChevronDown}
                            style={{ marginLeft: '4px' }}
                        />
                    </span>
                </div>
            )}
            {active &&
                newReply.map((item, index) => {
                    return <Item askData={replyData} setAskData={setReplyData} reply={item} key={index} />;
                })}
        </div>
    );
}

export default ReplyItem;
