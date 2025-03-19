const Modal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors 
        ${open ? "bg-black/50 z-[9999] visible" : "hidden"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 z-[10000]
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
