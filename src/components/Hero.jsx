export default function Hero(props){
    return(
        <section className="container">
            <h1>Quizzical</h1>
            <p>Wanna test your knowledge? </p>
            <button onClick={()=>props.setisStarted(true)}>Start Quiz</button>
        </section>
    )
}