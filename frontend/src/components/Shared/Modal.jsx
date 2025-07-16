const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-lg">✖</button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
  export default Modal;
  