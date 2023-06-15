import React from "react";
import "./Dashboard.module.css";

const Dashboard = () => {
    const users = 150;
    const orders = 65;
    const revenue = "1.500";

    return (
        <div className="container">
            <h1>DashBoard</h1>
            <div className="card">
                <h2 className="title">Alunos Cadastrados</h2>
                <p className="data">{users}</p>
                <button className="button">Ver Detalhes</button>
            </div>
            <div className="card">
                <h2 className="title">Avaliaçoes Realizadas</h2>
                <p className="data">{orders}</p>
                <button className="button">Ver Detalhes</button>
            </div>
            <div className="card">
                <h2 className="title">Questoes Cadastradas</h2>
                <p className="data">{revenue}</p>
                <button className="button">Ver Detalhes</button>
            </div>
        </div>
    );
};

export default Dashboard;
