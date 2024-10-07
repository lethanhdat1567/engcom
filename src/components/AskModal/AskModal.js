import classNames from 'classnames/bind';
import styles from './AskModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import imgs from '~/assets/Image';
import CommentItem from '../CommentItem/CommentItem';
import AskItem from './Component/AskItem/AskItem';
import { useEffect, useState } from 'react';
import { getAsk, insertAsk } from '~/requestApi/requestAsk';
import { useSelector } from 'react-redux';
import Img from '../Img';

const cx = classNames.bind(styles);

function AskModal({ setAskModal, askModal }) {
    const currentLesson = useSelector((state) => state.course.selectedLesson);
    const user = useSelector((state) => state.user.user);
    const [askData, setAskData] = useState([]);
    const [inputQuestion, setInputQuestion] = useState('');
    const [questionAdopt, setQuestionAdopt] = useState(false);

    const utils = {
        askData,
        setAskData,
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.trim()) {
            setQuestionAdopt(true);
            setInputQuestion(inputValue);
        } else {
            setInputQuestion('');
            setQuestionAdopt(false);
        }
    };
    const handleComment = () => {
        if (questionAdopt) {
            const values = {
                user_id: user.id,
                lesson_id: currentLesson.id,
                content: inputQuestion,
            };
            insertAsk(values)
                .then((res) => {
                    setAskData((prev) => [...prev, res.data]);
                    setInputQuestion('');
                    setQuestionAdopt(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    useEffect(() => {
        if (currentLesson && Object.keys(currentLesson).length > 0) {
            getAsk(currentLesson.id)
                .then((res) => {
                    setAskData(res.data);
                })
                .catch((error) => {
                    setAskData([]);
                });
        }
    }, [currentLesson]);
    return (
        <div className={cx('wrap', { active: askModal })}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>Hoi dap</h3>
                <span className={cx('close')} onClick={() => setAskModal(false)}>
                    <FontAwesomeIcon icon={faXmark} className="fa-xl" />
                </span>
            </div>
            <div className={cx('body')}>
                <div className={cx('ask')}>
                    <div className={cx('ask-content')}>
                        <Img
                            className={cx('avatar')}
                            src={
                                user.avatar?.includes('googleusercontent.com') ||
                                user.avatar?.includes('facebook.com')
                                    ? user.avatar
                                    : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                            }
                            alt="User Avatar"
                        />
                        <input
                            onChange={(e) => handleChange(e)}
                            className={cx('ask-input')}
                            placeholder="your question..."
                            value={inputQuestion}
                        />
                    </div>
                    <button className={cx('com-submit', { active: questionAdopt })} onClick={handleComment}>
                        Comment
                    </button>
                </div>
                <div className={cx('asks-wrap')}>
                    <AskItem utils={utils} />
                </div>
            </div>
        </div>
    );
}

export default AskModal;
