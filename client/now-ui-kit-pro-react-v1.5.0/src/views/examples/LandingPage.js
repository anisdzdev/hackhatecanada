import React from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Form,
} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import FooterDefault from "components/Footers/FooterDefault.js";

function LandingPage() {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [expression, setExpression] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    addHateExpression(expression).then((value) => {
      setSuccess(true)
      console.log(value)
    }, (error) => {
      console.log(error.response.data)
      if(error.response.data)
        setError(error.response.data)
      else
        setError('Something went wrong')
    });
  }

  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">Who are we?</h2>
                <h5 className="description">
                  We are 5 Software Engineering that are looking to deepen their hard skills by developing an application that will help to fight for a good cause. Our team being mostly composed of visible minorities, we have had our fair share of hate speech. Fortunately, we possess tech-based skills that allow us to fight back and create solutions that prevent hate speech.
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
        <div
          className="testimonials-1 section-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg19.png").default + ")",
          }}
        >
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <h2 className="title">Want to help us on our fight against hate speech?</h2>
                <h4 className="description text-white">
                  You can suggest some hate terms that you find offensive. That would help us a lot!
                  {/* Even with our vast database of hate speech terms, your help could contribute to stop the spread of hate speech online! */}
                </h4>
              </Col>
            </Row>
            {(!success) ?
                <Form>
                  <Row style={{justifyContent: "center"}}>
                    <Input
                        placeholder="What do you consider offensive..."
                        type="text"
                        style={{backgroundColor: "white", padding: "15px", fontSize: "1.25em", width: "50%"}}
                        onChange={(e) => setExpression(e.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </Row>
                  {(error) &&
                    <Row style={{justifyContent: "center"}}>
                    <span className="text-danger">{error}</span>
                  </Row>
                  }
                  <Row style={{justifyContent: "center"}}>
                    <Button
                        block
                        className="btn-round"
                        style={{width: "20%", margin: '30px 1px'}}
                        onClick={(e) => {
                          onSubmit(e);
                        }}
                        color="info"
                        type="submit"
                        size="lg">
                      Send
                    </Button>
                  </Row>
                </Form>
                :
                <Row style={{justifyContent: "center"}}>
                  <h4 className="description text-success">
                    Thank you for your collaboration !
                  </h4>
                </Row>
            }

          </Container>
        </div>

        <div className="section section-contact-us text-center">
          <Container>
            <h2 className="title">Want to have access to our API?</h2>
            <p className="description">We have plans for that. Feel free to contact us.</p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    firstFocus ? "input-lg input-group-focus" : "input-lg"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    emailFocus ? "input-lg input-group-focus" : "input-lg"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email Here..."
                    type="text"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  ></Input>
                </InputGroup>
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="name"
                    placeholder="Type a message..."
                    rows="4"
                    type="textarea"
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Send Message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <FooterDefault />
      </div>
    </>
  );
}

function addHateExpression(expression) {
  return axios.post("http://localhost:5000/ai/add_expression", {expression});
}

export default LandingPage;
