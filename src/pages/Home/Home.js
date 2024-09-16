import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import SliderBanner from './SliderBanner';
import Classes from './Classes';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faUsers } from '@fortawesome/free-solid-svg-icons';
import Validate from '../Validate/Validate';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const data = [
        {
            title: 'Pro classes',
            type: 'class',
            price: 'cost',
            children: [
                {
                    total: 100,
                },
                {
                    total: 100,
                },
                {
                    total: 100,
                },
                {
                    total: 100,
                },
            ],
        },
        {
            title: 'Free classes',
            type: 'class',
            price: 'free',
            children: [
                {
                    total: 0,
                },
                {
                    total: 0,
                },
                {
                    total: 0,
                },
                {
                    total: 0,
                },
            ],
        },
        {
            title: 'Blogs',
            type: 'blogs',
            children: [
                {
                    total: 0,
                },
                {
                    total: 0,
                },
                {
                    total: 0,
                },
                {
                    total: 0,
                },
            ],
        },
    ];
    return (
        <div className={cx('home')}>
            <div className={cx('banner')}>
                <SliderBanner />
            </div>
            <div className="container">
                <div className={cx('content')}>
                    {data.map((item, index) => {
                        return <Classes data={item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
