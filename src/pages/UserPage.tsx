import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CheckAuthorization, getUserById } from '../api/controllers/user.controller.ts';
import ProfileField from '../components/ProfileField.tsx';
import ProfileToolsBar from '../components/ProfileToolsBar.tsx';
import { API_CLIENT_ID } from '../constants/api.ts';
import { UserFormEnum } from '../constants/userForm.ts';
import { PageProps } from '../interfaces/page.interface.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { Address, UserResponse } from '../interfaces/user.interface.ts';
import { createDate } from '../utils.ts';
export type IEditState = {
  [key: string]: string | number | boolean;
};

const UserPage = ({ showName }: PageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<Partial<UserResponse>>({});

  const userProfile = useSelector((state: RootState) => state.userProfile);
  const auth = useSelector((state: RootState) => state.auth);
  const { id: userId } = useSelector((state: RootState) => state.auth);

  useEffect((): void => {
    showName && showName('Страница пользователя');
  }, []);

  const getUser = async () => {
    setLoading(true);
    const userEntity = await getUserById(userId);
    // console.log(user);
    setUser(userEntity);
    setLoading(false);
  };

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const token = auth.token;
      const { active, client_id } = await CheckAuthorization(token);
      if (active && client_id === API_CLIENT_ID) {
        await getUser();
      } else {
        setMessage('Вы не авторизованы');
      }
    };
    checkAuth();
  }, [auth.isAuth, userProfile.isChanged]);

  function printShippingAddresses(address: Address, index: number) {
    const { id: addressId, ...addressWithoutId } = address;
    return (
      <div key={index} id={`${addressId} - ${index}`}>
        <div style={{ textAlign: 'center' }} key={`title-${addressId}`}>
          Address {index + 1}
        </div>
        <div style={{ textAlign: 'center' }} key={`default-${addressId}`}>
          {addressId && user.shippingAddressIds?.includes(addressId) && 'Адрес по умолчанию!'}
        </div>
        {Object.entries(addressWithoutId).map(([key, field]: [key: string, field: string]) => (
          <Fragment key={key}>
            <ProfileField
              type="text"
              id={key}
              name={key}
              value={field}
              editable={userProfile.editMode}
            />
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className={loading ? 'user-container loading' : 'user-container'}>
      {loading && <span className="loader"></span>}
      {message ? (
        <div className="message">{message}</div>
      ) : (
        <div className="user-info">
          <div className="profile-header">
            <div className="profile-info">
              <div className="profile-created">
                Дата создания: {user.createdAt && createDate(user.createdAt)}
              </div>
              <div className="profile-modified">
                Дата последнего обновления: {user.versionModifiedAt && user.versionModifiedAt}
              </div>
            </div>
            <ProfileToolsBar setLoading={setLoading} />
          </div>
          {!user.isEmailVerified && (
            <div className="profile-row profile-row-note">
              Email: {user.email} не верифицирован{' '}
            </div>
          )}
          <div className="profile-group" key="sdfsf234234">
            <div className="profile-group-title">Общая информация</div>
            <div className="profile-group-body">
              <ProfileField
                type="text"
                id={UserFormEnum.FIRST_NAME}
                name="First name"
                value={user.firstName}
                editable={userProfile.editMode}
              />
              <ProfileField
                type="text"
                id={UserFormEnum.LAST_NAME}
                name="Last name"
                value={user.lastName}
                editable={userProfile.editMode}
              />
              <ProfileField
                type="text"
                id={UserFormEnum.EMAIL}
                name="Email"
                value={user.email}
                editable={userProfile.editMode}
              />
              <ProfileField
                type="date"
                id={UserFormEnum.DATE_OF_BIRTH}
                name="Date of birth"
                value={user.dateOfBirth}
                editable={userProfile.editMode}
              />
              <div className="profile-row" key="id">
                <div className="profile-row-name">ID:</div>
                <div className="profile-row-value">{userId}</div>
              </div>
            </div>
          </div>
          <div className="profile-group" key="shippingAddress">
            <div className="profile-group-title">Shipping address</div>
            <div className="profile-group-body" key="group-body123">
              {user.addresses?.map(printShippingAddresses)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
