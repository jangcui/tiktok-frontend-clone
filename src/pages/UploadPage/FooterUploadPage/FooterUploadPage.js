import classNames from 'classnames/bind';
import { LogoIcon } from '~/component/Icons';
import styles from './FooterUploadPage.module.scss';
const cx = classNames.bind(styles);
const itemCompany = [
    { content: 'Company' },
    { title: 'About' },
    { title: 'TikTok Browse' },
    { title: 'Newsroom' },
    { title: 'Contact' },
    { title: 'Career' },
];

const itemPrograms = [
    { content: 'Programs' },
    { title: 'TikTok for Good' },
    { title: 'Advertise' },
    { title: 'Developes' },
    { title: 'TikTok Browse' },
    { title: 'TiTok Rewards' },
];
const itemSupport = [
    { content: 'Support' },
    { title: 'Safety Center' },
    { title: 'Safety Center' },
    { title: 'Creator Portal' },
    { title: 'Community Guidelines' },
    { title: 'Transparency' },
    { title: 'Accessibility' },
];
const itemLegal = [{ content: 'Legal' }, { title: 'Safety Center' }, { title: 'Privacy Policy' }];
function FooterUploadPage() {
    const items = [itemCompany, itemPrograms, itemSupport, itemLegal];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('footer-start')}>
                    <LogoIcon width={'80px'} height={'80px'} className={cx('logo')} />
                    {items.map((child, index) => (
                        <div className={cx('footer-list')} key={index}>
                            {child.map((item, i) => (
                                <div className={cx('footer-content')} key={i}>
                                    <h4 className={cx('footer-label')}>{item.content}</h4>
                                    <span className={cx('footer-item')}>{item.title}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={cx('footer-end')}>
                    <div className={cx('footer-lang')}>
                        <p>English</p>
                    </div>
                    <span className={cx('footer-copyright')}>© 2023 TikTok</span>
                </div>
            </div>
        </div>
    );
}

export default FooterUploadPage;
