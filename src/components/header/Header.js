import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import colors from '../../_colors'
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SideBar from '../sideBar/SideBar';

export default function Header() {

    const [value, setValue] = useState("");
    const [openMenu, setOpenMenu] = useState(false);

    const navigate = useNavigate();

    const keyPressHandler = e => {
        if (e.key === "Enter") {
            navigate(`/search/query=${value}`)
        }
    }

    return (
        <>
            <div
                className="lg:w-[80%] w-full h-[10vh] px-5 fixed lg:ml-[20%] top-0 flex items-center justify-center"
                style={{ zIndex: 9999, background: colors.blackColor }}
            >

                <Link to={`/search/query=${value}`}>
                    <SearchIcon sx={{ color: colors.lightGray }} />
                </Link>
                <input
                    type="text"
                    placeholder="Search music"
                    className="w-full bg-transparent pl-2 outline-none text-white"
                    onChange={e => setValue(e.target.value)}
                    onKeyPress={keyPressHandler}
                    value={value}
                />
                <button className="lg:hidden" onClick={() => setOpenMenu(prev => !prev)}>
                    {
                        openMenu ?
                            <CloseIcon sx={{ color: colors.lightGray }} />
                            :
                            <MenuIcon sx={{ color: colors.lightGray }} />
                    }
                </button>
            </div>
            <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </>
    )
}
