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
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    return (
        <Slider {...settings} className="slider-banner" arrows={false}>
            <div className={cx('banner-wrap')}>
                <img src={imgs.banner1} className={cx('img')} />
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
