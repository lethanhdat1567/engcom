import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Logo from '~/components/Logo/Logo';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    const list = [
        {
            title: 'UseFullLink',
            children: ['Home', 'About us', 'Services', 'Community'],
        },
        {
            title: 'Contact Info',
            children: [
                'Da Phuoc, Binh Chanh, Ho Chi Minh city',
                'Posts and Telecommunications Institute of Technology',
            ],
        },
        {
            title: 'Follow us',
            children: ['Facebook', 'Instagram', 'Threads'],
        },
        {
            title: 'Legal',
            children: ['Website by daphuoc_broders', '©2024. All Rights Reserved'],
        },
    ];
    return (
        <footer className={cx('footer')}>
            <div className="container">
                <div className="row g-5">
                    <div className="col-12 col-lg-2">
                        <div className={cx('main')}>
                            <Logo white />
                            <p className={cx('main-desc')}>
                                This's a website made by 3 members study at PTIT
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-10">
                        <div className={cx('list-wrap')}>
                            {list.map((item, index) => {
                                return (
                                    <ul className={cx('list')} key={index}>
                                        <h3 className={cx('title')}>{item.title}</h3>
                                        {item.children.map((link, index) => {
                                            return (
                                                <li key={index} className={cx('item')}>
                                                    {link}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
