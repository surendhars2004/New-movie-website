import React from 'react';
import { Link } from 'react-router-dom';

const HeaderItem = ({ Icon, name, to }) => {
  return (
    <Link to={to} className='text-white flex items-center gap-3 max-sm:gap-3
                    text-[15px] cursor-pointer font-semibold hover:underline underline-offset-8 mb-2'>
        <Icon className='w-5 h-5' />
        {/* Use Link component and pass 'to' prop */}
        <h2 className='text-white'>{name}</h2>
    </Link>
  );
}

export default HeaderItem;
