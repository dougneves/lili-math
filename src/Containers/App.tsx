import React, { useState } from 'react';
import './App.css';

import IUserState, { InitialUserState } from '../Types/IUserState';

import Question from '../Components/Question';
import SelectUser from '../Components/SelectUser';
import Users from '../Models/Users';

function App() {
    const [currentUserState, setCurrentUserState] = useState<IUserState>({
        ...InitialUserState,
    });

    const setUser = (user: IUserState) => {
        console.log({ user, currentUserState });
        Users.setUser(user);
        setCurrentUserState(user);
    };

    console.log({ currentUserState });

    return (
        <div className='App'>
            <h1>Lili Math</h1>
            {currentUserState.userName ? (
                <Question userState={currentUserState} setUser={setUser} />
            ) : (
                <SelectUser setUser={setUser} />
            )}
        </div>
    );
}

export default App;
