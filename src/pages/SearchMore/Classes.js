import classNames from 'classnames/bind';
import styles from './SearchMore.module.scss';
import ClassItemLarge from '~/components/ClassItemLarge/ClassItemLarge';

const cx = classNames.bind(styles);

function Classes({ classData }) {
    if (classData) {
        if (classData.children?.length > 0) {
            return (
                <div className={cx('class-wrap')}>
                    {classData?.children?.map((item, index) => {
                        return <ClassItemLarge data={item} key={index} />;
                    })}
                </div>
            );
        } else {
            return <div>Not found {classData.type}</div>;
        }
    }
}

export default Classes;
