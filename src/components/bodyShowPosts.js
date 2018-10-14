import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, Button} from 'reactstrap';
import ModalForm from './modalForm';
import {deletePost, fetchPosts} from "../actions";
import Header from "./header";

class BodyShowPosts extends Component {

    state = {
        modalOpen: false,
        modalAction: ""
    };

    componentDidMount() {
        this.props.fetchPosts();
    }

    toggleModal = () => {
        return new Promise((resolve, reject) => {
            this.setState({
                modalOpen: !this.state.modalOpen
            }, () => resolve());
        })
    }

    openEditModal = (id) => {
        this.setState({
            modalAction: 'EDIT',
            postId: id
        })
        this.openModal()
    }

    openCreateModal = () => {
        this.setState({
            modalAction: 'CREATE',
            postId: null
        })
        this.openModal()
    };

    openModal = () => {
        this.setState({
            modalOpen: true
        })
    };

    deletePost(id) {
        this.props.deletePost(id);
    }

    renderPosts() {
        return _.map(this.props.posts, (post, id) => {
            return (
                <Row key={id} className="post-row">
                    <Col xs="12" sm="12" md="4" lg="4" className="no-padding-right no-padding-left">
                        <img className="post-img"
                             src={(post && post.imageUrl) ? post.imageUrl : ''}
                             alt=""/>
                    </Col>
                    <Col xs="12" sm="12" md="8" lg="8"
                         className="secondary-background-color post-content no-padding-right">
                        <Row>
                            <Col xs="6">
                                <p className="post-date">{(post && post.postDate) ? post.postDate : ''}</p>
                            </Col>
                            <Col xs="6" className="no-padding-right">
                                <div className="btn-container main-button-style">
                                    <Button
                                        className="btn-edit-post main-button-style"
                                        onClick={() => {
                                            this.openEditModal(id)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button className="btn-delete-post main-button-style"
                                            onClick={() => {
                                                this.deletePost(id)
                                            }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <h2 className="post-title">{(post && post.title) ? post.title : ''}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <p className="post-description">{(post && post.summary) ? post.summary : ''}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )
        });

    }

    render() {
        return (
            <div>
                <Header openCreateModal={this.openCreateModal}
                        toggleModal={this.toggleModal}
                />
                <div className="posts-container">
                    <Container>
                        {this.renderPosts()}
                    </Container>
                    <ModalForm postId={this.state.postId}
                               toggleModal={this.toggleModal}
                               modalAction={this.state.modalAction}
                               modalOpen={this.state.modalOpen}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts, deletePost})(BodyShowPosts);
