import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Logo from '~/components/Logo/Logo';

const cx = classNames.bind(styles);

function Footer() {
    const list = [
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
            children: ['Developed by Đạt, Quân, Bảo', '©2024. All Rights Reserved'],
        },
    ];
    return (
        <footer className={cx('footer')}>
            <div className="container">
                <div className="row g-5">
                    <div className="col-12 col-lg-3">
                        <div className={cx('main')}>
                            <Logo white />
                            <p className={cx('main-desc')}>
                                Welcome to our website, created by a dedicated team of three students from
                                PTIT. We aim to foster a collaborative learning environment and connect
                                individuals passionate about education.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9">
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
