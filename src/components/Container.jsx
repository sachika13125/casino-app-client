import Dice from './Dice'
import Blackjack from './Blackjack'
import UserProfile from './UserProfile'

export default function Container({ children }) {
    return (
        <div>
            <Dice />
            <Blackjack />
        </div>
    )
}