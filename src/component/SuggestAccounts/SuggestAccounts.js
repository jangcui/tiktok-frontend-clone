import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestAccounts.module.scss';
import AccountPreview from './AccountPreview';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function SuggestAccounts({ label, data }) {
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [dataArr, setDataArr] = useState(data);

    useEffect(() => {
        !isSeeAll ? setDataArr(data.slice(0, 5)) : setDataArr(data);
    }, [data, isSeeAll]);
    return (
        <>
            <div className={cx('wrapper')}>
                <p className={cx('label')}>{label}</p>
                {dataArr.map((account, index) => (
                    <AccountPreview data={account} key={index} />
                ))}
            </div>
            {data.length > 5 && (
                <p className={cx('more-btn')} onClick={() => setIsSeeAll(!isSeeAll)}>
                    {!isSeeAll ? ' See all' : 'See less'}
                </p>
            )}
        </>
    );
}
SuggestAccounts.prototype = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};
export default SuggestAccounts;
