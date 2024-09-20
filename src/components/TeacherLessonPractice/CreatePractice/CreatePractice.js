import classNames from 'classnames/bind';
import styles from './CreatePractice.module.scss';
import QuizTemplate from './QuizTemplate';

const cx = classNames.bind(styles);

function CreatePractice() {
    return (
        <div className={cx('wrap')}>
            <h2 className={cx('title')}>Choice your template</h2>
            <div className={cx('template-wrap')}>
                <div className={cx('row row-cols-2 g-5')}>
                    <div className={cx('col')}>
                        <QuizTemplate />
                    </div>
                    <div className={cx('col')}>
                        <QuizTemplate />
                    </div>
                    <div className={cx('col')}>
                        <QuizTemplate />
                    </div>
                    <div className={cx('col')}>
                        <QuizTemplate />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePractice;
