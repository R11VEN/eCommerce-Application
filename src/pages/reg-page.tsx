import { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

import Modal from '../components/Modal.tsx';
import { RegistrationForm } from '../components/registration-form.tsx';
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
  }, [showName]);

  function handleModal(content: string) {
    setModal(true);
    setContent(content);
  }

  return (
    <div className="reg-container">
      <h1>Registration</h1>
      <Modal visible={modal} setDisplay={setModal}>
        {content && content}
      </Modal>
      <RegistrationForm openModal={handleModal}></RegistrationForm>
    </div>
  );
};

export default RegPage;
