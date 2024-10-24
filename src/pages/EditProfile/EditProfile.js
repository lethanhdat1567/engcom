import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function EditProfile() {
    const [isActive, setActive] = useState(-1);

    const handleResize = () => {
        if (window.innerWidth < 998) {
            setActive(-1);
        } else {
            setActive(0);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={cx('wrap')}>
            <div className="container">
                <div className={cx('content')}>
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <Navbar isActive={isActive} setActive={setActive} />
                        </div>
                        <div className="col-12 col-lg-8 ">
                            <Content isActive={isActive} setActive={setActive} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
