import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { client } from '../api/BuildClientAdmin.tsx';
import { PageProps } from '../interfaces/page.interface.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { Address, UserResponse } from '../interfaces/user.interface.ts';

const UserPage = ({ showName }: PageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const getApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: 'jsfe2023q1',
  });

  useEffect((): void => {
    showName && showName('Страница пользователя');
  }, []);

  const [user, setUser] = useState<UserResponse>({
    id: '',
    email: '',
    addresses: [],
    isEmailVerified: false,
    shippingAddressIds: [],
    version: 0,
    createdAt: '',
  });

  const { id, email } = useSelector((state: RootState) => state.auth);

  const getUser = async () => {
    setLoading(true);
    const { body, statusCode } = await getApiRoot.customers().withId({ ID: id }).get().execute();
    console.log(statusCode);
    console.log(body);

    const userEntity: UserResponse = {
      id: body.id,
      email: body.email,
      addresses: body.addresses,
      isEmailVerified: body.isEmailVerified,
      shippingAddressIds: body.shippingAddressIds,
      version: body.version,
      createdAt: body.createdAt,
    };
    setUser(userEntity);
    setLoading(false);
  };

  useEffect(() => {
    const data = async () => {
      await getUser();
    };
    data();
  }, []);

  const prepareDate = (timeplate: string) => {
    const date = new Date(timeplate);
    return (
      date.getFullYear() +
      ' ' +
      date.getMonth() +
      ' ' +
      date.getDay() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    );
  };

  const printShippingAddresses = (address: Address, index: number) => {
    const { id, ...addressWithoutId } = address;
    return (
      <div key={`group + ${id}`}>
        <div style={{ textAlign: 'center' }}>Address {index + 1}</div>
        <div style={{ textAlign: 'center' }}>
          {id && user.shippingAddressIds?.includes(id) && 'Адрес по умолчанию!'}
        </div>
        {Object.entries(addressWithoutId).map(([key, field]) => (
          <div className="profile-row" key={`row + ${key}`}>
            <div className="profile-row-name">{key}</div>
            <div className="profile-row-value">{field}</div>
          </div>
        ))}
      </div>
    );
  };

  console.log(user);
  return (
    <div className={loading ? 'user-container loading' : 'user-container'}>
      {loading && <span className="loader"></span>}
      <div className="user-info">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-created">Дата создания: {prepareDate(user.createdAt)}</div>
            <div className="profile-modified">
              Дата последнего обновления: {user.versionModifiedAt && user.versionModifiedAt}
            </div>
          </div>
          <div className="profile-tools">
            <div className="profil-edit" onClick={() => {}}>
              Редактировать
            </div>
          </div>
        </div>
        {!user.isEmailVerified && (
          <div className="profile-row profile-row-note">Email: {user.email} не верифицирован </div>
        )}
        <div className="profile-group">
          <div className="profile-group-title">Общая информация</div>
          <div className="profile-row">
            <div className="profile-row-name">Email:</div>
            <div className="profile-row-value">{email}</div>
          </div>
          <div className="profile-row">
            <div className="profile-row-name">ID:</div>
            <div className="profile-row-value">{id}</div>
          </div>
        </div>
        <div className="profile-group">
          <div className="profile-group-title">Shipping address</div>
          {user.addresses.map(printShippingAddresses)}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
