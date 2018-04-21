import fetch from 'node-fetch';

const requiredScopes = 'sms user cost';

export async function getToken(email: string, password: string): Promise<string> {
    const authReq = await fetch('https://my.tanda.co/api/oauth/token', {
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${email}&password=${password}&scope=${requiredScopes}&grant_type=password`
    });
    const responseBody = await authReq.json();

    if (responseBody.error) {
        throw new Error(responseBody.error_description);
    } else {
        return responseBody.access_token;
    }
}

export interface UserInfo {
    id: number;
    name: string;
    dob?: string;
    employmentStart: string;
    email: string;
    photo: string;
    phone: string;
    hourlyRate?: number;
    licenseNumber?: string;
}

function getUserInfo(user: any): UserInfo {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        dob: user.date_of_birth,
        employmentStart: user.employment_start_date,
        photo: user.photo,
        phone: user.normalised_phone,
        hourlyRate: user.hourly_rate,
        licenseNumber: user.qualifications ? user.qualifications.license_number : undefined
    };
}

export async function listAvailableUsers(accessToken: string): Promise<UserInfo[]> {
    const req = await fetch('https://my.tanda.co/api/v2/users?show_wages=true', {
        headers: {
            'Authorization': 'bearer ' + accessToken
        }
    });
    const responseBody = await req.json();

    if (responseBody.error) {
        throw new Error(responseBody.error_description);
    } else {
        return responseBody.map(getUserInfo);
    }
}

export async function getUser(accessToken: string, userId: number): Promise<UserInfo> {
    const req = await fetch(`https://my.tanda.co/api/v2/users/${userId}?show_wages=true`, {
        headers: {
            'Authorization': 'bearer ' + accessToken
        }
    });
    const responseBody = await req.json();

    if (responseBody.error) {
        throw new Error(responseBody.error_description);
    } else {
        return getUserInfo(responseBody);
    }
}

export async function sendSms(accessToken: string, userIds: number[], message: string): Promise<void> {
    const req = await fetch('https://my.tanda.co/api/v2/sms/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken
        },
        body: JSON.stringify({
            message,
            user_ids: userIds
        })
    });
    const responseBody = await req.json();

    if (responseBody.error) {
        throw new Error(responseBody.error_description);
    }
}
