import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from '../../Modal/UpdateUserModal';
import {useMutation} from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
const UserDataRow = ({ user, refetch }) => {
  const{user:loginUser} = useAuth()
  const axiosSecure = useAxiosSecure()
  const [isOpen,setIsOpen] = useState(false);
  const{mutateAsync} = useMutation({
    mutationFn : async role =>{
       const{data} = await axiosSecure.patch(`/users/update/${user?.email}`,role)
       return data
    },
    onSuccess : data => {
      refetch()
      setIsOpen(false)
    }
  })
  const modalHandler = async (selected)=>{
    if(loginUser.email === user?.email ){
      return setIsOpen(false)
    }
      const userRole = {
        role : selected,
        status : 'Verified'
      }
      try{
         const {data} = await mutateAsync(userRole)
      }catch(error){
        console.log(error);
      }
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={()=>setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        <UpdateUserModal isOpen={isOpen} modalHandler={modalHandler} setIsOpen={setIsOpen} user={user}></UpdateUserModal>
        {/* Update User Modal */}
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow