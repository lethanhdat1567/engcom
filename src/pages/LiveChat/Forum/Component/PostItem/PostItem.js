import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { Avatar } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Post.scss';
import imgs from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function PostItem() {
    return (
        <div className={cx('post')}>
            <Avatar style={{ flexShrink: 0 }}>A</Avatar>
            <div className={cx('body')}>
                <div className={cx('head-name')}>
                    <h3 className={cx('name')}>Le Thanh Dat</h3>
                    <span className={cx('timer')}>3 months ago</span>
                    <Tippy
                        interactive
                        trigger="click"
                        placement="bottom"
                        render={(attrs) => (
                            <div {...attrs} className={cx('dropdown')}>
                                <span className={cx('drop-item')}>
                                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '4px' }} />
                                    Delete
                                </span>
                            </div>
                        )}
                    >
                        <span className={cx('option')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </span>
                    </Tippy>
                </div>
                <p className={cx('content')}>
                    sadasdsadasdssadasdsadasdssadasdsadasdssadasdsadasdssadasdsadasdssadasdsadasdssadasdsadasdssadasdsadasdssadasdsadasdssadasdsadasds
                </p>
                <div className={cx('slider')}>
                    <Swiper
                        className={'slider-post'}
                        spaceBetween={10}
                        slidesPerView="auto"
                        autoplay={{ delay: 5000 }}
                    >
                        <SwiperSlide>
                            <div className={cx('banner')}>
                                <img src={imgs.meeting} className={cx('img')} />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('banner')}>
                                <img src={imgs.meeting} className={cx('img')} />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('banner')}>
                                <img src={imgs.meeting} className={cx('img')} />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('footer-wrap')}>
                        <span className={cx('header')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <span className={cx('header-sub')}>1</span>
                    </div>
                    <Link to={`${process.env.REACT_APP_ROOT}/community/forum/1`}>
                        <div className={cx('footer-wrap')}>
                            <span className={cx('header')}>
                                <FontAwesomeIcon icon={faComment} />
                            </span>
                            <span className={cx('header-sub')}>1</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
