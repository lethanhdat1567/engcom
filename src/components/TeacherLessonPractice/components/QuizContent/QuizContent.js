import classNames from 'classnames/bind';
import styles from './QuizContent.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function QuizContent({ data }) {
    const [choiceActive, setChoiceActive] = useState();

    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>{data?.title}</h1>
            <div className={cx('content')}>
                <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: data?.text }}></div>
            </div>
            <div className={cx('choices')}>
                <p className={cx('choices-sub')}>Chọn câu trả lời đúng.</p>
                <ul className={cx('list')}>
                    {data?.questions.map((item, index) => {
                        const letter = String.fromCharCode(65 + index);
                        return (
                            <li
                                className={cx('item', {
                                    active: index == choiceActive,
                                    correct: item.is_correct,
                                })}
                                key={index}
                                onClick={() => setChoiceActive(index)}
                            >
                                {`${letter}. ${item.text}`}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default QuizContent;
