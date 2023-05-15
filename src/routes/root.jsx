import {useEffect, useState} from "react";
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import Modal from "../components/Modal/Modal";
import {FormLogin} from "../components/FormLogin/FormLogin";
import {Avatar} from "../components/Avatar/Avatar";

export default function Root() {
    const navigate = useNavigate();
    const {contactId} = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [number, setNumber] = useState("");
    const [phones, setPhones] = useState([]);

    const onSubmit = e => {
        e.stopPropagation();
        e.preventDefault();
        if (number.length === 11 && number[0] === "7" && !phones.includes(number)) {
            setPhones(prev => prev.concat(number));
            setNumber("");
        }
    };

    const closeModal = () => {
        navigate("/");
        setOpenModal(false);
    };

    const onExit = () => {
        localStorage.clear("config");
        setOpenModal(true);
    };

    const onDeleteChat = chat => {
        setPhones(prev => prev.filter(p => p !== chat));
    };

    const getStatusAuth = () => {
        const config = localStorage.getItem("config");
        if (!config) setOpenModal(true);
    };

    useEffect(() => {
        navigate("/");
        getStatusAuth();
    }, [navigate]);

    return (
        <>
            {openModal && (
                <Modal isOpen={openModal}>
                    <FormLogin onClose={closeModal} />
                </Modal>
            )}
            <div id="sidebar">
                <div>
                    <Avatar
                        src={
                            "https://avatars.mds.yandex.net/get-games/1892995/2a000001854f363a34d9570c7326081d0254/pjpg250x140"
                        }
                    />
                    <span>{JSON.parse(localStorage.getItem("config"))?.idInstance}</span>
                    <button style={{marginLeft: "auto"}} onClick={onExit}>
                        Выйти
                    </button>
                </div>
                <div>
                    <div>
                        <input
                            type="tel"
                            pattern="[7]{1}[0-9]{10}"
                            minLength="11"
                            maxLength="11"
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                            placeholder="79035678911"
                        />
                    </div>
                    <div>
                        <button onClick={onSubmit}>Add</button>
                    </div>
                </div>
                <nav>
                    <ul>
                        {phones.map(ph => (
                            <li
                                className="phones"
                                style={{
                                    backgroundColor: contactId === ph && "#e4e2e2",
                                }}
                                key={ph}
                            >
                                <Link to={`contacts/${ph}`}>
                                    <Avatar
                                        src={
                                            "https://avatars.mds.yandex.net/get-games/1892995/2a000001854f363a34d9570c7326081d0254/pjpg250x140"
                                        }
                                    />
                                </Link>
                                <Link to={`contacts/${ph}`}>{ph}</Link>
                                <button
                                    style={{height: "fit-content"}}
                                    onClick={() => {
                                        onDeleteChat(ph);
                                        navigate("/");
                                    }}
                                >
                                    Удалить чат
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
