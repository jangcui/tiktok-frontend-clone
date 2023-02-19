import PropTypes from 'prop-types';
import { useState } from 'react';
import { ContextUser, ContextVolume, AlertContext, ModalAuthContext } from './Contexts';

const user_login = JSON.parse(localStorage.getItem('USER_LOGIN')) || null;
function Providers({ children }) {
    const [volume, setVolume] = useState(localStorage.getItem('VOLUME') || 0);
    const [title, setTitle] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [isModalAuth, setIsModalAuth] = useState(false);

    const setAlert = (text, time) => {
        setTitle(text);
        setIsAlert(true);
        const timeShow = setTimeout(() => {
            setIsAlert(false);
        }, time);
        return () => {
            clearTimeout(timeShow);
        };
    };

    return (
        <ContextVolume.Provider value={{ volume, setVolume }}>
            <AlertContext.Provider
                value={{
                    title,
                    isAlert,
                    setAlert,
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
            </AlertContext.Provider>
        </ContextVolume.Provider>
    );
}
Providers.prototype = {
    children: PropTypes.node,
};
export default Providers;
