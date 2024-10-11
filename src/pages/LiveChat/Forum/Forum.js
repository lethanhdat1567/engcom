import classNames from 'classnames/bind';
import styles from './Forum.module.scss';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import { useEffect, useState } from 'react';
import ProfileForum from './Component/ProfileForum/ProfileForum';
import NavMobile from './Component/NavMobile/NavMobile';
import ScrollToTop from '~/utils/ScrollToTop';

const cx = classNames.bind(styles);

function Forum() {
    const [activeIndex, setActiveIndex] = useState(0);
    const compData = [<Home />, <ProfileForum />];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeIndex]);
    return (
        <div className={cx('wrap')}>
            <Navbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            <NavMobile activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            {compData[activeIndex]}
        </div>
    );
}

export default Forum;
