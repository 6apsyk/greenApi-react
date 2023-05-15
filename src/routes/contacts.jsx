import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Chat} from "../components/Chat/Chat";

const idInstance = "1101819374"; // your instance id
const apiTokenInstance = "d844d8c5811a4bffacdfc6780b3b6912f5f51522c781459a96"; // your instance api token

// const msg = {
//     type: "incoming",
//     type: "outgoing",
// };

export default function Contact() {
    const {contactId} = useParams();

    const timerRef = useRef(null);

    const [text, setText] = useState("");

    const [idMessage, setIdMessage] = useState(null);

    const [messages, setMessages] = useState([]);
    console.log("messages", messages);

    console.log("idMessage", idMessage);

    const onSubmit = async () => {
        clearTimeout(timerRef.current);
        const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
        const {data} = await axios({
            url,
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                chatId: `${contactId}@c.us`,
                message: text,
            },
        });
        console.log(data);
        setIdMessage(data ? data.idMessage : null);
        setText("");
        onReload();
    };

    const onReload = async () => {
        const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;
        const {data} = await axios({
            url,
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Получение", data);

        if (data !== null) {
            const url2 = `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${data?.receiptId}`;
            const response2 = await axios({
                url: url2,
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {},
            });
            console.log("delete", response2);

            if (
                data.body.typeWebhook === "incomingMessageReceived" ||
                data.body.typeWebhook === "outgoingAPIMessageReceived"
            ) {
                setMessages(prev => prev.concat(data.body));
            }
            timerRef.current = setTimeout(() => onReload(), 2000);
        } else {
            timerRef.current = setTimeout(() => onReload(), 15000);
        }
    };

    const handleKeyPress = e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    useEffect(() => setMessages([]), [contactId]);

    useEffect(() => {
        return () => {
            setMessages([]);
            setIdMessage(null);
            clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
            <div style={{flex: 1}}>
                <Chat messages={messages} />
            </div>
            <div style={{height: 50, display: "flex", justifyContent: "space-between", gap: 20}}>
                <div style={{flex: 1}}>
                    <input
                        className="inputChat"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Введите сообщение"
                        onKeyUp={handleKeyPress}
                    />
                </div>
                <div style={{display: "flex", gap: 20}}>
                    <div>
                        <button onClick={onSubmit}>Отправить</button>
                    </div>
                    <div>
                        <button onClick={onReload}>Обновить</button>
                    </div>
                    {/* <div>
                        <button onClick={onHistory}>История чата</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}