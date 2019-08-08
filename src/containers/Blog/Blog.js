import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render() {
        const posts = this.state.posts.map(
            post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    selected={() => this.postSelectedHandler(post.id)} />
            }
        );

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }

    componentDidMount() {
        axios.get('http://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // query the response data (posts in this case), transform it, and then store it in the component's state to cause a re-render
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(
                    post => {
                        return {
                            ...post,
                            author: 'Max'
                        }
                    }
                );
                this.setState({ posts: updatedPosts });
            });
    }
}

export default Blog;