import classNames from 'classnames/bind';
import styles from './NoteModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function NoteModal({ data, showModal, setShowModal, activeNote }) {
    return (
        <div className={cx('modal', { active: showModal })}>
            <div className={cx('content')}>
                <div className={cx('back')} onClick={() => setShowModal(false)}>
                    <FontAwesomeIcon icon={faXmark} className="fa-xl" />
                </div>
                <div className={cx('body')}>
                    <span className={cx('title')}>{activeNote.title}</span>
                    <div
                        className={cx('text')}
                        dangerouslySetInnerHTML={{ __html: activeNote.content }}
                    ></div>
                </div>
            </div>
            <div className={cx('over-lay')}></div>
        </div>
    );
}

export default NoteModal;
