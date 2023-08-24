import Dice from './Dice'
import Blackjack from './Blackjack'

export default function Container({ children }) {
    return (
        <div>
            <Dice />
            <Blackjack />
        </div>
    )
}