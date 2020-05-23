export default interface IUserState {
    userName: string;
    rightCounts: Array<number>;
    wrongCounts: Array<number>;
    deltaTimes: Array<number>;
    level: number;
    totalCount: number;
}

export const InitialUserState: IUserState = {
    userName: '',
    rightCounts: [],
    wrongCounts: [],
    deltaTimes: [],
    level: 1,
    totalCount: 0,
};
