import classNames from 'classnames/bind';
import styles from './AskItem.module.scss';
import Item from './Item';

const cx = classNames.bind(styles);

function AskItem({ utils }) {
    const { askData, setAskData } = utils;

    return (
        <div className={cx('wrap')}>
            {askData.map((item, index) => {
                const askData = item.ask;
                const userData = item.user;

                return <Item askDataItem={askData} userData={userData} key={index} utils={utils} />;
            })}
        </div>
    );
}

export default AskItem;
