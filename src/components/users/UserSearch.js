import React, { useContext, useState } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {
    const {users,searchUsers,handleClear} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)
    const [search,setSearch] = useState("")

    const handleChange = (event)=> {
        setSearch(event.target.value)
    }


    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (search === "") setAlert("Please enter something", "error")
        else if (search.length < 4) setAlert("Please enter at least 4 characters","error")
        else {
            searchUsers(search)
            setSearch("")
        }
    }
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleFormSubmit}>
                <div className='form-control'>
                    <div className='relative'>
                        <input 
                            type="text" 
                            className='w-full pr-40 bg-gray-200 input input-lg text-black' 
                            placeholder='Search' 
                            onChange={handleChange} 
                            value={search}/>
                        <button className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg' type='submit'> Go </button>
                    </div>
                </div>
            </form>
        </div>
        {users.length > 0 && (
            <div>
                <button className='btn btn-ghost btn-lg' onClick={handleClear}>Clear</button>
            </div>)
        }

    </div>
  )
}

export default UserSearch