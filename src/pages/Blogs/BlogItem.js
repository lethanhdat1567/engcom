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
import extractContent from '~/utils/extractContent';
import { handleTime } from '~/utils/handleTime';
import { handleAvatar } from '~/utils/handleAvatar';
import Img from '~/components/Img';

const cx = classNames.bind(styles);

function BlogItem({ data }) {
    const { blog, user } = data;
    const { firstImage, content } = extractContent(blog?.content);

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
                <Link to={`${process.env.REACT_APP_ROOT}/profile/${blog.user_id}`} className={cx('info')}>
                    <Img
                        className={cx('info-avatar')}
                        src={
                            user?.avatar?.includes('googleusercontent.com') ||
                            user?.avatar?.includes('facebook.com')
                                ? user.avatar
                                : `${process.env.REACT_APP_BACKEND_UPLOAD}/${user.avatar}`
                        }
                        alt="User Avatar"
                    />
                    <span className={cx('info-name')}>{user.user}</span>
                </Link>
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
                <Link to={`${process.env.REACT_APP_ROOT}/blogs/${blog?.id}`}>
                    <img className={cx('blog-img')} src={firstImage ? firstImage : imgs.NoImg} />
                </Link>
            </div>
            <div className={cx('body')}>
                <Link to={`${process.env.REACT_APP_ROOT}/blogs/${blog?.id}`}>
                    <h3 className={cx('blog-title')}>{blog?.title}</h3>
                </Link>
                <div dangerouslySetInnerHTML={{ __html: content }} className={cx('body-desc')}></div>
            </div>
            <div className={cx('footer')}>
                <span className={cx('blog-info')}>{handleTime(data.updated_at)}</span>
                <span className={cx('blog-info')}>4 minutes</span>
            </div>
        </section>
    );
}

export default BlogItem;
