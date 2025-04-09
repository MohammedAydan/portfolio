import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./ClientApp";

export interface MessageFields {
    name?: string;
    email?: string;
    message?: string;
}

export const SendMessage = async ({ name, email, message }: MessageFields) => {
    try {
        const messageId = `msg-${new Date().getTime()}`;
        await setDoc(doc(db, "messages", messageId), {
            id: messageId,
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
            machine: navigator.userAgent ?? null,
        }, {
            merge: true
        });
    } catch (error) {
        throw new Error("Failed to send message");
    }
}

export const getAllMessage = async (): Promise<MessageFields[]> => {
    try {
        const messagesSnapshot = await getDocs(collection(db, "messages"));
        const messages: MessageFields[] = [];
        messagesSnapshot.forEach(doc => {
            messages.push(doc.data() as MessageFields);
        });
        return messages;
    } catch (error) {
        throw new Error("Failed to fetch messages");
    }
}