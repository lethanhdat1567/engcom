import classNames from 'classnames/bind';
import styles from './CreatePractice.module.scss';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function QuizTemplate() {
    return (
        <div className={cx('quiz-template')}>
            <h3 className={cx('quiz-title')}>Quiz</h3>
            <div className={cx('quiz-banner')}>
                <img className={cx('quiz-img')} src={imgs.cartImg} />
            </div>
        </div>
    );
}

export default QuizTemplate;
