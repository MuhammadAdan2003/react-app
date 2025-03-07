import { useContext } from "react";
import UserContext from "./UserContext";

function Navbar() {
    const { user } = useContext(UserContext)
    return (
        <>
            <div className="text-white bg-black w-full h-10 rounded-xl mb-3">
                <div className="rounded-2xl w-fit px-4 h-10 bg-white text-black">
                    {user}
                </div>
            </div>

        </>
    )
}

export default Navbar;