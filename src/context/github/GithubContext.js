import githubReducer from "./GithubReducer";
const { createContext, useReducer } = require("react");

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubContextProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: [],
    }

    const [state, dispatch] = useReducer(githubReducer,initialState)

    // get users for testing
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })
        const {items} = await response.json()
        // console.log("data: ", data);
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
        
    }
    // get a single user
    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })

        if(response.status === 404){
            window.location = '/notfound'
        }
        else{
            const data = await response.json()
            // console.log("data: ", data);
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }

        // get user repos
        const getUserRepos = async (login) => {
            setLoading()

            const params = new URLSearchParams({
                sort: "created"
            })
          
            const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
                headers:{
                    Authorization: `token ${GITHUB_TOKEN}`,
                }
            })
            const data = await response.json()
            // console.log("data: ", data);
            dispatch({
                type: 'GET_REPOS',
                payload: data,
            })
            
        }

    const setLoading = () => dispatch({type: "SET_LOADING"})

    // clear search result
    const handleClear = ()=>{dispatch({type: "CLEAR"})}

    return(
        <GithubContext.Provider value={{
            ...state,
            dispatch,
            handleClear,
            searchUsers,
            getUser,
            getUserRepos
        }}>
            {children}
        </GithubContext.Provider>
    )    
}

export default GithubContext