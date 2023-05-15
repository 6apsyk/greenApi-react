import cn from "classnames";
import cls from "./Chat.module.scss";
import {Avatar} from "../Avatar/Avatar";
import {useParams} from "react-router-dom";
import {format} from "date-fns";

export const Chat = props => {
    // eslint-disable-next-line react/prop-types
    const {messages = []} = props;

    const {contactId} = useParams();

    return (
        <div className={cn(cls.Chat, {})}>
            <div className={cls.header}>
                <Avatar
                    src={
                        "https://avatars.mds.yandex.net/get-games/1892995/2a000001854f363a34d9570c7326081d0254/pjpg250x140"
                    }
                />
                <span>{contactId}</span>
            </div>
            <div className={cls.msgList}>
                {messages.map(m => {
                    const textMessage =
                        m.typeWebhook === "incomingMessageReceived"
                            ? m.messageData?.textMessageData?.textMessage
                            : m.messageData?.extendedTextMessageData?.text;
                    return (
                        <div
                            key={m.idMessage}
                            className={cls.msg}
                            style={{
                                justifyContent:
                                    m.typeWebhook === "incomingMessageReceived"
                                        ? "flex-start"
                                        : "flex-end",
                            }}
                        >
                            <div
                                className={cls.text}
                                style={{
                                    background:
                                        m.typeWebhook === "incomingMessageReceived"
                                            ? "white"
                                            : "#9fe59f",
                                }}
                            >
                                <span>{textMessage}</span>
                                <span style={{marginLeft: 10, fontSize: 10}}>
                                    {format(new Date(m.timestamp * 1000), "HH:mm:ss")}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
