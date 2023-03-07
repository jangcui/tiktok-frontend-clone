import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import Button from '~/component/Button';
import { CloseIcon, SwitchIcon, TagIcon } from '~/component/Icons';
import styles from './PostComment.module.scss';
import ConFirmContext from '~/component/Contexts/ConFirmContext';

const cx = classNames.bind(styles);

function PostComment({ onPatchComment, onPostComment, valueCmt, setValueCmt, isEditComment, setIsEditComment }) {
    const [activeInput, setActiveInput] = useState(false);
    const { handleConfirm } = ConFirmContext();

    const inputRef = useRef();

    const handleActiveInput = () => {
        setActiveInput(true);
        inputRef.current.focus();
    };
    const handleBtnPost = () => {
        setValueCmt('');
        setIsEditComment(false);
        inputRef.current.focus();
    };

    const handleClearValue = () => {
        setValueCmt('');
        setIsEditComment(false);
    };

    const handleAddCharacter = () => {
        setValueCmt((prev) => prev + '@');
    };

    const handleValueInput = (e) => {
        setValueCmt(e);
    };

    const handlePatchApi = () => {
        setValueCmt('');
        setActiveInput(false);
        onPatchComment();
    };

    const handlePostApi = () => {
        setActiveInput(false);
        inputRef.current.focus();
        onPostComment();
    };

    return (
        <>
            <div className={cx('wrap-input')}>
                <div className={cx('input', activeInput && 'active-input')} onClick={handleActiveInput}>
                    <span className={cx('wrap-icon')}>
                        {valueCmt && (
                            <span onClick={handleClearValue}>
                                <CloseIcon className={cx('close-icon')} width={'16px'} height={'16px'} />
                            </span>
                        )}
                        <span onClick={handleAddCharacter}>
                            <TagIcon width={'20px'} height={'20px'} />
                        </span>
                    </span>
                    <input
                        name="comment"
                        ref={inputRef}
                        type="text"
                        defaultValue={valueCmt}
                        placeholder="Create comment..."
                        onChange={(e) => handleValueInput(e.target.value)}
                    />
                </div>
            </div>
            {isEditComment ? (
                <div className={cx('btn')}>
                    <Tippy content="Post" placement="top" delay={[200, 200]}>
                        <span className={cx('btn-switch')} onClick={handleBtnPost}>
                            <SwitchIcon width={'20px'} height={'20px'} />
                        </span>
                    </Tippy>
                    <Button
                        outline
                        disable={valueCmt === ''}
                        className={cx('btn-patch')}
                        onClick={() =>
                            handleConfirm({
                                title: 'This comment will be changed ?',
                                status: 'Agree',
                                onConfirm: handlePatchApi,
                            })
                        }
                    >
                        Patch
                    </Button>
                </div>
            ) : (
                <Button text disable={valueCmt === ''} className={cx('btn-post')} onClick={handlePostApi}>
                    Post
                </Button>
            )}
        </>
    );
}
PostComment.prototype = {
    onPatchComment: PropTypes.func.isRequired,
    onPostComment: PropTypes.func.isRequired,
    setValueCmt: PropTypes.func.isRequired,
    setIsEditComment: PropTypes.func.isRequired,
    valueCmt: PropTypes.string.isRequired,
    isEditComment: PropTypes.bool.isRequired,
};
export default PostComment;
