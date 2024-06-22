'use client';

import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Component({ show, onClose, handleYes, Message }) {
  return (
    <>
      <Modal
        show={show} // Use show prop to control visibility
        size="md"
        onClose={onClose} // Use onClose prop for closing the modal
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {Message}
            </h3>

            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleYes}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={onClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Component;
