import { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

import Modal from '../components/Modal.tsx';
import { RegistrationForm } from '../components/RegistrationForm.tsx';
import { PageProps } from '../interfaces/page.interface.ts';

export interface IPageProps {
  showPageName?: (name: string) => void;
}

const RegPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Registration';
  const [modal, setModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    showName && showName(name);
  }, []);

  function handleModal(content: string) {
    setModal(true);
    setContent(content);
  }

  return (
    <div className="reg-container">
      <h1>Registration</h1>
      <RegistrationForm openModal={handleModal}></RegistrationForm>
      <Modal visible={modal} setDisplay={setModal}>
        {content && content}
      </Modal>
    </div>
  );
};

export default RegPage;
