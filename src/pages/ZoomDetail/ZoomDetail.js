import classNames from 'classnames/bind';
import styles from './ZoomDetail.module.scss';
import FormZoom from './compnents/FormZoom/FormZoom';
import { useState } from 'react';
import VideoCall from '../VideoCall/VideoCall';

const cx = classNames.bind(styles);

function ZoomDetail() {
    return (
        <div className={cx('wrap')}>
            <FormZoom />
        </div>
    );
}

export default ZoomDetail;
