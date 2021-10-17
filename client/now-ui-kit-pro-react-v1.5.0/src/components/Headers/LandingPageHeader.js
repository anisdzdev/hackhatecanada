import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-small" style={{height: '80vh'}}>
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg26.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">Hate Speech Scanner</h1>
            <div className="text-center">
              <h3>The Google Chrome Extension that makes you aware of hate speech on the internet</h3>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
