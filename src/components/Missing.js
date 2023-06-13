import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px", backgroundColor: "red"}}>
            <h1>Oops!</h1>
            <p>404 Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Pagina ainda em construção, voltar ao Home!</Link>
            </div>
        </article>
    )
}

export default Missing
