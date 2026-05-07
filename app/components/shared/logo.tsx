import { Package } from "lucide-react";
import { Link } from "react-router";

function Logo() {
    return (
        <Link to="/" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-foreground" />
            <div className="text-xl font-bold text-foreground">Boulisa</div>
        </Link>
    );
}

export default Logo;