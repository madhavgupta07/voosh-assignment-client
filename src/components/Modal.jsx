import React from 'react';

const Modal = ({ task, closeModal }) => {
    if (!task) return null;

    return (
        <div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow dark:bg-white">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-black dark:text-black">
                        Task Details
                    </h3>
                    <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 space-y-4">
                    <p className="text-base leading-relaxed text-black dark:text-black">
                        Description: {task.description}
                    </p>
                    <p className="text-base leading-relaxed text-black dark:text-black">
                        Created at: {new Date(task.createdAt).toLocaleString()}
                    </p>
                </div>
                <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={closeModal} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
