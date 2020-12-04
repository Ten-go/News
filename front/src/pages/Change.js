import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import M from "materialize-css";

export default function Change(props) {
	const {auth, loader} = props
	const {id} = useParams()
	const [news, setNews] = useState({title: "", type: "", body:""})
	const [loading, setLoading] = useState(true)

	const fetchData = useCallback(async ()=>{
		try {
			const res = await axios.get("/news/get/"+id)
			setLoading(false)
			setNews(res.data)
			M.AutoInit()
			M.updateTextFields()
		} catch(e) {
			console.log(e)
		}
	}, [id])

	const handleSubmit = async (e) => {
		const {title, type, body} = news
		try {
			const res = await axios.post('/news/update', {_id: id, title, type, body})
			console.log(res)
			setNews({title: "", type: "", body:""})
		} catch(e) {
			console.log(e)
		}
	}

	const handleInput = (e) => {
		setNews({...news, [e.target.name]: e.target.value})
	}

	useEffect(()=>{
		fetchData()
	}, [fetchData])

	if (!auth.creator) return(<Redirect to="/news" />)
	if (loading) return(loader)
	return(<div className="container">
		<div className="row">
		  <form className="col s12">
		    <div className="row">
		      <div className="input-field col s12">
          		<i className="material-icons prefix">assignment_late</i>
		        <input 
		        id="title" 
		        name="title"
		        type="text" 
		        className="validate"
		        value={news.title} 
		        onChange={handleInput}
		        />
		        <label htmlFor="title">Заголовок...</label>
		      </div>

			  <div className="input-field col s12">
          		<i className="material-icons prefix">assignment_turned_in</i>
			    <select 
			    name="type"
			    value={news.type} 
			    onChange={handleInput}
			    >
			      <option value="">Выберете тему...</option>
			      <option value="Спорт">Спорт</option>
			      <option value="Наука">Наука</option>
			      <option value="Образование">Образование</option>
			    </select>
			    <label>Тема</label>
			  </div>

		      <div className="input-field col s12">
          		<i className="material-icons prefix">assignment</i>
		        <textarea 
		        id="body" 
		        name="body" 
		        className="materialize-textarea"
		        value={news.body} 
		        onChange={handleInput}
		        />
		        <label htmlFor="body">Тело новости...</label>
		      </div>
		    </div>
		  </form>
			<div className="col s12 center-align">
				<button className="btn" onClick={handleSubmit}>
					Изменить
					<i className="material-icons right">mode_edit</i>
				</button>
			</div>
		</div>
		</div>)

}