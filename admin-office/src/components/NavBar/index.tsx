import { mdiClose, mdiDotsVertical } from '@mdi/js';
import { ReactNode, useState } from 'react';
import { MenuNavBarItem } from '../../interfaces';
import Icon from '../Icon';
import NavBarItemPlain from './Item/Plain';
import NavBarMenuList from './MenuList';

type Props = {
    menu: MenuNavBarItem[];
    className: string;
    children: ReactNode;
};

export default function NavBar({ menu, className = '', children }: Props) {
    const [isMenuNavBarActive, setIsMenuNavBarActive] = useState(false);

    const handleMenuNavBarToggleClick = () => {
        setIsMenuNavBarActive(!isMenuNavBarActive);
    };

    return (
        <nav
            className={`${className} top-0 inset-x-0 fixed h-14 z-30 transition-position w-screen bg-[#F0E5F3] lg:w-auto dark:bg-slate-800`}
        >
            <div className={`flex lg:items-stretch px-4`}>
                <div className="flex flex-1 items-stretch h-14">{children}</div>
                <div className="flex-none items-stretch flex h-14 lg:hidden">
                    <NavBarItemPlain onClick={handleMenuNavBarToggleClick}>
                        <Icon path={isMenuNavBarActive ? mdiClose : mdiDotsVertical} size="24" />
                    </NavBarItemPlain>
                </div>
                <div
                    className={`${
                        isMenuNavBarActive ? 'block' : 'hidden'
                    } max-h-screen-menu overflow-y-auto lg:overflow-visible absolute w-screen top-14 left-0 bg-gray-50 shadow-lg lg:w-auto lg:flex lg:static lg:shadow-none dark:bg-slate-800`}
                >
                    <NavBarMenuList menu={menu} />
                </div>
            </div>
        </nav>
    );
}
