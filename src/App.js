import React from 'react';
import Button from 'react-bootstrap/Button';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

function NumberField(props) {
  const {
    label,
    ariaLabel,
    number,
    onChange,
  } = props;
  return (
    <InputGroup className="inputs">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon2">{label}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        disabled={false}
        type="number"
        onChange={(e) => {
          onChange(e);
        }}
        value={number}
        aria-label={ariaLabel}
      />
    </InputGroup>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      french: false,
    };
  }

  componentDidMount() {
    const language = navigator.language || navigator.userLanguage;
    this.setState({ french: language === 'fr' });
  }

  getProps(changes) {
    const propsCopy = {};
    Object.assign(propsCopy, this.props);
    Object.assign(propsCopy, changes);
    return propsCopy;
  }

  render() {
    const {
      french,
    } = this.state;
    const {
      ballX,
      ballY,
      ballRadius,
      rectX,
      rectY,
      rectWidth,
      rectHeight,
      updateProps,
    } = this.props;
    return (
      <div id="app">
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Brand>
              <Button
                id="langBtn"
                variant={french ? 'warning' : 'light'}
                onClick={() => {
                  this.setState({
                    french: true,
                  });
                }}
              >
                <Image src="./frFlag.png" fluid />
              </Button>
            </Navbar.Brand>
            <Navbar.Brand>
              <Button
                id="langBtn"
                variant={!french ? 'warning' : 'light'}
                onClick={() => {
                  this.setState({
                    french: false,
                  });
                }}
              >
                <Image src="./brFlag.png" fluid />
              </Button>
            </Navbar.Brand>
            <Nav.Link href="#">Learn more</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <div id="header">
          <h1>Canvas laboratory</h1>
        </div>
        <div id="gamePanel">
          <Container fluid>
            <Row id="initRow">
              <Col>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Form.Group>
                    <NumberField
                      label="Ball X"
                      ariaLabel="ball horizontal position"
                      onChange={(e) => {
                        updateProps(this.getProps({ ballX: parseInt(e.target.value, 10) }));
                      }}
                      number={ballX}
                    />
                    <NumberField
                      label="Ball Y"
                      ariaLabel="ball vertical position"
                      onChange={(e) => {
                        updateProps(this.getProps({ ballY: parseInt(e.target.value, 10) }));
                      }}
                      number={ballY}
                    />
                    <NumberField
                      label="Ball radius"
                      ariaLabel="ball radius"
                      onChange={(e) => {
                        updateProps(this.getProps({ ballRadius: parseInt(e.target.value, 10) }));
                      }}
                      number={ballRadius}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Form.Group>
                    <NumberField
                      label="Rectangle X"
                      ariaLabel="rectangle horizontal position"
                      onChange={(e) => {
                        updateProps(this.getProps({ rectX: parseInt(e.target.value, 10) }));
                      }}
                      number={rectX}
                    />
                    <NumberField
                      label="Rectangle Y"
                      ariaLabel="rectangle vertical position"
                      onChange={(e) => {
                        updateProps(this.getProps({ rectY: parseInt(e.target.value, 10) }));
                      }}
                      number={rectY}
                    />
                    <NumberField
                      label="Rectangle width"
                      ariaLabel="rectangle width"
                      onChange={(e) => {
                        updateProps(this.getProps({ rectWidth: parseInt(e.target.value, 10) }));
                      }}
                      number={rectWidth}
                    />
                    <NumberField
                      label="Rectangle height"
                      ariaLabel="rectangle height"
                      onChange={(e) => {
                        updateProps(this.getProps({ rectHeight: parseInt(e.target.value, 10) }));
                      }}
                      number={rectHeight}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Jumbotron class="jumbotron">
                  <p>
                    Left side of a circle :
                    <b> ball X - ball radius = </b>
                    {ballX - ballRadius}
                  </p>
                  <p>
                    Right side of a circle :
                    <b> ball X + ball radius = </b>
                    {ballX + ballRadius}
                  </p>
                  <p>
                    Top side of a circle :
                    <b> ball Y - ball radius = </b>
                    {ballY - ballRadius}
                  </p>
                  <p>
                    Bottom side of a circle :
                    <b> ball Y + ball radius = </b>
                    {ballY + ballRadius}
                  </p>
                </Jumbotron>
              </Col>
              <Col>
                <Jumbotron class="jumbotron">
                  <p>
                    Right side of a rectangle :
                    <b> rect X + rect width = </b>
                    {rectX + rectWidth}
                  </p>
                  <p>
                    Bottom side of a rectangle :
                    <b> rect Y + rect height = </b>
                    {rectY + rectHeight}
                  </p>
                  <p>
                    Horizontal center of a rectangle :
                    <b> rect X + rect width / 2 = </b>
                    {rectX + rectWidth / 2}
                  </p>
                  <p>
                    Vertical center of a rectangle :
                    <b> rect Y + rect height / 2 = </b>
                    {rectY + rectHeight / 2}
                  </p>
                </Jumbotron>
              </Col>
            </Row>
          </Container>

        </div>
      </div>
    );
  }
}
App.propTypes = {
  ballX: PropTypes.number.isRequired,
  ballY: PropTypes.number.isRequired,
  ballRadius: PropTypes.number.isRequired,
  rectX: PropTypes.number.isRequired,
  rectY: PropTypes.number.isRequired,
  rectWidth: PropTypes.number.isRequired,
  rectHeight: PropTypes.number.isRequired,
  updateProps: PropTypes.func.isRequired,
};
App.defaultProps = {

};
