import './Howcontainer.css'
import Howtoplaycard from './Howtoplaycard'
import Howtoplay from './Howtoplay'

export default function Howcontainer () {
    return (
        <div className='howcontainer'>
            <Howtoplay />
            <Howtoplaycard />
        </div>


    )
}