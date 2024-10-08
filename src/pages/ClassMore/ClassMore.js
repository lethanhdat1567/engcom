import classNames from 'classnames/bind';
import styles from './ClassMore.module.scss';
import { Flex, Select } from 'antd';
import { useEffect, useState } from 'react';
import CartLoading from '~/components/Loading/CartLoading/CartLoading';

const cx = classNames.bind(styles);

function ClassMore() {
    const [loading, setLoading] = useState(true);
    const [activeNav, setActiveNav] = useState(0);
    const [typeValue, setTypeValue] = useState('all');
    const [filterValue, setFilterValue] = useState('all');
    const navItems = [
        {
            title: 'All class',
            name: 'all',
        },
        {
            title: 'Public class',
            name: 'public',
        },
        {
            title: 'Private class',
            name: 'private',
        },
    ];

    useEffect(() => {
        const classValue = navItems[activeNav].name;
        const type = typeValue;
        const filter = filterValue;

        console.log({ classValue, type, filter });
    }, [filterValue, typeValue, activeNav]);

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
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
                <Flex gap={10} className={cx('filter-wrap')}>
                    <Select
                        defaultValue={typeValue}
                        className={cx('options')}
                        onChange={(value) => setTypeValue(value)}
                    >
                        <Select.Option value="all">All class</Select.Option>
                        <Select.Option value="math">Math class</Select.Option>
                        <Select.Option value="physic">Physic class</Select.Option>
                        <Select.Option value="english">English class</Select.Option>
                        <Select.Option value="other">Other type class</Select.Option>
                    </Select>
                    <Select
                        defaultValue={filterValue}
                        className={cx('filter')}
                        onChange={(value) => setFilterValue(value)}
                    >
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="population">Population</Select.Option>
                        <Select.Option value="newest">Newest</Select.Option>
                        <Select.Option value="lastest">Lastest</Select.Option>
                    </Select>
                </Flex>
            </nav>
            <div className={cx('body')}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-5">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => {
                            return (
                                <div className="col" key={index}>
                                    <CartLoading />
                                </div>
                            );
                        })
                    ) : (
                        <div>sdasds</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ClassMore;
