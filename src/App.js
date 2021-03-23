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

function calculateCollision(ball, rect) {
  const ballLeft = ball.x - ball.width;
  const ballRight = ball.x + ball.width;
  const ballTop = ball.y - ball.height;
  const ballBot = ball.y + ball.height;
  const rectLeft = rect.x;
  const rectRight = rect.x + rect.width;
  const rectTop = rect.y;
  const rectBot = rect.y + rect.height;
  return (ballLeft < rectRight
  && ballRight > rectLeft
&& ballTop < rectBot
&& ballBot > rectTop);
}

const formulas = [
  {
    label: ' --- Select a formula --- ',
    render: () => (
      <p />
    ),
  },
  {
    label: 'Left side of a circle',
    render: (ballX, ballY, ballRadius) => (
      <p>
        <b> ball X - ball radius</b>
        <br />
        <b>
          {' '}
          {ballX}
          {' '}
          -
          {' '}
          {ballRadius}
          {' '}
          =
          {' '}
          {ballX - ballRadius}
        </b>
      </p>
    ),
  },
  {
    label: 'Right side of a circle',
    render: (ballX, ballY, ballRadius) => (
      <p>
        <b> ball X + ball radius</b>
        <br />
        <b>
          {' '}
          {ballX}
          {' '}
          +
          {' '}
          {ballRadius}
          {' '}
          =
          {' '}
          {ballX + ballRadius}
        </b>
      </p>
    ),
  },
  {
    label: 'Top side of a circle',
    render: (ballX, ballY, ballRadius) => (
      <p>
        <b> ball Y - ball radius</b>
        <br />
        <b>
          {' '}
          {ballY}
          {' '}
          -
          {' '}
          {ballRadius}
          {' '}
          =
          {' '}
          {ballY - ballRadius}
        </b>
      </p>
    ),
  },
  {
    label: 'Bottom side of a circle',
    render: (ballX, ballY, ballRadius) => (
      <p>
        <b> ball Y + ball radius</b>
        <br />
        <b>
          {' '}
          {ballY}
          {' '}
          +
          {' '}
          {ballRadius}
          {' '}
          =
          {' '}
          {ballY + ballRadius}
        </b>
      </p>
    ),
  },
  {
    label: 'Right side of a rectangle',
    render: (ballX, ballY, ballRadius, rectX, rectY, rectWidth) => (
      <p>
        <b> rect X + rect width</b>
        <br />
        <b>
          {' '}
          {rectX}
          {' '}
          +
          {' '}
          {rectWidth}
          {' '}
          =
          {' '}
          {rectX + rectWidth}
        </b>
      </p>
    ),
  },
  {
    label: 'Bottom side of a rectangle',
    render: (ballX, ballY, ballRadius, rectX, rectY, rectWidth, rectHeight) => (
      <p>
        <b> rect Y + rect height</b>
        <br />
        <b>
          {' '}
          {rectY}
          {' '}
          +
          {' '}
          {rectHeight}
          {' '}
          =
          {' '}
          {rectY + rectHeight}
        </b>
      </p>
    ),
  },
  {
    label: 'Horizontal center of a rectangle',
    render: (ballX, ballY, ballRadius, rectX, rectY, rectWidth) => (
      <p>
        <b> rect X + rect width / 2</b>
        <br />
        <b>
          {' '}
          {rectX}
          {' '}
          +
          {' '}
          {rectWidth / 2}
          {' '}
          =
          {' '}
          {rectX + rectWidth / 2}
        </b>
      </p>
    ),
  },
  {
    label: 'Vertical center of a rectangle',
    render: (ballX, ballY, ballRadius, rectX, rectY, rectWidth, rectHeight) => (
      <p>
        <b> rect Y + rect height / 2</b>
        <br />
        <b>
          {' '}
          {rectY}
          {' '}
          +
          {' '}
          {rectHeight / 2}
          {' '}
          =
          {' '}
          {rectY + rectHeight / 2}
        </b>
      </p>
    ),
  },
  {
    label: 'Collision between two rectangles',
    render: (ballX, ballY, ballRadius, rectX, rectY, rectWidth, rectHeight) => (
      <p>
        (the circle is treated as a rectangle)
        <br />
        <b>
          {'circleLeftSide < rectRightSide'}
          <br />
          {' && circleRightSide > rectLeftSide'}
          <br />
          {' && circleTopSide < rectBottomSide'}
          <br />
          {' && circleBottomSide > rectTopSide'}
        </b>
        <br />
        <b>
          {ballX - ballRadius}
          {' '}
          &#60;
          {' '}
          {rectX + rectWidth}
          <br />
          {' && '}
          {ballX + ballRadius}
          {' '}
          &#62;
          {' '}
          {rectX}
          <br />
          {' && '}
          {ballY - ballRadius}
          {' '}
          &#60;
          {' '}
          {rectY + rectHeight}
          <br />
          {' && '}
          {ballY + ballRadius}
          {' '}
          &#62;
          {' '}
          {rectY}
          <br />
        </b>
        {' '}
        =
        {' '}
        <b>
          {calculateCollision({
            x: ballX, y: ballY, width: ballRadius, height: ballRadius,
          }, {
            x: rectX, y: rectY, width: rectWidth, height: rectHeight,
          }).toString()}
        </b>
      </p>
    ),
  },
];

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
      formula: 0,
    };
  }

  getProps(changes) {
    const propsCopy = {};
    Object.assign(propsCopy, this.props);
    Object.assign(propsCopy, changes);
    return propsCopy;
  }

  render() {
    const {
      formula,
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
        <div id="header">
          <h1>Canvas laboratory</h1>
        </div>
        <div id="gamePanel">
          <Container fluid>
            <Row id="inputsRow">
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
                <Form.Label>Formulas</Form.Label>
                <Form.Control
                  as="select"
                  value={formulas[formula].label}
                  onChange={(e) => {
                    this.setState({ formula: e.target.selectedIndex });
                  }}
                >
                  {
                    formulas.map((elt) => <option>{elt.label}</option>)
                  }
                </Form.Control>
                <Jumbotron class="jumbotron">
                  {formulas[formula].render(
                    ballX,
                    ballY,
                    ballRadius,
                    rectX,
                    rectY,
                    rectWidth,
                    rectHeight,
                  )}
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
