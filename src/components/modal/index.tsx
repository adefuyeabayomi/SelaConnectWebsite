import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./style.css";

interface DModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DModal: React.FC<DModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <dialog
          ref={dialogRef}
          className="custom-dialog"
          onClick={handleDialogClick}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
            {children}
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
};

export default DModal;
