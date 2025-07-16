import React from 'react';
import Magnifier from '../Magnifier/Magnifier.jsx'; // Adjust the import path as needed

const ImageModal = ({ imgs }) => {
    return (
        <div className='flex flex-col gap-10'>
            {imgs?.map((img, index) => (
                <div key={index}>
                    <button className="" onClick={() => document.getElementById(`my_modal_${index}`).showModal()}>
                        <img className='w-32 rounded-lg h-[192px] object-cover' src={img} alt="" />
                    </button>
                    <dialog id={`my_modal_${index}`} className="modal overflow-hidden">
                        <div className="modal-box flex flex-row w-1080px overflow-hidden magnifier-cursor">
                            <Magnifier src={img} zoom={2} />
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            ))}
        </div>
    );
};

export default ImageModal;
