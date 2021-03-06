import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    addPostHandler = () => {
        const post = { ...this.state };
        axios.post('/posts', post)
            .then(
                response => {
                    console.log(response);
                    this.setState({
                        title: '',
                        content: '',
                        author: 'Max',
                        submitted: true
                    });
                }
            );
    }

    render() {
        let redirectTo = null;
        if (this.state.submitted) {
            redirectTo = <Redirect to="/posts"/>;
        }
        
        return (
            <div className="NewPost">
                {redirectTo}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.addPostHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;