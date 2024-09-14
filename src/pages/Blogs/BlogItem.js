import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import InfoItem from '~/components/InfoItem/InfoItem';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as bookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import Button from '~/components/Button';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function BlogItem() {
    const data = {
        img: imgs.unsetAvatar,
        title: 'Le Thanh Dat',
    };
    const ellipData = [
        {
            title: 'Chia se len Facebook',
            icon: <FontAwesomeIcon icon={faFacebook} />,
        },
        {
            title: 'Chia se len Instagram',
            icon: <FontAwesomeIcon icon={faInstagram} />,
        },
        {
            title: 'Chia se len Twitter',
            icon: <FontAwesomeIcon icon={faTwitter} />,
        },
    ];
    return (
        <section className={cx('blog')}>
            <div className={cx('header')}>
                <InfoItem data={data} large />
                <div className={cx('utils')}>
                    {/* <span className={cx('icon', 'fa-lg')}>
                        <FontAwesomeIcon icon={faBookmark} />
                    </span> */}
                    <span className={cx('icon', 'fa-lg')}>
                        <FontAwesomeIcon icon={bookmarkRegular} />
                    </span>
                    <Tippy
                        interactive
                        placement="bottom-end"
                        trigger="click"
                        render={(attrs) => {
                            return (
                                <div {...attrs}>
                                    <ul className={cx('ellip-list')}>
                                        {ellipData.map((item, index) => {
                                            return (
                                                <li className={cx('ellip-item')} key={index}>
                                                    <Button leftIcon={item.icon} key={index}>
                                                        {item.title}
                                                    </Button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        }}
                    >
                        <span className={cx('icon', 'fa-lg')}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </span>
                    </Tippy>
                </div>
            </div>
            <div className={cx('blog-banner')}>
                <Link>
                    <img className={cx('blog-img')} src={imgs.banner1} />
                </Link>
            </div>
            <div className={cx('body')}>
                <Link>
                    <h3 className={cx('blog-title')}>
                        Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày
                    </h3>
                </Link>
                <p className={cx('body-desc')}>
                    Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn
                    100 bài học và 200 bài viết. Bài viết này.o Nguyên, mình đã làm một dự án website
                    front-end với hơn 100 bài học và 200 bài viết. Bài viết này...Xin chào mọi người mình là
                    Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bào
                    Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết. Bài
                    viết này...Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website
                    front-end với hơn 100 bài học và 200 bà..Xin chào mọi người mình là Lý Cao Nguyên, mình đã
                    làm một dự án website front-end với hơn 100 bài học và 200 bài viết. Bài viết này...
                </p>
            </div>
            <div className={cx('footer')}>
                <span className={cx('blog-info')}>3 months later</span>
                <span className={cx('blog-info')}>4 minutes</span>
            </div>
        </section>
    );
}

export default BlogItem;
