import Post from '../components/Post'


const HomeView = () => {

    return (
        <div id = "home-view">
            
            <div className = "posts-view">
            <h1 id = "posts-title">Posts</h1>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>

            <div className = "news-view">
                <h1 id = "posts-title">News</h1>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
        

}

export default HomeView