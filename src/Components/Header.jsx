import React from 'react';
import { useState } from 'react';
import { HiHome, HiMagnifyingGlass, HiStar, HiPlayCircle, HiTv, HiPlus } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import logo from './../assets/Images/Logo2.png';
import HeaderItem from './HeaderItem';
import Profile from './../assets/Images/Profile.avif';

const Header = () => {
    const [toggle, setToggle] = useState(false);

    const menu = [
        { name: 'HOME', icon: HiHome, to: '/' },
        { name: 'SEARCH', icon: HiMagnifyingGlass, to: '/search' },
        { name: 'CATEGORIES', icon: HiStar, to: '/categories' },
        { name: 'WATCH LIST', icon: HiPlus, to: '#watchlist' },
        { name: 'MOVIES', icon: HiPlayCircle, to: '#movies' },
        { name: 'SERIES', icon: HiTv, to: '#movies' }
    ];

    return (
        <div className='header-container flex items-center justify-between p-4 max-sm:p-2 py-5 gap-9'>
            <div className="flex items-center justify-between gap-8 max-sm:gap-4">
                <img src={logo} alt="Logo" className='max-sm:w-[70px] w-[70px] md:w-[90px] object-cover mr-4 mt-[-20px] max-sm:mt-[-10px]' />
                
                {/* Render HeaderItem components with the 'to' prop */}
                <div className='menu-items hidden lg:flex space-x-10'>
                    { menu.map((item, index) => (
                        <HeaderItem key={index} name={item.name} Icon={item.icon} to={item.to} />
                    ))}
                </div>
                
                {/* Render HeaderItem components with the 'to' prop */}
                <div className='menu-items lg:hidden max-sm:hidden flex gap-8 justify-between'>
                    {menu.map((item, index) => (
                        <HeaderItem key={index} name={''} Icon={item.icon} to={item.to} />
                    ))}
                </div>
                
                {/* Render HeaderItem components with the 'to' prop */}
                <div className='menu-items sm:hidden flex gap-5 justify-between'>
                    {menu.map((item, index) => index < 3 && (
                        <HeaderItem key={index} name={''} Icon={item.icon} to={item.to} />
                    ))}
                </div>

                {/* Render HeaderItem components with the 'to' prop */}
                <div className="sm:hidden relative" onClick={() => setToggle(!toggle)}>
                    <HeaderItem name={''} Icon={HiDotsVertical} />
                    {toggle &&
                        <div className='absolute right-1 mt-4 z-50 bg-[#00000062] border border-gray-700 p-3 px-6 pb-2'>
                            {menu.map((item, index) => index > 2 && (
                                <HeaderItem key={index} name={item.name} Icon={item.icon} to={item.to} />
                            ))}
                        </div>
                    }
                </div>
            </div>
            <img src={Profile} alt="" className='w-[40px] max-sm:w-[30px] rounded-[50%]' />
        </div>
    );
}

export default Header;
