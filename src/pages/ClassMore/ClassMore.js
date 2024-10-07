import classNames from 'classnames/bind';
import styles from './ClassMore.module.scss';
import { Flex, Select } from 'antd';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ClassMore() {
    const [activeNav, setActiveNav] = useState(0);
    const navItems = ['All class', 'Public class', 'Private class'];
    return (
        <div className={cx('wrap')}>
            <nav className={cx('nav')}>
                <ul className={cx('list')}>
                    {navItems.map((item, index) => {
                        return (
                            <li
                                className={cx('item', { active: activeNav === index })}
                                key={index}
                                onClick={() => setActiveNav(index)}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
                <Flex gap={10}>
                    <Select defaultValue="all" className={cx('options')}>
                        <Select.Option value="all">All class</Select.Option>
                        <Select.Option value="math">Math class</Select.Option>
                        <Select.Option value="physic">Physic class</Select.Option>
                        <Select.Option value="english">English class</Select.Option>
                        <Select.Option value="other">Other type class</Select.Option>
                    </Select>
                    <Select defaultValue="population" className={cx('filter')}>
                        <Select.Option value="population">Population</Select.Option>
                        <Select.Option value="newest">Newest</Select.Option>
                        <Select.Option value="lastest">Lastest</Select.Option>
                    </Select>
                </Flex>
            </nav>
            <div className={cx('body')}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-5">
                    <div>sdasds</div>
                </div>
            </div>
        </div>
    );
}

export default ClassMore;
