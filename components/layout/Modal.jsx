"use client";
import { CloseOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose, children, title = "Modal Title" }) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    setMounted(true);
    document.body.style.overflowY = "hidden";
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
      document.body.style.overflowY = "";
    };
  }, [onClose]);
  if (!mounted) return null;
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white sm:rounded-md max-w-lg w-full p-3 h-full sm:max-h-[70vh] overflow-x-hidden overflow-y-auto flex flex-col items-center relative"
      >
        <div className="flex items-center justify-between w-full my-2">
          <h1>{title}</h1>
          <button
            className="p-3 bg-black bg-opacity-20 rounded-full"
            onClick={onClose}
          >
            <CloseOutlined />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
