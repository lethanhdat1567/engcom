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
    const data = [
        {
            title: 'Welcome to the Learning Community',
            content:
                'Welcome to a vibrant space where knowledge seekers come together to connect, learn, and grow. Here, you’ll find a supportive community eager to share insights and experiences. Embark on your exploration journey with us, discover new ideas, and unlock your potential as we learn from one another!',
            banner: imgs.thankBanner,
            color: {
                backgroundImage: 'linear-gradient(90deg, #379f87 0%, #f0fbf0 69%)',
            },
        },
        {
            title: 'Together Towards Knowledge',
            content: `Connect with fellow learning enthusiasts and immerse yourself in a collaborative environment. Share your insights, explore new ideas, and engage in enriching discussions. Together, we can enhance our skills and broaden our horizons. Join us in this exciting journey of discovery and growth!`,
            banner: imgs.togetherBanner,
            color: {
                backgroundColor: '#4158D0',
                backgroundImage: 'linear-gradient(90deg, #4158D0 0%, #C850C0 46%, #e3987f 70%)',
            },
        },
    ];
    return (
        <Slider {...settings} className="slider-banner" arrows={false}>
            {data.map((item, index) => (
                <div className={cx('banner-wrap', `st-${index}`)} style={item.color} key={index}>
                    <div className={cx('st-left')}>
                        <h2 className={cx('title')}>{item.title}</h2>
                        <p className={cx('desc')}>{item.content}</p>
                    </div>
                    <div className={cx('st-right')}>
                        <img src={item.banner} className={cx('img-sub')} />
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default SliderBanner;
