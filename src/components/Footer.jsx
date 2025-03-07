import { useContext } from "react"
import UserContext from "./UserContext"

function Footer() {
    const {todo} = useContext(UserContext)
    return (
        <div className="mt-3 w-full h-10 bg-black text-white rounded-xl">

{todo}
        </div>
    )
}
export default Footer