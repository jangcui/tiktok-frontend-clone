import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/component/Button';
import { PlayIcon } from '~/component/Icons';
import FooterUploadPage from '../UploadPage/FooterUploadPage';
import styles from './NotFoundPage.module.scss';
const cx = classNames.bind(styles);

function NotFoundPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <span className={cx('code')}>404</span>
                <h1 className={cx('title')}>Couldn't find this page.</h1>
                <Link to="/">
                    <Button primary className={cx('btn')}>
                        <PlayIcon />
                        <p> Back to home page</p>
                    </Button>
                </Link>
            </div>
            <FooterUploadPage />
        </div>
    );
}

export default NotFoundPage;
