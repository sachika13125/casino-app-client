import './Howtoplaycard.css'

export default function Howtoplaycard() {
    return (
        <div className='howtoplay'>
        <div className='block w-[600px] p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <h2 className='mb-2 text-2xl font-bold tracking-tight text-white">Noteworthy technology acquisitions 2021'>Dice Game:</h2>
            <p className='font-normal text-gray-700 dark:text-gray-400'><strong>Objective:</strong> In the Dice Game, you'll roll dice and try to match your guess to the outcome of the dice roll.</p>
            <ul className='text-left'>
                <li>You start with a certain number of guesses (e.g., 10) and a score of 0. You also have a stash of tickets that you can win or lose.</li>

                <li>You'll guess a number between 1 and 6 and click the "Roll" button. The dice will be rolled, and the outcome will be displayed. If your guess matches the roll, you win a reward.</li>

                <li>If your guess matches the roll, you'll earn a reward based on the rewards table. The reward amount will be added to your score.</li>

                <li>Each roll consumes one guess. As you play, your score increases, and you earn or lose tickets based on your success. If you run out of guesses or tickets, the game ends.</li>

                <li>If you lose and your score is 0, you'll lose a ticket. You can reset the game to start fresh with your remaining tickets and guesses.</li>

                <li>The "currency" displayed represents your accumulated tickets. You can use these tickets to play the game.</li>

                <li>Keep playing, making guesses and rolling dice, to try to increase your score and accumulate more tickets.</li>
            </ul>
        </div>
        </div>

    )
}
