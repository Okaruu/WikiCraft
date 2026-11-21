import { Link } from "react-router-dom";

export default function AppLink ({ to, href, children, ...props}) {
    if(to){
        return <Link to={to} {...props}>{children}</Link>;
    }
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    );
}