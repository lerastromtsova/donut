import React, {useEffect, useState} from "react";
import API from "../utils/api";

export interface IUser {
    id: number;
    nickname: string;
    min_donation: string;
    account: string;
}

function ProfilePage() {
    const [user, setUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        API
            .get<IUser>("/donate/ivan55off")
            .then(response => {
                const {data} = response;
                setUser(data);
            })
            .catch(ex => {console.log(ex)});
    }, []);

    function changeProfile() {
        console.log('test');
    }

    console.log(user);

    return (<div>
                <h2 className="mb-4">Личный кабинет</h2>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Никнейм</td>
                            <td>
                                <input
                                    name="nickname"
                                    type="text" 
                                    value={user?.nickname} />
                            </td>
                        </tr>
                        <tr>
                            <td>Минимальная сумма доната</td>
                            <td>
                                <input 
                                    name="min_donation"
                                    value={user ? (user.min_donation) : ""} 
                                    step="0.01" />
                            </td>
                        </tr>
                        <tr>
                            <td>Счет</td>
                            <td>
                                <input 
                                    name="account"
                                    type="text" 
                                    value={user ? (user.account) : ''} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={changeProfile}>Сохранить изменения</button>
            </div>)
}

export default ProfilePage
