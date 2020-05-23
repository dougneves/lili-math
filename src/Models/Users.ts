import IUserState from '../Types/IUserState';

const getUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

const getUser = (userName: string) => {
    const users = getUsers();
    return users.find((user:IUserState) => user.userName === userName);
}

const setUser = (user: IUserState) => {
    const users = getUsers();
    const newUsers = users.filter((storageUser:IUserState) => storageUser.userName !== user.userName);
    newUsers.push(user);
    localStorage.setItem('users', JSON.stringify(newUsers));
}

export default {
    getUsers, 
    getUser,
    setUser
}