import React, { useState } from 'react';
import './SelectUser.css';

import User from '../Models/Users';
import IUserState, { InitialUserState } from '../Types/IUserState';

interface ISelectUserProps {
    setUser: (userState: IUserState) => void;
}

const SelectUser = (props: ISelectUserProps) => {
    const users: Array<IUserState> = User.getUsers();
    const [selectedUser, setSelectedUser] = useState('');

    const haveUsers = users.length > 0;

    const handleUserSelected = (currentUser: string) => {
        if (!currentUser) {
            return;
        }
        const user = User.getUser(currentUser);
        if (user) {
            return props.setUser(user);
        }

        const newUser = { ...InitialUserState };
        newUser.userName = currentUser;
        props.setUser(newUser);
    };

    const handleUserChanged = (value: string) => {
        setSelectedUser(value);
    };

    return (
        <div className='select-user'>
            {haveUsers && (
                <div>
                    <h2>Escolha um perfil já existente: </h2>

                    {users.map((user) => {
                        return (
                            <div key={user.userName}>
                                <button
                                    onClick={() =>
                                        handleUserSelected(user.userName)
                                    }
                                >
                                    {user.userName}
                                </button>
                            </div>
                        );
                    })}
                    <h2>ou</h2>
                </div>
            )}
            <div>
                <h2>Crie um novo usuário</h2>
                <label htmlFor='newUserInput'>Nome:</label>
                <input
                    type='text'
                    id='newUserInput'
                    value={selectedUser}
                    onChange={(event) => handleUserChanged(event.target.value)}
                />
                <button onClick={() => handleUserSelected(selectedUser)}>
                    Criar!
                </button>
            </div>
        </div>
    );
};

export default SelectUser;
