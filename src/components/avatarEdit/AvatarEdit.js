import React, {useContext, useEffect, useState} from "react";
import {AvatarOptions} from "./AvatarOptions";
import AuthContext from "../../context/AuthProvider";
import Avatar from "avataaars";
import "./AvatarEdit.module.css";
import style from "../home/Home.module.css";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AvatarEdit = () => {
    const API_URL = "http://localhost:8080";
    const AVATAR_URL = "/api/v1/usuarios/atualizar-avatar";
    const [avatar, setAvatar] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {auth} = useContext(AuthContext);
    const { setAuth } = useAuth();
    const {usuario} = auth;
    const {accessToken} = auth;
    let user;

    useEffect(() => {

        user = usuario;
        const usuarioAvatar = usuario.avatar;

        setAvatar(usuarioAvatar);
        setIsLoading(false);
    }, []);
    const generateRandomAvatar = () => {
        const newAvatar = {};
        for (const option in AvatarOptions) {
            const options = AvatarOptions[option];
            const randomIndex = Math.floor(Math.random() * options.length);
            const selectedOption = options[randomIndex].value;
            newAvatar[option] = selectedOption;
        }

        setAvatar(newAvatar);
    };

    const updateAvatarProperty = (property, value) => {
        setAvatar((prevAvatar) => ({
            ...prevAvatar,
            [property]: value,
        }));
    };

    const saveAvatar = () => {
        auth.usuario.avatar = avatar;
        axios
            .post(
                `${API_URL}${AVATAR_URL}`,
                auth.usuario,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.accessToken}`,
                    },
                }
            )
            .then(response => {
                console.log(response);
                setAuth({ ...auth });
            })
            .catch((error) => {
                console.log(error.message);
            });

        console.log("Saved Avatar:", avatar);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className={style.fullScreen}>
            <Row style={{display: "flex", justifyContent: "center"}}>
                <h2>Personalize seu Avatar</h2>
            </Row>

            <div>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <Col md={6}>
                        <Avatar
                            className="avataaar"
                            avatarStyle="Circle"
                            topType={avatar.topType}
                            accessoriesType={avatar.accessoriesType}
                            hairColor={avatar.hairColor}
                            facialHairType={avatar.facialHairType}
                            clotheType={avatar.clotheType}
                            clotheColor={avatar.clotheColor}
                            eyeType={avatar.eyeType}
                            eyebrowType={avatar.eyebrowType}
                            mouthType={avatar.mouthType}
                            skinColor={avatar.skinColor}
                        />
                    </Col>
                    <Col md={6} style={{display: "flex", justifyContent: "center"}}>
                        <Row style={{display: "flex", justifyContent: "center"}}>
                            <Col md={6}>
                                {/* Rest of the options */}
                                <div>
                                    <h3> Tipo de camiseta </h3>
                                    <select
                                        value={avatar.clotheType}
                                        onChange={(event) =>
                                            updateAvatarProperty("clotheType", event.target.value)
                                        }
                                    >
                                        {AvatarOptions.clotheType.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Rest of the options */}
                                <div>
                                    <h3> Cor da camiseta </h3>
                                    <select
                                        value={avatar.clotheColor}
                                        onChange={(event) =>
                                            updateAvatarProperty("clotheColor", event.target.value)
                                        }
                                    >
                                        {AvatarOptions.clotheColor.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Rest of the options */}
                                <div>
                                    <h3> Estampa camiseta </h3>
                                    <select
                                        value={avatar.graphicType}
                                        onChange={(event) =>
                                            updateAvatarProperty("graphicType", event.target.value)
                                        }
                                    >
                                        {AvatarOptions.graphicType.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Rest of the options */}
                                <div>
                                    <h3> Olhar </h3>
                                    <select
                                        value={avatar.eyeType}
                                        onChange={(event) =>
                                            updateAvatarProperty("eyeType", event.target.value)
                                        }
                                    >
                                        {AvatarOptions.eyeType.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Rest of the options */}
                                <div>
                                    <h3> Sombrancelha </h3>
                                    <select
                                        value={avatar.eyebrowType}
                                        onChange={(event) =>
                                            updateAvatarProperty("eyebrowType", event.target.value)
                                        }
                                    >
                                        {AvatarOptions.eyebrowType.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Rest of the options */}
                                <div>
                                    <h3> Boca </h3>
                                    <select
                                        value={avatar.mouthType}
                                        onChange={(event) =>
                                            updateAvatarProperty("mouthType", event.target.value)
                                        }
                                    >
                                        {AvatarOptions.mouthType.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <Col md={6}>
                            <div>
                                <h3> Tom da pele </h3>
                                <select
                                    value={avatar.topType}
                                    onChange={(event) =>
                                        updateAvatarProperty("skinColor", event.target.value)
                                    }
                                >
                                    {AvatarOptions.skinColor.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Rest of the options */}
                            <div>
                                <h3> Cabelo e acessórios </h3>
                                <select
                                    value={avatar.topType}
                                    onChange={(event) =>
                                        updateAvatarProperty("topType", event.target.value)
                                    }
                                >
                                    {AvatarOptions.topType.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Rest of the options */}
                            <div>
                                <h3> Óculos </h3>
                                <select
                                    value={avatar.accessoriesType}
                                    onChange={(event) =>
                                        updateAvatarProperty("accessoriesType", event.target.value)
                                    }
                                >
                                    {AvatarOptions.accessoriesType.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Rest of the options */}
                            <div>
                                <h3> Cor do chapéu </h3>
                                <select
                                    value={avatar.hatColor}
                                    onChange={(event) =>
                                        updateAvatarProperty("hatColor", event.target.value)
                                    }
                                >
                                    {AvatarOptions.hatColor.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Rest of the options */}
                            <div>
                                <h3> Tipo de barba </h3>
                                <select
                                    value={avatar.facialHairType}
                                    onChange={(event) =>
                                        updateAvatarProperty("facialHairType", event.target.value)
                                    }
                                >
                                    {AvatarOptions.facialHairType.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Rest of the options */}
                            <div>
                                <h3> Cor da barba </h3>
                                <select
                                    value={avatar.facialHairColor}
                                    onChange={(event) =>
                                        updateAvatarProperty("facialHairColor", event.target.value)
                                    }
                                >
                                    {AvatarOptions.facialHairColor.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Col>
                    </Col>
                </Row>


            </div>
            <Row style={{display: "flex", justifyContent: "center"}}>
                <button onClick={generateRandomAvatar}>Gerar aleatório</button>
                <button onClick={saveAvatar}>Salvar</button>
            </Row>

        </div>
        </>
    );
};

export default AvatarEdit;
