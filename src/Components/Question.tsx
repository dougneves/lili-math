import React, { useState, useEffect } from 'react';
import './Question.css';

import IUserState from '../Types/IUserState';

interface IQuestionProps {
    userState: IUserState,
    setUser: (user: IUserState) => void
}

const POSSIBLE_ANSWERS = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
];

const getRandomArbitrary = (min: number, max: number): number => {
    const rand = Math.floor(Math.random() * (max - min) + min);
    return rand;
};

const generateQuestion = (user: IUserState): Array<number> => {
    const answer = getRandomArbitrary(2, Math.min(18, user.level + 4));
    const n1 = getRandomArbitrary(1, answer);
    const n2 = answer - n1;
    return user.level + 3 > 14 ? [n1, n2] : n1 > n2 ? [n1, n2] : [n2, n1];
};

const Question = (props: IQuestionProps) => {
    const user = props.userState;
    const totalCount = user.totalCount;

    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [response, setResponse] = useState('');
    const [isLastResponseRight, setIsLastResponseRight] = useState(false);

    const handleResponse = (r: number) => {
        const isRight = r === n1 + n2;

        if (isRight) {
            setResponse(`CERTO! ${n1} + ${n2} = ${n1 + n2}`);
            setIsLastResponseRight(true);
            user.rightCounts[n1] = Number.isInteger(user.rightCounts[n1]) ? user.rightCounts[n1] + 1 : 1;
            user.rightCounts[n2] = Number.isInteger(user.rightCounts[n2]) ? user.rightCounts[n2] + 1 : 1;
            user.totalCount++;
        } else {
            setResponse(`Não... ${n1} + ${n2} = ${n1 + n2}`);
            setIsLastResponseRight(false);
            user.wrongCounts[n1] = Number.isInteger(user.rightCounts[n1]) ? user.rightCounts[n1] + 1 : 1;
            user.wrongCounts[n2] = Number.isInteger(user.wrongCounts[n2]) ? user.wrongCounts[n2] + 1 : 1;
            user.totalCount++;
        }
        props.setUser(user);

        setTimeout(() => {
            setResponse('');
            if (user.totalCount > Math.pow(user.level, 3)) {
                user.level++;
                props.setUser(user);
            }
        }, 3000);
    };

    useEffect(() => {
        const [n1, n2] = generateQuestion(user);
        setN1(n1);
        setN2(n2);
    }, [user, totalCount]);

    const responseClasse = isLastResponseRight
        ? 'question__answer--right'
        : 'question__answer--wrong';

    return (
        <div className='question'>
            <h2>{user.userName}, tu já estás no nível {user.level}</h2>
            {response ? (
                <div className='question__answer'>
                    <div className={responseClasse}>{response}</div>
                </div>
            ) : (
                    <div>
                        <div className='question__text'>
                            <span>{n1}</span> + <span>{n2}</span> = ?
                    </div>
                        <div className='question__btn-group'>
                            {POSSIBLE_ANSWERS.map((n) => {
                                return (
                                    <button
                                        onClick={() => handleResponse(n)}
                                        key={n}
                                    >
                                        {n}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Question;
