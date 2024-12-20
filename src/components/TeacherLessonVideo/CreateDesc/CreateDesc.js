import classNames from 'classnames/bind';
import styles from './CreateDesc.module.scss';
import JoditEditor from 'jodit-react';
import { memo, useRef } from 'react';

const cx = classNames.bind(styles);

function CreateDesc({ utils }) {
    const editRef = useRef(null);
    const handleChange = (content) => {
        utils.setDescValue(content);
    };
    return (
        <div className={cx('wrap')}>
            <JoditEditor
                ref={editRef}
                config={{ height: 600 }}
                value={utils.descValue}
                onBlur={(content) => handleChange(content)}
            />
        </div>
    );
}

export default memo(CreateDesc);
