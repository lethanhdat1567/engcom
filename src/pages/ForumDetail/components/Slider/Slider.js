import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function Slider({ images, setIsZoomIn, setZoomSrc }) {
    if (images?.length > 0) {
        return (
            <div className={cx('slider')}>
                <Swiper className="slider" spaceBetween={10} slidesPerView="auto" autoplay={{ delay: 5000 }}>
                    {images.map((item, index) => {
                        return (
                            <SwiperSlide
                                style={{ width: '224px', cursor: 'grab' }}
                                key={index}
                                onClick={() => {
                                    setIsZoomIn(true);
                                    setZoomSrc(item);
                                }}
                            >
                                <div className={cx('banner')}>
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_UPLOAD}/${item}`}
                                        className={cx('img')}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        );
    }
}

export default Slider;
