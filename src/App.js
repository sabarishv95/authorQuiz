import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { authors, getTurnData } from './authorData';

// Header Component

function Header() {
  return (
    <Row>
      <Jumbotron className="container-fluid">
        <Col sm={{ size: 10, offset: 1 }}>
          <h1>Author Quiz</h1>
          <p>Select the book written by the author shown</p>
        </Col>
        <button className='btn btn-warning'>
          <Link to='/add'>Add an author</Link>
        </button>
      </Jumbotron>
    </Row>
  );
}

// Turn component

function Turn({ author, books, highlight, checkedAnswer, bookClicked, onContinue }) {

  return (
    <Row className="turn" style={{ backgroundColor: 'white' }}>
      <Col sm={{ size: 4, offset: 1 }} style={{ height: '600px' }}>
        <img src={author.imageUrl} className="author-image img-responsive" alt="Author" />
      </Col>
      <Col sm={{ size: 6 }}>
        {books.map((title) =>
          <Book title={title} key={title} highlight={highlight} clicked={bookClicked} onClickAnswer={() => checkedAnswer(title)} />
        )
        }
        <Continue show={highlight === 'right'} onContinue= {onContinue}/>
      </Col>
    </Row>
  )
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.string.isRequired,
  checkedAnswer: PropTypes.func.isRequired,
  onContinue: PropTypes.func,
  bookClicked: PropTypes.string.isRequired
}

// Continue Component

function Continue({ show, onContinue }) {
  return (
    show ?
      <div>
        <button className='btn btn-success' onClick= {onContinue}>Continue</button>
      </div> : null
  )
}

// Footer Component

function Footer() {
  return (
    <Row id="footer" className="mt-5">
      <Col sm={{ size: 12 }}>
        <p className="text-muted credit">All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">wikemedia commons</a> and are in the public domain.</p>
      </Col>
    </Row>
  );
}

// Book Component

function Book({ title, highlight, onClickAnswer, clicked }) {

  function highlightBGColor(highlight) {
    const colors = {
      'none': '#f0f7fd',
      'right': 'green',
      'wrong': 'red'
    }
    return colors[highlight]
  }

  return (
    <div className="answer" onClick={onClickAnswer} style={{ backgroundColor: clicked !== title ? highlightBGColor('') : highlightBGColor(highlight) }}>
      <h4>{title}</h4>
    </div>
  )
}

// App Component

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      highlight: 'none',
      answerClicked: '',
      question: this.props.turnData
    }
    this.CheckingAnswer = this.CheckingAnswer.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  CheckingAnswer(title) {
    if (this.state.question.author.books.indexOf(title) !== -1) {
      this.setState({
        highlight: 'right',
        answerClicked: title
      })
    }
    else {
      this.setState({
        highlight: 'wrong',
        answerClicked: title
      })
    }
  }

  onContinue() {
    this.setState({
      highlight: 'none',
      answerClicked: '',
      question: getTurnData(authors)
    })
  }

  render() {
    return (
      <Container fluid>
        <div className="App">
          <Header />
          <Turn {...this.state.question} highlight={this.state.highlight} bookClicked={this.state.answerClicked} checkedAnswer={this.CheckingAnswer} onContinue={this.onContinue}/>
          <Footer />
        </div>
      </Container>
    );
  }
}

export default App;
