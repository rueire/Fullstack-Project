import ButtonLink from "./Buttonlink"

export default function UserView() {
    return <>
    <h1 id="user-title"> User View</h1>
    <div className="user-choices">
        <ButtonLink to="/engfinn">English to Finnish Assignment</ButtonLink>
        <ButtonLink to="/finneng"> Finnish to English</ButtonLink>
    </div>
    </>
}
