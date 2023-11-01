"use client";

import {
  useState,
  useContext,
  createContext,
  cloneElement,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

import useOutsideClick from "../../hooks/useOutsideClick";

type ModalContextType = {
  open: string;
  openModal: (name: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext({} as ModalContextType);

function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState("");

  function openModal(name: string) {
    setOpen(name);
  }

  function closeModal() {
    setOpen("");
  }
  return (
    <ModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalButton({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children as ReactElement, {
    onClick: () => openModal(name),
  });
}

function ModalDisplay({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const { open, closeModal } = useContext(ModalContext);
  const ref = useOutsideClick(closeModal);

  if (open !== name) return;

  return createPortal(
    <div className="fixed w-screen h-screen top-0 left-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm transition-all duration-200 z-40">
      <div
        ref={ref}
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-50 px-14 py-12 rounded-xl transition-all duration-200"
      >
        <div
          onClick={closeModal}
          className="absolute top-3 right-3 cursor-pointer"
        >
          <RxCross2 size={30} className="text-gray-700" />
        </div>
        {cloneElement(children as ReactElement, { onClose: closeModal })}
      </div>
    </div>,
    document.body
  );
}

export { ModalButton, ModalDisplay };
export default Modal;
