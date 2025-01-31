import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import toast from 'react-hot-toast'
import { useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useAuth from '../../../../hooks/useAuth'
import HostModal from '../../../Modal/HostModal'

const GuestMenu = () => {
  const[role] = useRole()
  const{user} = useAuth()
  const axiosSecure = useAxiosSecure() 
  const[isModalOpen,setIsModalOpen] = useState(false)
  const closeModal=()=>{
    setIsModalOpen(false)
  }

  const modalHandller = async ()=>{
    console.log("Wanna be a host");
 

    try{
      const currentUser = {
        email : user?.email,
        role : 'guest',
        status : 'Requested'
      }
      const {data} = await axiosSecure.put(`/user`,currentUser)
      console.log(data);
      if(data.modifiedCount>0){
        toast.success("Successfully!! Please Wait for admin")
      }
      else{
        toast.success("Please Wait")
      }
    }catch(err){
      console.log(err);
    }
    finally{
      closeModal()
    }
  }
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

      {
        role === 'guest' && <button onClick={()=>setIsModalOpen(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Host</span>
      </button>
      }
      <HostModal closeModal={closeModal} isOpen={isModalOpen} modalHandller={modalHandller}></HostModal>
    </>
  )
}

export default GuestMenu