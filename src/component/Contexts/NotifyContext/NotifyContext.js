import { useContext } from 'react';
import { AlertContext } from '~/store/Contexts';

function NotifyContext() {
    const alert = useContext(AlertContext);
    return alert;
}

export default NotifyContext;
