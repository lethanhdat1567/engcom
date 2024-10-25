import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import Slider from 'react-slick';
import './Slider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function SliderBanner() {
    var settings = {
        dots: true,
        infinite: true,
        // speed: 1000,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 5000,
    };
    return (
        <Slider {...settings} className="slider-banner" arrows={false}>
            <div className={cx('banner-wrap', 'st')}>
                <div className={cx('st-left')}>
                    <h2 className={cx('title')}>Thank You for Supporting Our Website!</h2>
                    <p className={cx('desc')}>
                        Your presence means a lot to us. We truly appreciate your support and hope you have a
                        delightful and enriching experience on our site. Explore the content we offer, and
                        feel free to reach out if you have any questions. Wishing you a fantastic time!
                    </p>
                </div>
                <div className={cx('st-right')}>
                    <img src={imgs.thankBanner} className={cx('img-sub')} />
                </div>
            </div>
            <div className={cx('banner-wrap')}>
                <img src={imgs.banner1} className={cx('img')} />
            </div>
            <div className={cx('banner-wrap')}>
                <img src={imgs.banner1} className={cx('img')} />
            </div>
        </Slider>
    );
}

export default SliderBanner;
