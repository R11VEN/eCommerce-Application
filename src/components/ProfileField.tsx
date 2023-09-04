import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { IEditState } from '../pages/UserPage.tsx';
import { saveEditForm } from '../redux/userProfileSlice.ts';

export interface IProfileField {
  id: string;
  type: string;
  name: string;
  value?: string | number;
  editable?: boolean;
  editState?: IEditState;
  setEditState?: (id: string, value: string) => void;
}
const ProfileField = ({ id, type, name, value, editable }: IProfileField) => {
  const dispatch = useDispatch();
  // const { userEditForm } = useSelector((state: RootState) => state.userProfile);
  // const inputValue = (userEditForm && userEditForm[id] ? userEditForm[id] : value) as string;
  const inputEl = useRef<HTMLInputElement>(null);

  const editStateHandler = () => {
    if (inputEl.current && inputEl.current.value) {
      // console.log(inputEl.current && inputEl.current);
      dispatch(saveEditForm({ field: { [id]: inputEl.current.value } }));
    }
  };

  return (
    <div className="profile-row" key={id}>
      <div className="profile-row-name" key={`name-${id}`}>
        {name}:
      </div>
      <input
        type={type}
        className={editable ? 'profile-row-value editable' : 'profile-row-value'}
        onInput={editStateHandler}
        id={`value-${id}`}
        key={`value-${id}`}
        defaultValue={value}
        ref={inputEl}
        disabled={!editable}
      />
    </div>
  );
};

export default ProfileField;
