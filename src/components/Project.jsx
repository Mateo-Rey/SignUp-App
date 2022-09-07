import { useAuth } from "../contexts/AuthContext"
export const Project = ( ) => {
    const {currentUser} = useAuth()
    console.log(currentUser.uid)
}