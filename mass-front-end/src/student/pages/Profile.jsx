import NavbarStudent from '../global/NavbarStudent'
import Sidebar from '../global/Sidebar'
import { People, PeopleAlt } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';
import ProfilePic from '../images/profile.jpeg';
function Profile({handleProfile}) {
    return (
      <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-screen">
        <NavbarStudent Icon={People} title={"Profile"} handleProfile={handleProfile} />
        <div className="mt-6">
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-full mx-auto h-full rounded-lg">
              <div style={{
                background: 'linear-gradient(180deg, #F26522 0%, rgba(242, 101, 34, 0.37) 99.99%, rgba(242, 101, 34, 0.00) 100%)'
              }} className= 'h-[103px] flex justify-center rounded-lg'>
                
              </div>
              <div className='flex justify-center gap-2 items-center flex-col relative top-[-50px]'>
                <img className='w-[150px] h-[150px] rounded-full' src={ProfilePic} alt='Profile' />
                <span className=' font-semibold text-xl'>John Muninga</span>
              </div>

              <div className='flex justify-around'>
                <div className='flex flex-col gap-2'>
                  <h1 className=' text-2xl font-semibold '>Your Information</h1>
                  <div className='flex flex-col justify-center bg-white w-[25rem] gap-5 h-[15rem] p-3 rounded-lg'>
                    <div className='flex justify-around gap-3'>
                    <div className='flex flex-col gap-3 font-semibold text-lg'>
                      <h1>Full Name:</h1>
                      <h1>Email Address:</h1>
                      <h1>Student Number:</h1>
                      
                    </div>
                    <div className='flex flex-col justify-center text-[16px] gap-3'>
                      <p className=''>John Muninga</p>
                      <p>jmuninga@gmail.com</p>
                      <p className=''>227834150</p>
                    </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-2xl font-semibold'>Settings</h1>
                  <div className=' bg-white w-[25rem] h-[15rem] p-5 rounded-lg '>
                  <h1 className='text-center text-lg font-semibold mb-5'>Global Notification Settings</h1>
                  <div className='flex flex-col  gap-3 text-[#F26522]'>
                    <div className='flex justify-between ' >
                      <h1>Email Notification</h1>
                      <button className=' cursor-pointer '>
                        <EditIcon />
                      </button>
                    </div>
                    <div className='flex justify-between' >
                      <h1>Push Notification</h1>
                      <button className=' cursor-pointer '>
                        <EditIcon />
                      </button>
                    </div>
                    <div className='flex justify-between' >
                      <h1>Help Center</h1>
                      <button className=' cursor-pointer '>
                        <EditIcon />
                      </button>
                    </div>
                    <div className='flex justify-between' >
                      <h1>Privacy & Security</h1>
                      <button className=' cursor-pointer '>
                        <EditIcon />
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
      </div>
    </div>
    )
}

export default Profile
