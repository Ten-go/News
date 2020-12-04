import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";

export default function SavedNews(props) {
	const {loader, auth} = props
	const [loading, setLoading] = useState(true)
	const [news, setNews] = useState([])

	const fetchData = useCallback(async ()=>{
		try {
			const res = await axios.get("/saved/"+auth.id)
			console.log(res.data)
			setNews(res.data)
			setLoading(false)
		} catch(e) {
			console.log(e)
		}
	}, [auth.id])

	useEffect(()=>{
		fetchData()
	}, [fetchData])

	const handleBookmark = async (e, id) => {
		e.preventDefault()
		try {
			const res = await axios.post("/saved/delete", {_id: id})
			console.log(res)
			fetchData()
		} catch(e) {
			console.log(e)
		}		
	}

	if (loading) return(loader)
	return(
		<div className="container">
		{
			news.map(element=>{
							const news = element.news
							const id = element._id
							return <div className="col s12 m6 z-depth-4" key={id}>
							  <div className="card blue-grey darken-1">
							    <div className="card-content white-text">
							      	<span className="card-title">
							       	<h2>{news.title}</h2>
							       	<h5>{news.type}</h5>
							       	</span>
							      	{news.body.split('\n').map((e, num)=><p key={num}>{e}</p>)}
							    </div>
							    <div className="card-action">
									<a href="/" onClick={(e)=>handleBookmark(e, id)}>Убрать из закладок</a>
									<p>Создано: {news.updatedAt.slice(0, 10)}</p>
							    </div>
							  </div>
							</div>})
		}
		</div>
	)
}