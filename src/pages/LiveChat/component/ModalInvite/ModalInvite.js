import classNames from 'classnames/bind';
import styles from './ModalInvite.module.scss';
import { Modal } from 'antd';

const cx = classNames.bind(styles);

function ModalInvite() {
    return <Modal title="Invite more people to your class"></Modal>;
}

export default ModalInvite;
