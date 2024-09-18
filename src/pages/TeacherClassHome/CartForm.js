import classNames from 'classnames/bind';
import styles from './TeacherClassHome.module.scss';
import { Button, Form, Input, message, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CartForm({ setTitleCart }) {
    const props = {
        name: 'file',
        action: '',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className={cx('form')}>
            <Form layout="vertical">
                <Form.Item label="Cart title">
                    <Input
                        placeholder="Write your cart title..."
                        onChange={(e) => setTitleCart(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Upload {...props}>
                        <Button>
                            <FontAwesomeIcon icon={faUpload} />
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CartForm;
