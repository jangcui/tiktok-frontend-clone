import { useContext } from 'react';
import { ConfirmContext } from '~/store/Contexts';

function ConFirmContext() {
    const confirm = useContext(ConfirmContext);
    return confirm;
}

export default ConFirmContext;
