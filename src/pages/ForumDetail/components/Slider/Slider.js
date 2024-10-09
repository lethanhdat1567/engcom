import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function Slider() {
    return (
        <div className={cx('slider')}>
            <Swiper
                className={cx('slider')}
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
    );
}

export default Slider;
