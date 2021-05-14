import movieTrailer from 'movie-trailer';
import React, {useState} from 'react'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {db} from './firebase_config';


export default function Modal({num,setNum,mvName,setMvName,mvImg,setMvImg,mvOverview,setMvOverview,watchList,setWatchList}) {

  const [url,setUrl] = useState(null);
  


  

    movieTrailer( null, { tmdbId: num } , ( error, response ) => {
   
      setUrl(response)
      console.log(error)
    
} )

 function closeModal(){
     setNum(null)
     setMvName(null)
     setMvImg(null)
     setMvOverview(null)
 }

 function deleteItem(){

  let itemId = null;
  watchList.some(mv => mv.idNum === num ? itemId=mv.id : itemId=null ) 
  db.collection("items").doc(itemId).delete();

 }

 const addToWishList = async() =>  {

  await  db.collection("items").add({
    
     name: mvName,
     poster: mvImg,
     idNum :num

   });

 }


   return (
        
    <div className="backdrop">
        <div className="modal" >
             <div>
                  <h2>
                   {mvName}
                  </h2>
             </div> 
            <div className="mobile">

              <div className="imgWithDetails">

                    <img src={mvImg} alt={mvName} />

                    <div className="details">

                        <p >{mvOverview}</p>

                       <div className="buttons">
                       {url && <a  href={url} target="_blank" rel="noopener noreferrer"> <button className="trailerBtn" >Watch Trailer</button> </a> }
                        
                        { watchList ? 
                                (  watchList.some(mv => mv.idNum === num)  ?  
                                      <BookmarkIcon style={{ fontSize: 40 }}  className="inList" onClick={deleteItem}/>   
                                      : <BookmarkBorderIcon style={{ fontSize: 40 }} className="notInList" onClick={addToWishList}/>
                                ) 
                                 : null
                         }
                       </div>
                        
    
 
                    </div>

                </div>

              </div>

            {console.log(watchList)}
           
           <button className="cancelBtn" onClick={closeModal} >x</button>
         </div>
           
    </div>
    )
}
