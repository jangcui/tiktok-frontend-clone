import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ContextUser, ContextVolume, AlertContext, ModalAuthContext, ConfirmContext } from './Contexts';

const user_login = JSON.parse(localStorage.getItem('USER_LOGIN')) || null;
function Providers({ children }) {
    const [isModalAuth, setIsModalAuth] = useState(false);
    const [volume, setVolume] = useState(localStorage.getItem('VOLUME') || 0);
    const [currentUser, setCurrentUser] = useState(user_login);
    const [notify, setNotify] = useState({
        title: '',
        isOpen: false,
    });

    const [confirm, setConfirm] = useState({
        title: '',
        isOpen: false,
        status: 'Delete',
        onConfirm: () => {},
    });
    useEffect(() => {
        if (!user_login) {
            setIsModalAuth(true);
        }
    }, []);
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

    const handleConfirm = ({ title, status, onConfirm }) => {
        confirm.title = title;
        confirm.status = status;
        confirm.isOpen = true;
        confirm.onConfirm = () => {
            onConfirm();
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
                        onConfirm: confirm.onConfirm,
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
                        <ContextUser.Provider value={{ currentUser, setCurrentUser }}>{children}</ContextUser.Provider>
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
