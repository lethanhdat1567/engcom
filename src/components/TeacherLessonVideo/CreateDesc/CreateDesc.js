import classNames from 'classnames/bind';
import styles from './CreateDesc.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JoditEditor from 'jodit-react';

const cx = classNames.bind(styles);

function CreateDesc() {
    return (
        <div className={cx('wrap')}>
            <JoditEditor config={{ height: 600 }} />
        </div>
    );
}

export default CreateDesc;
