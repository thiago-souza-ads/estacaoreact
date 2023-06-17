import React, {useContext, useEffect, useState} from "react";
import {AvatarOptions} from "./AvatarOptions";
import AuthContext from "../../context/AuthProvider";
import Avatar from "avataaars";
import "./AvatarEdit.module.css";
import style from "../home/Home.module.css";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AvatarEdit = () => {
    const API_URL = "https://enadejava-1685497331322.azurewebsites.net";
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
                toast.success("Avatar salvo com sucesso!");
            })
            .catch((error) => {
                console.log(error.message);
                toast.error("Erro ao salvar o avatar.");
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
                <h2 style={{color : "black"}}>Personalize seu Avatar</h2>
            </Row>

            <div>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <Col md={12}>
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
                            hatColor={avatar.hatColor}
                            graphicType={avatar.graphicType}
                            facialHairColor={avatar.facialHairColor}
                            eyebrowType={avatar.eyebrowType}
                            mouthType={avatar.mouthType}
                            skinColor={avatar.skinColor}
                        />
                    </Col>
                </Row>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <Col md={6} style={{display: "flex", justifyContent: "center"}}>
                        <Row style={{display: "flex", justifyContent: "center"}}>
                            <Col style={{ justifyContent: "center", marginRight: "10px"}} md={6}>
                                {/* Rest of the options */}
                                 <div style={{ textAlign: "center", alignItems: "center"}}>
                                    <h5 style={{color : "black"}}> Tipo de camiseta </h5>
                                    <select style={{width: "100%", borderRadius:  "10px"}}
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
                                 <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                    <h5 style={{color : "black"}}> Cor da camiseta </h5>
                                    <select style={{width: "100%", borderRadius:  "10px"}}
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
                                 <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                    <h5 style={{color : "black"}}> Estampa camiseta </h5>
                                    <select style={{width: "100%", borderRadius:  "10px"}}
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
                                 <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                    <h5 style={{color : "black"}}> Olhar </h5>
                                    <select style={{width: "100%", borderRadius:  "10px"}}
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
                                 <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                    <h5 style={{color : "black"}}> Sombrancelha </h5>
                                    <select style={{width: "100%", borderRadius:  "10px"}}
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
                                 <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                    <h5 style={{color : "black"}}> Boca </h5>
                                    <select style={{width: "100%", borderRadius:  "10px"}}
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
                             <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                <h5 style={{color : "black"}}> Tom da pele </h5>
                                <select style={{width: "100%", borderRadius:  "10px"}}
                                    value={avatar.skinColor}
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
                             <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                <h5 style={{color : "black"}}> Cabelo e acessórios </h5>
                                <select style={{width: "100%", borderRadius:  "10px"}}
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
                             <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                <h5 style={{color : "black"}}> Cor do Cabelo </h5>
                                <select style={{width: "100%", borderRadius:  "10px"}}
                                        value={avatar.hairColor}
                                        onChange={(event) =>
                                            updateAvatarProperty("hairColor", event.target.value)
                                        }
                                >
                                    {AvatarOptions.hairColor.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Rest of the options */}
                             <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                <h5 style={{color : "black"}}> Óculos </h5>
                                <select style={{width: "100%", borderRadius:  "10px"}}
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
                            <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                <h5 style={{color : "black"}}> Cor do chapéu </h5>
                                <select style={{width: "100%", borderRadius:  "10px"}}
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
                             <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                <h5 style={{color : "black"}}> Tipo de barba </h5>
                                <select style={{width: "100%", borderRadius:  "10px"}}
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
                             <div style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                                <h5 style={{color : "black"}}> Cor da barba </h5>
                                <select style={{width: "100%", borderRadius:  "10px"}}
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
            <Row style={{display: "grid", justifyContent: "center"}}>
                <Col md={4}>
                    <button onClick={generateRandomAvatar} style={{ marginRight:"10px", color: "white", backgroundColor: "black", borderRadius: "10px"}}>Gerar aleatório</button>
                    <button onClick={saveAvatar} style={{ marginRight:"10px", color: "white", backgroundColor: "green", borderRadius: "10px"}}>Salvar</button>
                </Col>

            </Row>

        </div>
            <ToastContainer />
        </>
    );
};

export default AvatarEdit;
