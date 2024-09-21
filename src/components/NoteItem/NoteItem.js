import classNames from 'classnames/bind';
import styles from './NoteItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { penNote, trashNote } from '~/assets/Icon';

const cx = classNames.bind(styles);

function NoteItem({ data, setShowCreateNote }) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <h4 className={cx('title')}>{data.title}</h4>
                <div className={cx('utils')}>
                    <span className={cx('icon')} onClick={() => setShowCreateNote(true)}>
                        {penNote}
                    </span>
                    <span className={cx('icon')}>{trashNote}</span>
                </div>
            </div>
            <div className={cx('desc-wrap')}>
                <p>{data.content}</p>
            </div>
        </div>
    );
}

export default NoteItem;
