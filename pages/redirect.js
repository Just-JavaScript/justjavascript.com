import {useRouter} from 'next/router'
import * as React from 'react'
import Layout from '../components/layout'

const Redirect = () => {
    const router = useRouter()

    React.useEffect(() => {
        router.replace('/content')
    })

    return null
}

export default Redirect
