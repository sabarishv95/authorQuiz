import React, { Component } from 'react';
import './AddAuthorForm.css'
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { authors } from './authorData';

export class AddAuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleAddAuthor = this.handleAddAuthor.bind(this);
    }

    onFieldChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleAddBook() {
        this.setState({
            books: this.state.books.concat(this.state.bookTemp),
            bookTemp: ''
        })
    }

    handleAddAuthor(e) {
        e.preventDefault();
        let author = this.state;
        author.imageSource = 'Wikemedia commons'
        delete author.bookTemp;
        authors.push(author);
        this.props.history.push('/')
    }

    render() {
        return (
            <Jumbotron>
                <Container>
                    <Row>
                        <Col sm='12'>
                            <h1 className="text-center mb-5">
                                Add Author
                            </h1>
                        </Col>
                        <Col sm='12'>
                            <form className="form-row" onSubmit={this.handleAddAuthor}>
                                <Col sm='12' className='mb-2'>
                                    <label className="pl-0 font-weight-bold col-md-12" htmlFor='name'>Name:</label>
                                    <input id="name" type='text' name='name' value={this.state.name} onChange={this.onFieldChange}></input>
                                </Col>
                                <Col sm='12' className='mb-2'>
                                    <label className="pl-0 font-weight-bold col-md-12" htmlFor='imageUrl'>ImageUrl:</label>
                                    <input id="imageUrl" type='text' name='imageUrl' value={this.state.imageUrl} onChange={this.onFieldChange}></input>
                                </Col>
                                <Col sm='12' className='mb-2'>
                                    <label className="pl-0 font-weight-bold col-md-12" htmlFor='bookTemp'>Books:</label>
                                    {this.state.books.map((book)=> <p key={book}>{book}</p>)}
                                    <input id="bookTemp" type='text' name='bookTemp' value={this.state.bookTemp} onChange={this.onFieldChange}></input>
                                    <input className="ml-2" type='button' value='+' onClick={this.handleAddBook}></input>
                                </Col>
                                <input className='ml-1 mt-2 btn btn-success' type='submit' value='Submit'></input>
                            </form>
                        </Col>
                    </Row>
                </Container >
            </Jumbotron >
        );
    }
}