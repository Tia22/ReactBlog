import React, {Component} from 'react';
import {Container, Row, Col, Button, Jumbotron} from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <div>
                <Jumbotron className="main-backgrund-color">
                    <Container>
                        <Row>
                            <Col xs="12">
                                <img className="checkout-logo" src="../../img/logo.svg" alt="checkout_logo"/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" sm="8" md="8" lg="6" xl="6">
                                <h1 className="display-4">Latest Blog Post</h1>
                            </Col>
                            <Col xs="12" sm="4" md="4" lg="6" xl="6" className="add-post-container">
                                <Button className="main-button-style btn-add-post"
                                        onClick={() => {
                                            this.props.openCreateModal()
                                        }}>
                                    Add post
                                </Button>
                            </Col>
                        </Row>

                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default Header;