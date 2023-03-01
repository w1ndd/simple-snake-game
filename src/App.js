import { useEffect, useState } from 'react'
import Snake from './snake'
import Apple from './apple'

function App() {
    const gameSpeed = 100;

    const [snakePositions, setSnakePositions] = useState([[0, 0], [4, 0]])
    const [applePosition, setApplePosition] = useState(getRandomCoordinates())
    const [direction, setDirection] = useState('RIGHT')
    const [directionCode, setDirectionCode] = useState(39)
    const [start, setStart] = useState(false)

    useEffect(() => {
        if(start){
            checkIfOutOfBorder();
            checkIfCollapsed();
            checkIfEats();
            document.onkeydown = onKeyDown;
            
            const interval = setInterval(moveSnake, gameSpeed);
            return () => clearInterval(interval);
        }
    }, [document.onkeydown, start])

    const onKeyDown = (e) => {
        //if statement to prevent a breaking game bug
        if(e.keyCode !== directionCode){
            e = e || window.event;
            switch (e.keyCode) {
            case 38:
                if(direction !== 'DOWN'){
                    setDirection('UP');
                    setDirectionCode(38);
                }
                break;
            case 40:
                if(direction !== 'UP'){
                    setDirection('DOWN');
                    setDirectionCode(40);
                }
                break;
            case 37:
                if(direction !== 'RIGHT'){
                    setDirection('LEFT');
                    setDirectionCode(37);
                }
                break;
            case 39:
                if(direction !== 'LEFT'){
                    setDirection('RIGHT');
                    setDirectionCode(39);
                }
                break;
            default:
                break;
            }
        }
    }

    const checkIfEats = () => {
        const head = snakePositions[snakePositions.length - 1];
        if(head[0] === applePosition[0] && head[1] === applePosition[1]){
            let newDots = [...snakePositions]
            //add empty array to the end of array to delete it after 1 move in moveSnake() method
            newDots.unshift([])
            setSnakePositions(newDots)
            setApplePosition(getRandomCoordinates())
        }
    }

    const gameOver = () => {
        alert('Game over.')
        resetGame()
    }

    const resetGame = () => {
        setStart(false)
        setSnakePositions([[0, 0], [4, 0]])
        setDirection('RIGHT')
        setApplePosition(getRandomCoordinates())
    }

    const checkIfOutOfBorder = () => {
        const head = snakePositions[snakePositions.length - 1];
        if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
            gameOver();
        }
    }

    const checkIfCollapsed = () => {
        let dots = [...snakePositions]
        let head = snakePositions[snakePositions.length - 1]
        // remove snake's head coordinates
        dots.pop();
        dots.forEach(dot => {
            if(head[0] === dot[0] && head[1] === dot[1]){
                gameOver();
            }
        })
    }

    const moveSnake = () => {
        let dots = [...snakePositions]
        let head = snakePositions[snakePositions.length - 1]

        switch (direction){
            case 'RIGHT':
                head = [head[0] + 4, head[1]]
                break;
            case 'LEFT':
                head = [head[0] - 4, head[1]]
                break;
            case 'UP':
                head = [head[0], head[1] - 4]
                break;
            case 'DOWN':
                head = [head[0], head[1] + 4]
                break;
            default:
                break;
        }
        
        //add first snake's dot
        dots.push(head);
        //remove last snake's dot
        dots.shift();
        setSnakePositions(dots)
    }

    return (
        <>
        <div className="game-header">
                <h3>Simple snake game.</h3>
                Press <b>Start</b> to start the game. 
                Press <b>Stop</b> to pause the game. 
                Press <b>Reset</b> to reset the game. 
                Press <b>arrow buttons</b> on your keyboard <b>(↑ ↓ ← →)</b> to move the snake. Game speeds up by the time.
        </div>
        <div className="game-settings">
            {start === false ? 
            <button className='button green' onClick={() => setStart(true)}> Start </button> : 
            <button className='button red' onClick={() => setStart(false)}> Stop </button>}
            <button className='button grey' onClick={() => {setStart(false); resetGame()}}> Reset </button>
        </div>
        
        <div className="game-area">
            <Snake snakePositions={snakePositions}></Snake>
            <Apple applePosition={applePosition}></Apple>
        </div>
        </>
    );
}

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/4)*4;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/4)*4;
    return [x, y]
}

export default App;
