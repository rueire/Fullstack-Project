import { Link } from "react-router-dom";

export default function ButtonLink({ to, id, children }) {
    return <Link to={to}>
        <button id={id}>{children}</button>
        </Link>;
}