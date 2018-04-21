import { UserInfo } from '../external';

export interface UserData {
    tags: string[];
    info: UserInfo;
}

const activeItems = new Map<string, Map<number, UserData>>();

export function listActive(token: string) {
    const entry = activeItems.get(token);
    if (!entry) return [];
    else return Array.from(entry);
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
