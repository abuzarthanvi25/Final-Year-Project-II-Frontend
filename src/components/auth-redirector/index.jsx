import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Loader2 from '../loaders/index'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthRedirector = ({ children, auth, rehydrated }) => {
  const [isRehydrated, setIsRehydrated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsRehydrated(rehydrated)
  }, [rehydrated])

  useEffect(() => {
    authCheck()
  }, [location.pathname, isRehydrated])

  const authCheck = () => {
    if (!isRehydrated) {
      // Still rehydrating, show loader
      setIsLoading(true)
      return
    }

    if (!auth?.userDetails) {
      // logged out cases
      if(location.pathname == '/' || location.pathname.includes("/dashboard")){
        setIsLoading(false)
        navigate('/')
      }
      // logged in cases
    } else if (['/sign-in', '/sign-up', '/'].includes(location.pathname)) {
      setIsLoading(false)
      navigate('/dashboard/home')
    } else {
      // User is logged in and accessing other routes, no redirection needed
      setIsLoading(false)
    }
  }

  return isLoading ? <Loader2 /> : children
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    rehydrated: state._persist.rehydrated
  }
}

export default connect(mapStateToProps, null)(AuthRedirector)
