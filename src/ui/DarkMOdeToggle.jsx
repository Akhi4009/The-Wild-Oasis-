import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi"
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
function DarkMOdeToggle() {

  const {isDarkMode, toggleDarkMode} = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
    {isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon/>}
    </ButtonIcon>

  )
}

export default DarkMOdeToggle