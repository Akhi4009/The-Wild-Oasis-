import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiLogout } from "react-icons/hi"
import { useLogout } from "./useLogout";
function Logout() {
    const {logout, isLoading} = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
    {!isLoading ? <HiLogout/> : <SpinnerMini/>}
    </ButtonIcon>
  )
}

export default Logout