import classNames from 'classnames/bind';
import styles from './QuizContent.module.scss';
import { useState } from 'react';
import { Button, Flex, Row } from 'antd';

const cx = classNames.bind(styles);

function QuizContent() {
    const choiceData = ['ABC', 'DEF', 'FGH', 'HQP'];
    const [choiceActive, setChoiceActive] = useState();
    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Ôn tập Destructuring, Rest</h1>
            <div className={cx('content')}>
                <p className={cx('desc')}>
                    @User-lm4qq 2 tháng trước You can use the result ternary operator only one time. Instead
                    of returning empty div while result is true ,you can return the sc @User-lm4qq 2 tháng
                    trước You can use the result ternary operator only one time. Instead of returning empty
                    div while result is true ,you can return the score and reset button @User-lm4qq 2 tháng
                    trước You can use the result ternary operator only one time. Instead of returning empty
                    div while result is true ,you can return the score and reset button @User-lm4qq 2 tháng
                    trước You can use the result ternary operator only one time. Instead of returning empty
                    div while result is true ,you can return the score and reset buttonore and reset button
                </p>
            </div>
            <div className={cx('choices')}>
                <p className={cx('choices-sub')}>Chọn câu trả lời đúng.</p>
                <ul className={cx('list')}>
                    {choiceData.map((item, index) => {
                        const letter = String.fromCharCode(65 + index);
                        return (
                            <li
                                className={cx('item', { active: index === choiceActive })}
                                key={index}
                                onClick={() => setChoiceActive(index)}
                            >
                                {`${letter}. ${item}`}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={cx('subwrap')}>
                <Button className={cx('btn-submit')} type="primary">
                    Answer
                </Button>
            </div>
        </div>
    );
}

export default QuizContent;
