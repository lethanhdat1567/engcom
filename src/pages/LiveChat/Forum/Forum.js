import classNames from 'classnames/bind';
import styles from './Forum.module.scss';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import { useState } from 'react';
import ProfileForum from './Component/ProfileForum/ProfileForum';

const cx = classNames.bind(styles);

function Forum() {
    const [activeIndex, setActiveIndex] = useState(0);
    const compData = [<Home />, <ProfileForum />];
    return (
        <div className={cx('wrap')}>
            <Navbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            {compData[activeIndex]}
        </div>
    );
}

export default Forum;
