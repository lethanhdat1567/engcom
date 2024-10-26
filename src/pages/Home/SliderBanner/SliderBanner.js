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
        autoplaySpeed: 3000,
    };
    const data = [
        {
            title: 'Welcome to the Learning Community',
            content:
                'Welcome to a vibrant space where knowledge seekers come together to connect, learn, and grow. Here, you’ll find a supportive community eager to share insights and experiences. Embark on your exploration journey with us, discover new ideas, and unlock your potential as we learn from one another!',
            banner: imgs.thankBanner,
        },
        {
            title: 'Together Towards Knowledge',
            content: `Connect with fellow learning enthusiasts and immerse yourself in a collaborative environment. Share your insights, explore new ideas, and engage in enriching discussions. Together, we can enhance our skills and broaden our horizons. Join us in this exciting journey of discovery and growth!`,
            banner: imgs.togetherBanner,
        },
        {
            title: 'Empowering Students, Shaping Futures',
            content: `Our students are more than learners; they are innovators who explore, dream, and cultivate a passion for lifelong growth. Join us in building a future where curiosity and compassion thrive together.`,
            banner: imgs.studentBanner,
        },
        {
            title: 'Inspiring Minds, Shaping Futures',
            content: `Our educators are more than teachers; they are mentors who guide, inspire, and ignite a love for lifelong learning. Join us in creating a future where knowledge and compassion go hand in hand.`,
            banner: imgs.teacherBanner,
        },
    ];
    return (
        <Slider {...settings} className="slider-banner" arrows={false}>
            {data.map((item, index) => (
                <div className={cx('banner-wrap', `st-${index}`)} key={index}>
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
