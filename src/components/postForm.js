import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {createPost, fetchPosts, updatePost} from "../actions";

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            postTitle: "",
            imageUrl: "",
            postSummary: ""
        };
        this.formInputHandler = this.formInputHandler.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log('this is formData');
        if (props.formData) {
            this.setState({
                postTitle: props.formData.title,
                imageUrl: props.formData.imageUrl,
                postSummary: props.formData.summary

            });

        }
    }


    onSubmit() {
        const data = {
            title: this.state.postTitle,
            imageUrl: this.state.imageUrl,
            summary: this.state.postSummary
        };

        console.warn(data);

        this.props.toggleModal();

        switch (this.props.modalAction) {
            case 'EDIT':
                this.props.updatePost(this.props.postId, data);
            case 'CREATE':
                this.props.createPost(data);

        }
    }


    formInputHandler(event) {
        console.log(event.target.id + ' = ' + event.target.value);
        this.setState({[event.target.id]: event.target.value});
    }

    render() {
        const {handleSubmit} = this.props;


        return (
            <Form method="post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <FormGroup>
                    <Input type="text" name="post-title"
                           id="postTitle"
                           placeholder="Enter post title"
                           value={this.state.postTitle}
                           onChange={this.formInputHandler}/>
                </FormGroup>


                <FormGroup>
                    <Input type="text" name="image-url" id="imageUrl" placeholder="Post image URL"
                           value={this.state.imageUrl} onChange={this.formInputHandler}/>
                </FormGroup>

                <FormGroup>
                    <Input type="textarea" rows="6" name="post-summary" id="postSummary" placeholder="Enter summary"
                           value={this.state.postSummary} onChange={this.formInputHandler}/>
                </FormGroup>


                <Button className="main-button-style" id="btn-submit-form">Submit</Button>
            </Form>
        )
    }
}

export default reduxForm({
    form: 'PostsNewForm'
})(
    connect(null, {updatePost, fetchPosts, createPost })(PostForm)
);
