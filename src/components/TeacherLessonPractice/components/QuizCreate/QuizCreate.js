import classNames from 'classnames/bind';
import styles from './QuizCreate.module.scss';
import './JopiEditor.scss';
import JoditEditor from 'jodit-react';
import { Button, Col, Flex, Form, Input, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { memo, useMemo, useState } from 'react';
import Item from 'antd/es/list/Item';

const cx = classNames.bind(styles);
const MemoizedJoditEditor = memo(JoditEditor);

function QuizCreate() {
    const [questionInput, setQuestionInput] = useState(false);
    const [questionData, setQuestionData] = useState([]);
    const [questionValue, setQuestionValue] = useState('');

    const config = useMemo(
        () => ({
            uploader: {
                url: '/api/upload',
                format: 'json',
                insertImageAsBase64URI: true,
            },
            readonly: false,
            showFooter: false,
        }),
        [],
    );

    function handleAdd() {
        setQuestionData([...questionData, questionValue]);
        setQuestionInput(false);
        setQuestionValue('');
    }

    return (
        <div className={cx('wrap')}>
            <Form>
                <Form.Item>
                    <Input placeholder="Title..." />
                </Form.Item>
                <div className={cx('question')}>
                    <MemoizedJoditEditor config={config} className="edit" />
                </div>
                <div className={cx('answers')}>
                    <div className={cx('answers-body')}>
                        {questionData.map((item, index) => {
                            const letter = String.fromCharCode(65 + index);
                            return (
                                <Row key={index} align="middle" style={{ marginBottom: '8px' }}>
                                    <Col>
                                        <span style={{ marginRight: '8px' }}>{letter}.</span>
                                    </Col>
                                    <Col flex="1">
                                        <Input value={item} />
                                    </Col>
                                </Row>
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
                        <span className={cx('more-title')}>Create more</span>
                    </div>
                </div>
                <Button type="primary">Export</Button>
            </Form>
        </div>
    );
}

export default QuizCreate;
