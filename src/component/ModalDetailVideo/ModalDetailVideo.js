import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useLocation } from 'react-router-dom';
import CommentDetail from './CommentDetail';
import styles from './ModalDetailVideo.module.scss';
import VideoDetail from './VideoDetail';

const cx = classNames.bind(styles);

const portal = document.getElementById('modal-detail-video');

function ModalDetailVideo({ dataVideo, dataList, isOpen, onClose, index, setIndex }) {
    const [data, setData] = useState(dataVideo);
    const location = useLocation();
    const pathName = location.pathname;
    useEffect(() => {
        if (isOpen && data) {
            window.history.pushState({}, '', `/video/${data.uuid}`);
            document.body.classList.add('hidden1');
        } else {
            document.body.classList.remove('hidden1');
        }
    }, [isOpen, data, pathName]);
    const handleNext = () => {
        setIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        setIndex((prev) => prev - 1);
    };
    const handleClose = () => {
        window.history.pushState({}, '', pathName);
        onClose();
    };
    useEffect(() => {
        dataList && setData(dataList[index]);
    }, [dataList, index]);

    if (!isOpen) {
        return null;
    }

    return ReactDom.createPortal(
        <div className={cx('wrapper')}>
            {data && (
                <div className={cx('container')}>
                    <VideoDetail
                        data={data}
                        index={index}
                        dataList={dataList}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        handleClose={handleClose}
                    />
                    <div className={cx('comments')}>
                        <CommentDetail data={data} />
                    </div>
                </div>
            )}
        </div>,
        portal,
    );
}
ModalDetailVideo.prototype = {
    dataList: PropTypes.array.isRequired,
    dataVideo: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    index: PropTypes.number,
    setIndex: PropTypes.func,
};
// dataVideo, dataList, isOpen, onClose, index, setIndex
export default ModalDetailVideo;
