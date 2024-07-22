import useStore from '../zustand/authStore';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const { user, setLogin, setToken } = useStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        setLogin({ user: null, token: null });
        setToken({ token: null });
        navigate('/login');
        console.log("logout done")
    };

    return (
        <nav className="bg-blue-700 border-gray-200 dark:bg-blue-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{user.user.username}</span>

                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="bg-red-500 text-sm text-white hover:bg-red-600 focus:ring-red-500 focus:ring-offset-2 focus:ring-2 rounded-md px-4 py-2"
                        id="user-menu-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
};

export default Nav;
