import classNames from 'classnames/bind';
import styles from './NoteItem.module.scss';
import { penNote, trashNote } from '~/assets/Icon';
import { deleteNote } from '~/requestApi/requestNote';
import CreateNote from '../Note/CreateNote/CreateNote';
import { useState } from 'react';
import UpdateNote from '../Note/UpdateNote/UpdateNote';

const cx = classNames.bind(styles);

function NoteItem({ data, utils }) {
    const { setNoteItems, noteItems, setShowUpdate, setUpdateValues } = utils;

    const handleDelete = async () => {
        const res = await deleteNote(data.id);

        const deleteUser = res.data.data;
        const newNotes = noteItems.filter((item, index) => {
            return item.id !== deleteUser.id;
        });
        setNoteItems(newNotes);
    };
    const handleUpdate = () => {
        setShowUpdate(true);
        setUpdateValues(data);
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <h4 className={cx('title')}>{data.title}</h4>
                <div className={cx('utils')}>
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
    );
}

export default NoteItem;
