import React, {useState} from "react";
import axios from "axios";

export default function Login(props) {
	const {login} = props
	const [toLogin, setToLogin] = useState(true)

	return(<div className="container">
	    {(toLogin)?
	    	<SubLogin toRegister={()=>setToLogin(false)} login={login}/>
	    	:
	    	<SubRegister toLogin={()=>setToLogin(true)}/>
	    }
	</div>)
}

function SubLogin(props) {
	const {toRegister, login} = props
	const [username, setUsername] = useState("")

	const handleLogin = async (e) => {
		e.preventDefault()
		const res = await axios.post("/users/login", {username})
		const auth = res.data
		if (auth) login(auth._id, auth.creator)
	}

	return(<form className="col s12">
	    <div className="input-field row">
		    <input 
		    className="input-field col s12" 
		    type="text" 
		    id="username"
		    value={username}
		    onChange={(e)=>setUsername(e.target.value)}
		    />
	    	<label htmlFor="username">Логин...</label>
	    </div>
	    <div className="row">
		    <div className="col s1">
			    <button className="btn waves-effect waves-light"
			    onClick={(e)=>handleLogin(e)}
			    >
				  Войти
				</button>
			</div>
		    <div className="col s1">
			    <button className="btn waves-effect waves-light"
			    onClick={(e)=>toRegister(e)}
			    >
				  Регистрация
				</button>
			</div>
		</div>
	</form>)
}

function SubRegister(props) {
	const {toLogin} = props
	const [username, setUsername] = useState("")
	const [creator, setCreator] = useState(false)
	
	const handleRegister = async (e) => {
		e.preventDefault()
		await axios.post("/users/register", {username, creator})
		toLogin()
	}

	return(<form className="col s12">
	    <div className="input-field row">
		    <input 
		    className="input-field col s12" 
		    type="text" 
		    id="username"
		    value={username}
		    onChange={(e)=>setUsername(e.target.value)}
		    />
	    	<label htmlFor="username">Логин...</label>
	    </div>
	    <p>
				<label>
				  <input 
					type="checkbox" 
					value={creator} 
					  onClick={_=>setCreator(e => !e)}
				  />
				  <span>Редактор</span>
				</label>
	    </p>
	    <div className="row">
		    <div className="col s2">
			    <button className="btn waves-effect waves-light"
			    onClick={(e)=>handleRegister(e)}
			    >
				  Зарегестрировать
				</button>
			</div>
		    <div className="col s2">
			    <button className="btn waves-effect waves-light"
			    onClick={(e)=>toLogin(e)}
			    >
				  Назад
				</button>
			</div>
		</div>
	</form>)
}
