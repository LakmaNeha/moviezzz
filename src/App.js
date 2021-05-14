import './App.css';
import React , {useEffect, useState} from 'react';
import Movie from './Movie';
import Modal from './Modal';
import SearchIcon from '@material-ui/icons/Search';
import WatchList from './WatchList'
import {db} from './firebase_config';

function App() {


  const API="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=32bd743f0a5e71b0ba0036dd8de85d2c";
  const SEARCH_API="https://api.themoviedb.org/3/search/movie?api_key=32bd743f0a5e71b0ba0036dd8de85d2c&query="

  const [movies, setMovies] = useState([]); 
  const [searchKey, setSearchKey] = useState("");
  const [ num , setNum ] = useState(null);
  const [search,setSearch] = useState(false);
  const [mvName, setMvName] =useState(null);
  const [mvImg, setMvImg] =useState(null);
  const [mvOverview,setMvOverview] = useState(null);
  const [show,setShow] = useState(false);
  const [watchList,setWatchList]=useState([])
 
  function fetchResults(apiInput)
  {
    fetch(apiInput)
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    setMovies(data.results);
    });
  }
  useEffect(() => {
  
    fetchResults(API);
    
    
  
  }, [ ])


  useEffect (()=>{
    db.collection('items').onSnapshot(serverUpdate => {
     
      const list = serverUpdate.docs.map(_doc =>{
     
        const data = _doc.data();
        data['id'] =_doc.id;
        return data;
      });
      
      setWatchList(list);
      
    });
 },[]);



  function searchResult(e){

    if(searchKey.trim().length===0){
            
    }
    else{

      e.preventDefault();
      fetchResults(SEARCH_API+searchKey);
      setSearchKey("")
      setSearch(false)

    } 

  }

  function showSearch(){
    setSearch(true)
  }
  

  function changeHandler(e){
    setSearchKey(e.target.value);
  }

  function showList(){
    setShow(true)
  }
  
  if(movies){
    return (

      <div className="App" >
        <header>

        <div style={{display: "flex" , flexDirection: "row" , alignItems: "center",justifyContent: "space-between"}} >
        <a href= "/" style={{textDecoration: "none"}}><h1>MOVIEZZZ</h1></a>
        <a href= "/" style={{textDecoration: "none"}}><h4 style={{marginLeft:"3rem",color:"white"}}>Home</h4></a>
        <h4 style={{marginLeft:"3rem",color:"white",cursor:"pointer"  }} onClick={showList} >Watchlist</h4>
        </div>  

      <form onSubmit={searchResult}>
      {
        !search ?
      <SearchIcon style={{ fontSize: 40 }} onClick={showSearch} className={search ? "hide" : "searchIcon"}/>  :
       <input className={ search ? "showInput" :"hide"} type="search" placeholder="search..." onChange={changeHandler} value={searchKey} />
      }
      </form>
      </header>

      { !show && <div className="movie-container" onClick={() => setSearch(false)}>
        
       {movies.map((movie) => 
  
         <Movie key={movie.id} {...movie}  setNum={setNum}  setMvName={setMvName}  setMvImg={setMvImg} setMvOverview={setMvOverview}/>
  
       )}

       { num ? <Modal num={num} setNum={setNum} mvName={mvName} setMvName={setMvName} mvImg={mvImg} setMvImg={setMvImg}
       mvOverview={mvOverview} setMvOverview={setMvOverview} watchList={watchList} setWatchList={setWatchList}/> : <></>}
      
      </div>
  }

      {show && <WatchList watchList={watchList}/>}
      </div>
    );
  }
  
}

export default App;
