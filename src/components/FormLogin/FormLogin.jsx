import cn from "classnames";
import cls from "./FormLogin.module.scss";
import {useState} from "react";
import {greenApi} from "../../api";

// eslint-disable-next-line react/prop-types
export const FormLogin = ({className, onClose}) => {
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");
    const [error, setError] = useState(null);

    const onLogin = () => {
        greenApi
            .login(idInstance, apiTokenInstance)
            .then(data => {
                if (data.stateInstance === "authorized") {
                    setError("success");
                    localStorage.setItem("config", JSON.stringify({idInstance, apiTokenInstance}));
                    setTimeout(() => onClose(), 1500);
                }
            })
            .catch(() => setError("error"));
    };

    return (
        <div className={cn(cls.FormLogin, {}, [className])}>
            {error === "success" && <div style={{color: "green"}}>{"Успешная авторизация!"}</div>}
            {error === "error" && <div style={{color: "red"}}>{"Ошибка авторизации!"}</div>}

            <h1>Войдите в аккаунт</h1>
            <input
                className={cls.input}
                placeholder="Веедите idInstance"
                value={idInstance}
                onChange={e => setIdInstance(e.target.value)}
            />
            <input
                className={cls.input}
                placeholder="Веедите apiTokenInstance"
                value={apiTokenInstance}
                onChange={e => setApiTokenInstance(e.target.value)}
            />
            <button style={{marginTop: 20}} onClick={onLogin}>
                Войти
            </button>
        </div>
    );
};
