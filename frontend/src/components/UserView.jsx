import ButtonLink from "./Buttonlink"
import { Link } from "react-router-dom"

export default function UserView() {
    return <>
    <nav className="user-nav">
        {/* <h1 id="user-title"> User View</h1> */}
        <div><h2>User View</h2></div>
        <div><Link className={'user-btn'} to="/">Leave</Link></div>
    </nav>
    <div className="user-choices">
        <ButtonLink to="/engfinn">English to Finnish Assignment</ButtonLink>
        <ButtonLink to="/finneng"> Finnish to English Assignment</ButtonLink>
    </div>
    </>
}
