
import {Link } from "react-router-dom"

export default function AdminView() {
    return (
            <div>
                <nav>
                <div className="admin-img"> <img src="" alt="admin image" /></div>
                    <div><Link to="/adminmain" className="nav_btn">Main Page</Link></div>
                    <div><Link to="/adminedittasks" className="nav-btn">Tasks</Link></div>
                </nav>
            </div>
    )
}