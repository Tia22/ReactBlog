import React, {Component} from 'react';
import {Modal, ModalBody} from 'reactstrap';
import PostForm from "./postForm";
import {connect} from "react-redux";
import {fetchPost} from "../actions";


class ModalForm extends Component {

    state = {
        postId: null,
        open: false,
        post: null
    };

    componentWillReceiveProps(props) {
        this.setState({
            open: props.modalOpen
        })
    }

    modalIsOpen = () => {
        if (this.props.modalAction === 'EDIT') {
            this.props.fetchPost(this.props.postId).then(
                () => {
                    this.setState({
                        post: this.props.post
                    })
                }
            );
        }
    }


    toggleModal = () => {
        this.props
            .toggleModal()
            .then(() => {
                    if (!this.props.modalOpen) {
                        this.clearState();
                    }
                }
            );
    }

    clearState = () => {
        this.setState({
            postId: null,
            open: false,
            post: null
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.modalOpen}
                   toggle={this.toggleModal}
                   onOpened={this.modalIsOpen}
            >
                <ModalBody>

                    {this.props.modalAction === 'EDIT' && !this.state.post ? '... Loading ...' : ''}

                    <div className={this.props.modalAction === 'EDIT' && !this.state.post ? 'hidden' : ''}>
                        <PostForm formData={this.state.post}
                                  postId={this.props.postId}
                                  toggleModal={this.toggleModal}
                                  modalAction={this.props.modalAction}
                        />
                    </div>
                </ModalBody>
            </Modal>
        )
    }


}

function mapStateToProps({posts}) {
    return {post: posts['postData']};
}

export default connect(mapStateToProps, {fetchPost})(ModalForm);