import classNames from 'classnames/bind';
import styles from './SearchContent.module.scss';
import AccountItem from '~/components/AccountItem';
import ClassSearch from '~/components/ClassSearch/ClassSearch';

const cx = classNames.bind(styles);

function ValidateData({ data }) {
    if (data.type) {
        const validate = {
            users() {
                return data.children.map((item, index) => {
                    return <AccountItem key={index} data={item} />;
                });
            },
            classes() {
                return data.children.map((item, index) => {
                    return <ClassSearch key={index} data={item} />;
                });
            },
        };

        return validate[data.type]();
    }
}

export default ValidateData;
