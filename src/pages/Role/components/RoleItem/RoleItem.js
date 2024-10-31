import classNames from 'classnames/bind';
import styles from './RoleItem.module.scss';

const cx = classNames.bind(styles);

function RoleItem({ data, index, currentChoiceIndex, setCurrentChoiceIndex }) {
    return (
        <div
            className={cx('wrap', { active: currentChoiceIndex == index })}
            onClick={() => setCurrentChoiceIndex(index)}
        >
            <img className={cx('img')} src={data.banner} />
            <div className={cx('body')}>
                <h2 className={cx('title')}>{data.title}</h2>
                <p className={cx('desc')}>
                    Choosing a role helps you engage in learning and track your progress effectively. 📚✨
                </p>
                <h3 className={cx('sub-title')}>Features:</h3>
                <ul className={cx('list')}>
                    {data.features.map((item, index) => {
                        return (
                            <li className={cx('item')} key={index}>
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default RoleItem;
