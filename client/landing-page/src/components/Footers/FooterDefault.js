/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function FooterDefault() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <span>
                  Novem
                </span>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
            <a
              href="https://www.novem.dev"
              target="_blank"
            >
              Novem
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default FooterDefault;
