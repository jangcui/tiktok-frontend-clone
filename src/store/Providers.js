import PropTypes from 'prop-types';
import { useState } from 'react';
import { ContextUser, ContextVolume, AlertContext, ModalAuthContext, ConfirmContext } from './Contexts';

const user_login = JSON.parse(localStorage.getItem('USER_LOGIN')) || null;
function Providers({ children }) {
    const [volume, setVolume] = useState(localStorage.getItem('VOLUME') || 0);
    const [isModalAuth, setIsModalAuth] = useState(false);
    const [notify, setNotify] = useState({
        title: '',
        isOpen: false,
    });
    const [confirm, setConfirm] = useState({
        title: '',
        isOpen: false,
        status: 'Delete',
        onDelete: () => {},
    });

    const setAlert = (text, time) => {
        notify.title = text;
        notify.isOpen = true;
        const timeShow = setTimeout(() => {
            notify.isOpen = false;
            setNotify({ ...notify });
        }, time);
        setNotify({ ...notify });
        return () => {
            clearTimeout(timeShow);
        };
    };

    const handleClose = () => {
        confirm.isOpen = false;
        setConfirm({ ...confirm });
    };

    const handleConfirm = ({ title, status, onDelete }) => {
        confirm.title = title;
        confirm.status = status;
        confirm.isOpen = true;
        confirm.onDelete = () => {
            onDelete();
            handleClose();
        };
        setConfirm({ ...confirm });
    };

    return (
        <ContextVolume.Provider value={{ volume, setVolume }}>
            <AlertContext.Provider
                value={{
                    title: notify.title,
                    isAlert: notify.isOpen,
                    setAlert,
                }}
            >
                <ConfirmContext.Provider
                    value={{
                        title: confirm.title,
                        isConfirm: confirm.isOpen,
                        onDelete: confirm.onDelete,
                        status: confirm.status,
                        onClose: handleClose,
                        handleConfirm,
                    }}
                >
                    <ModalAuthContext.Provider
                        value={{
                            isModalAuth,
                            setIsModalAuth,
                        }}
                    >
                        <ContextUser.Provider value={user_login}>{children}</ContextUser.Provider>
                    </ModalAuthContext.Provider>
                </ConfirmContext.Provider>
            </AlertContext.Provider>
        </ContextVolume.Provider>
    );
}
Providers.prototype = {
    children: PropTypes.node,
};
export default Providers;
