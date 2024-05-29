import React, { useEffect, useState } from 'react'

 const Favorite = () => {
    const [favorites, setFavorites] = useState( []);
    useEffect(() => {
        const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites'));
        if (favoritesFromStorage) {
            setFavorites(favoritesFromStorage);
        }
    },[])
      
    const handleClick = (id) => {
      const newArray = favorites.filter((item, index) => index !== id);
      setFavorites(newArray); 
       localStorage.setItem('favorites', JSON.stringify(newArray));
    };

  return (
    <div className='mb-2' style={{border:'1px solid grey'}}>
<ol>
    {
       favorites.length > 0 ? (
            favorites.map((item, index) => {
                return (
                    <li className='mt-2' key={index}>{item.title} &nbsp;&nbsp;
                    <button  id={item.id} onClick={() => handleClick(index)} className="mt-2 btn btn-primary">{'Remove'}</button></li>
                )
            })):(
                <p>No favorite Movies found.</p>
              )}
</ol>
    </div>
  )
}
export default Favorite;