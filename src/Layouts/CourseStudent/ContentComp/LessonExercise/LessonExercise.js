import classNames from 'classnames/bind';
import styles from './LessonExercise.module.scss';
import { useState } from 'react';
import { Button, Flex } from 'antd';

const cx = classNames.bind(styles);

function LessonExercise({ data }) {
    const [choiceActive, setChoiceActive] = useState();

    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>{data.title}</h1>
            <div className={cx('content')}>
                <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <div className={cx('choices')}>
                <p className={cx('choices-sub')}>Chọn câu trả lời đúng.</p>
                <ul className={cx('list')}>
                    {data.questions.map((item, index) => {
                        const letter = String.fromCharCode(65 + index);
                        return (
                            <li
                                className={cx('item', { active: index === choiceActive })}
                                key={index}
                                onClick={() => setChoiceActive(index)}
                            >
                                {`${letter}. ${item.name}`}
                            </li>
                        );
                    })}
                </ul>
                <Flex justify="end" style={{ marginTop: '10px' }}>
                    <Button type="primary">Answer</Button>
                </Flex>
            </div>
        </div>
    );
}

export default LessonExercise;
