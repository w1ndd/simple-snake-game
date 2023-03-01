export default function snake({snakePositions}) {
    return(
        <>
            {snakePositions.map((row, i) => {
                const style = {
                    left: `${row[0]}%`,
                    top: `${row[1]}%`
                }
                if(i === snakePositions.length - 1) {
                    return(<div className="snake-head" key={i} style={style}>{snakePositions.length - 2}</div>)
                } else {
                    return(
                        <div className="snake-dot" key={i} style={style}></div>
                    )
                }
            })}
        </>
    )
}