import { useContext } from 'react';
import { ModalAuthContext } from '~/store/Contexts';

function useModalAuthContext() {
    const modal = useContext(ModalAuthContext);
    return modal;
}

export default useModalAuthContext;
