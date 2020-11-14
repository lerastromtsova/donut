import React, {useEffect, useState} from "react";
import API from "../utils/api";

export interface IUser {
    id: number;
    nickname: string;
    min_donation: string;
    account: boolean;
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

    console.log(user);

    return (<div>
        <h2 className="mb-4">Личный кабинет</h2>
        {user ? (user.nickname) : "Кажется, я вас не знаю"}
    </div>)
}

export default ProfilePage
