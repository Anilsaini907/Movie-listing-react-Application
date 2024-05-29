import React ,{useState,useEffect,useMemo}from 'react';
import axios from 'axios';
import './App.css';
import Posts  from './components/Posts';
import Pagination from './components/Pagination';
import SearchBar from './components/Search';
import { Favorite } from './components/Favorite';

function App() {
  const [posts,setPosts]=useState([]);
  const [loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(()=>{
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    setFavorites(storedFavorites);
    const fetchPosts = async ()=>{
      setLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/albums`);
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts();
    console.log('Fetch posts');
  },[]);

  const addFavorite = (post) => {
    const updatedFavorites = [...favorites, post];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
 
  //get current post
  const indexOfLastPost = currentPage * postsPerPage;
  // 10=1*10
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // 10-10 = 0
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);
  // 0-9 posts

  const [filteredPosts, setFilteredPosts] = useState(currentPosts);
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    const filtered = currentPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }

  const paginate= (pageNumber)=>setCurrentPage(pageNumber);
  return (
    <div className="App row">
  <div className="col-md-8">
    <SearchBar searchQuery={searchQuery} handleChange={handleChange}/>
      <h1 className='text-primary mb-3 mt-3'>Movies</h1>
     <div className=''>
     <Posts posts={
      searchQuery ? filteredPosts:currentPosts
      } loading={loading} addFavorite={addFavorite}/>
     </div>
    
    <div className='' style={{marginLeft: '30px'}}>
      <Pagination postsPerPage={postsPerPage} 
     totalPosts={searchQuery ? filteredPosts.length:posts.length}
     paginate={paginate}
     />
    </div>
   
  </div>
  <div className="col-md-3 mt-5">
    <h3 className='text-primary mb-3 mt-5'>Favorites Movies</h3>
    <div className=''>
       <Favorite/>
    </div>
  </div>
</div>


  );
}

export default App;
