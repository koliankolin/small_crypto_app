import type { NextPage } from 'next'
import {Balance} from "../components";
import "bulma/css/bulma.min.css"

const Home: NextPage = () => {
    return (
    <>
        <div className="container">
            <Balance />
        </div>
    </>
    )
}

export default Home
