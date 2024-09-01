import { useEffect } from "react"


const Home = () => {

	//TODO для теста бекенда что работает
	useEffect(() => {
		fetch("http://127.0.0.1:8000/days/3").then(res => res.json()).then(res => console.log(res, 333))
	}, [])

	return (
		<div className="row between-xs" style={{ height: "100vh", padding: "15px", background: "var(--gray)" }}>
			<div className="col-xs-12">
				<div className="box">
					home page
				</div>
			</div>
		</div>
	)
}

export default Home
