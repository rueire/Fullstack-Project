import { Link } from "react-router-dom";

export default function ButtonLink({ to, id, children }) {
    return <Link to={to}>  {/*Link that navigates to the specified 'to' prop*/}
        <button id={id}>{children}</button>
        </Link>;
}