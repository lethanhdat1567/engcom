import classNames from 'classnames/bind';
import styles from './PrivateHeader.module.scss';
import Tippy from '@tippyjs/react/headless';
import ClassItem from '~/components/ClassItem/ClassItem';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMyClass } from '~/requestApi/requestMyClass';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Classes() {
    const user = useSelector((state) => state.user.user);
    const [isShow, setShow] = useState(false);
    const location = useLocation();
    const [classesData, setClassesData] = useState([]);
    const handleClick = () => {
        if (location.pathname == '/my-class') {
            return;
        }
        setShow(true);
    };

    useEffect(() => {
        getMyClass(user.id)
            .then((res) => {
                setClassesData(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <li className={cx('item-classes')}>
            <Tippy
                interactive
                placement="bottom-end"
                visible={isShow}
                onClickOutside={() => setShow(false)}
                render={(attrs) => (
                    <div {...attrs} className={cx('class-drop')}>
                        <div className={cx('class-head')}>
                            <h3 className={cx('class-title')}>My Classes</h3>
                            {/* Fix link */}
                            <Link
                                to={`${process.env.REACT_APP_ROOT}/my-class`}
                                className={cx('class-btn')}
                                onClick={() => setShow(false)}
                            >
                                See all
                            </Link>
                        </div>
                        <div className={cx('class-body')}>
                            {classesData.map((item, index) => {
                                return <ClassItem data={item} key={index} />;
                            })}
                        </div>
                    </div>
                )}
            >
                <h2 className={cx('class-title')} onClick={handleClick}>
                    My Classes
                </h2>
            </Tippy>
        </li>
    );
}

export default Classes;
