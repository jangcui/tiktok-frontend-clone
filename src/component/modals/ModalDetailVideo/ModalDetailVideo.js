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
    const [lengthData, setLengthData] = useState();
    const pathName = useLocation().pathname;

    useEffect(() => {
        if (isOpen && data) {
            window.history.pushState({}, '', `/video/${data.uuid}`);
            document.body.classList.add('hidden1');
        } else {
            document.body.classList.remove('hidden1');
        }
    }, [isOpen, data, pathName]);

    useEffect(() => {
        if (dataList) {
            setData(dataList[index]);
            setLengthData(dataList.length - 1);
        }
    }, [dataList, index]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const keyCode = e.keyCode;
            switch (keyCode) {
                // key esc
                case 27:
                    handleClose();
                    break;
                // Space & down arrow
                case 32:
                case 40:
                    e.preventDefault();
                    handleNext();
                    break;
                // up arrow
                case 38:
                    e.preventDefault();
                    handlePrev();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [index, lengthData]);
    const handleNext = () => {
        if (index < lengthData) {
            setIndex(index + 1);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    const handleClose = () => {
        window.history.pushState({}, '', pathName);
        onClose();
    };
    if (!isOpen) {
        return null;
    }
    return ReactDom.createPortal(
        <div className={cx('wrapper')}>
            {data && (
                <div className={cx('container')}>
                    <div className={cx('video')}>
                        <VideoDetail
                            data={data}
                            index={index}
                            dataList={dataList}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handleClose={handleClose}
                        />
                    </div>
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
