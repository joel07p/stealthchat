import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

export const useUser = () => {
    const [userData, setUserData] = useState<{username: string, userId: string}>({username: "", userId: ""});

    useEffect(() => {
        getBase();
    }, []);

    const getBase = async () => {
        const { data } = await axios.get('user/current/base');
        setUserData(data);
    }

    const userOwnsMessage = (usernameFromMessage: string): boolean => {
        return userData.username === usernameFromMessage;
    }

    return useMemo(() => ({
        userId: userData.userId,
        username: userData.username,
        userOwnsMessage
    }), [userData]);
}
