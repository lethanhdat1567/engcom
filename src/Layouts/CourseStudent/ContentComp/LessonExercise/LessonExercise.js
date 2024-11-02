import classNames from 'classnames/bind';
import styles from './LessonExercise.module.scss';
import { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';
import confetti from 'canvas-confetti';
import useCourseUtils from '~/utils/useCourseUtils';

const cx = classNames.bind(styles);

function LessonExercise({ data }) {
    const { handleDoneLesson } = useCourseUtils();
    const [choiceActive, setChoiceActive] = useState();
    const [currentChoice, setCurrentChoice] = useState();
    const [isWrong, setIsWrong] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleChoice = (item, index) => {
        setChoiceActive(index);
        setCurrentChoice(item);
        setIsWrong(false);
        setIsCorrect(false);
    };
    const handleAnswer = () => {
        if (currentChoice) {
            if (Number(currentChoice.is_correct)) {
                setIsWrong(false);
                setIsCorrect(true);
                handleDoneLesson();
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: 0, y: 0.6 },
                });

                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: 1, y: 0.6 },
                });

                confetti({
                    particleCount: 100,
                    spread: 90,
                    origin: { x: 0.5, y: 1 },
                });
            } else {
                setIsWrong(true);
                setIsCorrect(false);
            }
        }
    };

    useEffect(() => {
        setChoiceActive();
        setCurrentChoice();
        setIsWrong(false);
        setIsCorrect(false);
    }, [data]);

    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>{data.title}</h1>
            <div className={cx('content')}>
                <div className={cx('desc')} dangerouslySetInnerHTML={{ __html: data.text }}></div>
            </div>
            <div className={cx('choices')}>
                <p className={cx('choices-sub')}>Chọn câu trả lời đúng.</p>
                <ul className={cx('list')}>
                    {data.questions.map((item, index) => {
                        const letter = String.fromCharCode(65 + index);
                        return (
                            <li
                                className={cx('item', {
                                    active: index == choiceActive,
                                    error: isWrong,
                                    correct: isCorrect,
                                })}
                                key={index}
                                onClick={() => handleChoice(item, index)}
                            >
                                {`${letter}. ${item.text}`}
                            </li>
                        );
                    })}
                </ul>
                <Flex justify={isCorrect || isWrong ? 'space-between' : 'end'} style={{ marginTop: '10px' }}>
                    <span className={cx('correct-alert', { active: isCorrect })}>correct answer!</span>
                    <span className={cx('error-alert', { active: isWrong })}>wrong answer!</span>
                    <Button type="primary" onClick={handleAnswer}>
                        Answer
                    </Button>
                </Flex>
            </div>
        </div>
    );
}

export default LessonExercise;
