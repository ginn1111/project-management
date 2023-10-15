import { useState } from 'react';

const useModal = <T extends object>(initialValue?: T) => {
  const [modal, setModal] = useState<T>(initialValue ?? ({} as any));
  const handleOpenModal = (name: keyof T) =>
    setModal((old) => ({ ...old, [name]: { ...old[name], open: true } }));
  const handleCloseModal = (name: keyof T) =>
    setModal((old) => ({ ...old, [name]: { ...old[name], open: false } }));

  return { modal, handleCloseModal, handleOpenModal };
};

export default useModal;
