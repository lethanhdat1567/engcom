import classNames from 'classnames/bind';
import styles from './QuizCreate.module.scss';
import './JopiEditor.scss';
import JoditEditor from 'jodit-react';
import { Button, Flex, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { memo, useId, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { teacher } from '~/redux/reducer/TeacherSlice';

const cx = classNames.bind(styles);
const MemoizedJoditEditor = memo(JoditEditor);

function QuizCreate() {
    const id = useId();
    const lesson = useSelector((state) => state.activeLesson.lesson);
    const dispatch = useDispatch();

    const [questionInput, setQuestionInput] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [questionData, setQuestionData] = useState([]);
    const [questionValue, setQuestionValue] = useState('');
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

    const config = useMemo(
        () => ({
            readonly: false,
            showFooter: false,
            askBeforePasteHTML: false,
        }),
        [],
    );

    const handleSave = () => {
        const values = {
            id,
            lesson_id: lesson.id,
            title: title,
            desc: desc,
            questions: questionData,
            correctAnswerIndex: correctAnswerIndex,
        };
        dispatch(teacher.actions.setContent(values));
    };

    function handleAdd() {
        setQuestionData([...questionData, questionValue]);
        setQuestionInput(false);
        setQuestionValue('');
    }

    function handleDelete(index) {
        const updatedQuestions = questionData.filter((_, i) => i !== index);
        setQuestionData(updatedQuestions);
        if (correctAnswerIndex === index) setCorrectAnswerIndex(null); // Reset nếu xóa đáp án đúng
    }

    return (
        <div className={cx('wrap')}>
            <Button type="primary" style={{ marginBottom: '10px' }} onClick={handleSave}>
                Export
            </Button>
            <Form>
                <Form.Item>
                    <Input onChange={(e) => setTitle(e.target.value)} placeholder="Title..." />
                </Form.Item>
                <div className={cx('question')}>
                    <MemoizedJoditEditor
                        onBlur={(content) => setDesc(content)}
                        config={config}
                        className="edit"
                    />
                </div>
                <div className={cx('answers')}>
                    <h2>Selection</h2>
                    <div className={cx('answers-body')}>
                        {questionData.map((item, index) => {
                            const letter = String.fromCharCode(65 + index);
                            return (
                                <div className={cx('choice-wrap')} key={index}>
                                    <div className={cx('choice-head')}>
                                        <span style={{ marginRight: '8px' }}>{letter}.</span>
                                        <div className={cx('choices')}>{item}</div>
                                        <div className={cx('correct-choice')}>
                                            <input
                                                type="radio"
                                                name="correctAnswer"
                                                checked={correctAnswerIndex === index}
                                                onChange={() => setCorrectAnswerIndex(index)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className={cx('choice-delete')}
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    {questionInput && (
                        <Form.Item>
                            <Flex vertical="column" gap="small">
                                <Input
                                    placeholder="answer input"
                                    onChange={(e) => setQuestionValue(e.target.value)}
                                />
                                <Flex gap="small">
                                    <Button type="primary" danger onClick={() => setQuestionInput(false)}>
                                        Cancle
                                    </Button>
                                    <Button
                                        disabled={!questionValue.trim()}
                                        type="primary"
                                        onClick={handleAdd}
                                    >
                                        Submit
                                    </Button>
                                </Flex>
                            </Flex>
                        </Form.Item>
                    )}
                    <div className={cx('more')} onClick={() => setQuestionInput(true)}>
                        <span className={cx('more-icon')}>
                            <FontAwesomeIcon icon={faSquarePlus} className="fa-lg" />
                        </span>
                        <span className={cx('more-title')}>Create selection</span>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default QuizCreate;
