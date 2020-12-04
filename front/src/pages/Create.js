import React, {useState, useEffect} from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import M from "materialize-css";

export default function Create(props) {
	const {auth} = props
	const [news, setNews] = useState({title: "", type: "", body:""})

	useEffect(()=>{
		M.AutoInit()
		M.updateTextFields()
	},[])

	const handleSubmit = async (e) => {
		const {title, type, body} = news
		if (!title || !type || !body) return
		try {
			const res = await axios.post('/news/add',news)
			console.log(res)
			setNews({title: "", type: "", body:""})
		} catch(e) {
			console.log(e)
		}
	}

	const handleInput = (e) => {
		setNews({...news, [e.target.name]: e.target.value})
	}
	if (!auth.creator) return(<Redirect to="/news"/>)
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
					Добавить
					<i className="material-icons right">cloud</i>
				</button>
			</div>
		</div>
		</div>)
}