import React from 'react';
import SideModal from './SideModal';


export default function NavBar() {
  // const {data: categories} = api.categories.getAll.useQuery(); 
  return (
    <div className='sticky top-0 bg-secondary h-16 flex items-center p-4 text-primary
        text-2xl'>
          {/* {!!categories && <SideModal {...categories}></SideModal>} */}
        </div>        
  )
}
