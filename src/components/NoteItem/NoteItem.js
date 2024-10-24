import classNames from 'classnames/bind';
import styles from './NoteItem.module.scss';
import { penNote, trashNote } from '~/assets/Icon';
import { deleteNote } from '~/requestApi/requestNote';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ownData } from '~/redux/reducer/OwnDataSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function NoteItem({ data, utils, setShowModal, setActiveNote }) {
    const { setShowUpdate, setUpdateValues } = utils;
    // redux
    const dispatch = useDispatch();
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleDelete = async () => {
        if (!deleteLoading) {
            setDeleteLoading(true);
            const res = await deleteNote(data.id);
            const deleteUser = res.data.data;
            dispatch(ownData.actions.deleteNotes(deleteUser));
            setDeleteLoading(false);
        }
    };
    const handleUpdate = () => {
        setShowUpdate(true);
        setUpdateValues(data);
    };

    const handleDetail = () => {
        setShowModal(true);
        setActiveNote(data);
    };

    return (
        <>
            <div className={cx('wrap', { delete: deleteLoading })}>
                <div className={cx('header')}>
                    <h4 className={cx('title')}>{data.title}</h4>
                    <div className={cx('utils')}>
                        <span className={cx('icon')} onClick={handleDetail}>
                            <FontAwesomeIcon icon={faEye} className="fa-lg" style={{ color: '#5174F1' }} />
                        </span>
                        <span className={cx('icon')} onClick={handleUpdate}>
                            {penNote}
                        </span>
                        <span className={cx('icon')} onClick={handleDelete}>
                            {trashNote}
                        </span>
                    </div>
                </div>
                <div className={cx('desc-wrap')}>
                    <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
                </div>
            </div>
        </>
    );
}

export default NoteItem;
