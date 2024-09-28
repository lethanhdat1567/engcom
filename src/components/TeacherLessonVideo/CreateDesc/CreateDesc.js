import classNames from 'classnames/bind';
import styles from './CreateDesc.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JoditEditor from 'jodit-react';

const cx = classNames.bind(styles);

function CreateDesc({ utils }) {
    return (
        <div className={cx('wrap')}>
            <JoditEditor config={{ height: 600 }} onBlur={(content) => utils.setDescValue(content)} />
        </div>
    );
}

export default CreateDesc;
