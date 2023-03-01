export default function apple({applePosition}) {
    const style = {
        left: `${applePosition[0]}%`,
        top: `${applePosition[1]}%`
    }

    return(<div className="apple" style={style}></div>)
}