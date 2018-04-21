import { sendSms, UserInfo } from '../external';
import * as insecurities from '../../shared/trained_model';

export interface UserData {
    tags: string[];
    gender: 'male' | 'female' | 'other';
    info: UserInfo;
}

const activeItems = new Map<string, Map<number, UserData>>();

export function listActive(token: string) {
    const entry = activeItems.get(token);
    if (!entry) return [];
    else return Array.from(entry.values());
}

export function getActive(token: string, userId: number) {
    const entry = activeItems.get(token);
    if (!entry) return;

    return entry.get(userId);
}

export function addActive(token: string, userId: number, data: UserData) {
    const maybeEntry = activeItems.get(token);

    let entry: Map<number, UserData>;
    if (!maybeEntry) {
        entry = new Map<number, UserData>();
        activeItems.set(token, entry);
    } else {
        entry = maybeEntry;
    }

    entry.set(userId, data);
}

export function removeActive(token: string, userId: number) {
    const entry = activeItems.get(token);
    if (!entry) return;

    entry.delete(userId);
    if (!entry.size) activeItems.delete(token);
}

export function doCron() {
    console.log('[CRON] Checking to send');
    activeItems.forEach((users, token) => {
        users.forEach((userData, userId) => {
            const pickedTag = userData.tags[Math.floor(Math.random() * userData.tags.length)];
            console.log('[SMS] Using tag ' + pickedTag + ' for user ' + userData.info.name + ' [out of ' + userData.tags + ']');
            const tagEntries = insecurities[pickedTag];

            let pickedItem: { gender: string, id: string, insult: string };
            do {
                pickedItem = tagEntries[Math.floor(Math.random() * tagEntries.length)];
            } while (userData.gender !== 'other' && pickedItem.gender !== userData.gender);

            // send the user an SMS message
            console.log('[SMS] Sending SMS with text: ');
            console.log('\t\t' + pickedItem.insult);
            // sendSms(token, [userId], pickedItem.insult + '\n\nWith Love,');
        });
    });
}
