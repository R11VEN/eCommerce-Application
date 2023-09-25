import { CustomerUpdateAction } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { Fragment, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useDispatch, useSelector } from 'react-redux';

import { userUpdate } from '../api/controllers/user.controller.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { setVersion } from '../redux/reducers/authSlice.ts';
import {
  changedSuccess,
  removeEditMode,
  resetEditForm,
  setEditMode,
} from '../redux/reducers/userProfileSlice.ts';
import { prepareActions } from '../utils.ts';
import Modal from './Modal.tsx';
import ChangePass from './Modals/ChangePass.tsx';

export interface IProfileToolsBar {
  setLoading?: (key: boolean) => void;
}
const ProfileToolsBar = ({ setLoading }: IProfileToolsBar) => {
  const [modal, setModal] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element>(<Fragment></Fragment>);
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const { id: userId, version: userVersion } = useSelector((state: RootState) => state.auth);

  const setEditModeHandler = () => {
    dispatch(setEditMode());
  };

  const saveProfileHandler = async () => {
    try {
      const data = Object.entries(userProfile.userEditForm);
      if (data.length < 1) {
        dispatch(removeEditMode());
        return;
      }
      setLoading && setLoading(true);
      const actions = prepareActions(data);
      const ClientResponse = await userUpdate(
        userId,
        userVersion,
        actions as CustomerUpdateAction[]
      );
      const { body } = ClientResponse;
      dispatch(setVersion({ version: body.version }));
      dispatch(changedSuccess());
      setLoading && setLoading(false);
    } catch (e) {
      throw new Error();
    }
  };

  const setEditPassHandler = () => {
    setContent(<ChangePass />);
    setModal(true);
  };

  const returnHandler = () => {
    dispatch(removeEditMode());
  };

  const resetHandler = () => {
    dispatch(resetEditForm());
  };

  return (
    <div className="profile-tools">
      {userProfile.editMode ? (
        <>
          <div className="btn-profile profile-return" onClick={returnHandler}>
            Отмена
          </div>
          <div className="btn-profile profile-reset" onClick={resetHandler}>
            Сбросить изменения
          </div>
          <div className="btn-profile profile-save" onClick={saveProfileHandler}>
            Сохранить
          </div>
        </>
      ) : (
        <>
          <div className="btn-profile profile-password" onClick={setEditPassHandler}>
            Изменить пароль
          </div>
          <div className="btn-profile profile-edit" onClick={setEditModeHandler}>
            Редактировать
          </div>
        </>
      )}
      <Modal visible={modal} setDisplay={setModal}>
        {content && content}
      </Modal>
    </div>
  );
};

export default ProfileToolsBar;
