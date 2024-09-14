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
    const classes = [
        {
            title: 'Pro classes',
            type: 'cart',
            children: [
                {
                    title: 'Le Thanh Dat',
                    img: imgs.unsetAvatar,
                },
                {
                    title: '16.000',
                    leftIcon: <FontAwesomeIcon icon={faUsers} />,
                },
                {
                    title: '5',
                    leftIcon: <FontAwesomeIcon icon={faBook} />,
                },
            ],
        },
        {
            title: 'Free classes',
            type: 'blog',
            children: [
                {
                    title: 'Le Thanh Dat',
                    img: imgs.unsetAvatar,
                },
                {
                    title: '16.000',
                    leftIcon: <FontAwesomeIcon icon={faEye} />,
                },
            ],
        },
        {
            title: 'Blogs',
            type: 'blog',
            children: [
                {
                    title: 'Le Thanh Dat',
                    img: imgs.unsetAvatar,
                },
                {
                    title: '16.000',
                    leftIcon: <FontAwesomeIcon icon={faEye} />,
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
                    {classes.map((item, index) => {
                        return <Classes data={item} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
