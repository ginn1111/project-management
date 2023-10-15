import { useState } from 'react';

const useModal = <T extends object>(initialValue?: T) => {
  const [modal, setModal] = useState<T>(initialValue ?? ({} as any));
  const handleOpenModal = (name: keyof T, ...options: unknown[]) =>
    setModal((old) => ({
      ...old,
      [name]: { ...old[name], open: true, options },
    }));
  const handleCloseModal = (name: keyof T, ...options: unknown[]) =>
    setModal((old) => ({
      ...old,
      [name]: { ...old[name], open: false, options },
    }));

  return { modal, handleCloseModal, handleOpenModal };
};

export default useModal;
