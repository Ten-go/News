import React, {useState, useEffect, useCallback} from "react"
import axios from "axios"
import M from "materialize-css"
import {NavLink} from 'react-router-dom'
 
export default function NewsList(props) {
    const {loader, auth} = props
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const [news, setNews] = useState([])
    const [newsS, setNewsS] = useState([])
    const [sort, setSort] = useState("0")
 
    const sortF = (value) => {
        switch (value) {
            case '0':
                return
            case '1':
                return(setNews(news.sort((a, b)=> new Date(b.updatedAt) - new Date(a.updatedAt))))
            case '2':
                return(setNews(news.sort((a, b)=> new Date(a.updatedAt) - new Date(b.updatedAt))))
            default:
                console.log(value)
        }
    }
 
    const handleFilter = (e) => {
        const value = e.target.value
        if (value) setNews(news.filter(e=>new Date(e.updatedAt.slice(0, 10)) - new Date(value) === 0))
            else setNews(newsS)
        setFilter(value)
        sortF(sort)
    }
 
    const handleSort = (e) => {
        const value = e.target.value
        setSort(value)
        sortF(value)
    }
 
    const handleBookmark = async (e, newsId) =>{
        e.preventDefault()
        try {
            const res = await axios.post('/saved', {userId: auth.id, newsId})
            console.log(res)
        } catch(e) {
            console.log(e)
        }
    }
 
    const handleRemove = async (e, _id) =>{
        e.preventDefault()
        try {
            const res = await axios.post('/news/delete', {_id})
            console.log(res)
            fetchData()
        } catch(e) {
            console.log(e)
        }
    }
 
    const fetchData = useCallback(async ()=>{
        try {
            const res = await axios.get("/news")
            setLoading(false)
            setNews(res.data)
            setNewsS(res.data)
            M.AutoInit()
        } catch(e) {
            console.log(e)
        }
    }, [])
 
    useEffect(()=>{
        fetchData()
    }, [fetchData])
 
    if (loading) return(loader)
    return(<div className="container">
          <div class="input-field col s12" style={{position: "fixed", top: 75, zIndex: 3, left: 5}}>
            <select value={sort} onChange={handleSort}>
              <option value="0" disabled>Выбрать сортировку...</option>
              <option value="1">По убыванию даты</option>
              <option value="2">По возрастанию даты</option>
            </select>
            <label>Сортировка</label>
            <input id="filter" type="date" class="validate" value={filter} onChange={handleFilter}/>
            <label for="filter">Выбрать дату</label>
          </div>
        {(news.length)?
            news.map(news=>(
                    <div className="col s12 m6 z-depth-4" key={news._id}>
                      <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">
                                <h2>{news.title}</h2>
                                <h5>{news.type}</h5>
                                </span>
                            {news.body.split('\n').map((e, num)=><p key={num}>{e}</p>)}
                        </div>
                        <div className="card-action">
                            <a href="/" onClick={(e)=>handleBookmark(e, news._id)}>Добавить в закладки</a>
                            {(auth.creator)?           
                                    <div className="fixed-action-btn  horizontal direction-left" style={{zIndex: 1,position: "absolute"}}>
                                      <a className="btn-floating btn-large red" href="/" onClick={e=>e.preventDefault()}>
                                        <i className="large material-icons">arrow_back</i>
                                      </a>
                                      <ul>
                                        <li>
                                            <a
                                            href="/"
                                            className="btn-floating green"
                                            onClick={(e)=>handleRemove(e, news._id)}
                                            >
                                                <i className="material-icons">remove</i>
                                            </a>
                                        </li>
                                        <li>
                                            <NavLink
                                            to={"/change/"+news._id}
                                            className="btn-floating blue"
                                            >
                                                <i className="material-icons">mode_edit</i>
                                            </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                :
                                null
                            }
                            <p>Создано: {(new Date(news.updatedAt)).toLocaleDateString()} в: {(new Date(news.updatedAt)).toTimeString().slice(0, 5)}</p>
                        </div>
                      </div>
                    </div>)
            )
            :
            <h2 className="center">Пока новостей нет...</h2>
        }
        {(auth.creator)?
            <div className="fixed-action-btn">
              <NavLink to="/create" className="btn-floating btn-large red">
                <i className="large material-icons">add</i>
              </NavLink>
            </div>
            :
            null
        }
    </div>)
}