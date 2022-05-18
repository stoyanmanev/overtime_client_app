import Head from "next/head";
import Image from "next/image";
import {useState} from 'react';
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../generated/graphql";
import AuthLogout from "../Auth/AuthLogout";
import Modal from "react-modal";
import ReactModal from "react-modal";
import UserInformation from "../UserInformation";

interface Props {
  children?: React.ReactNode;
  user: User;
  setforceRender: (boolean: boolean) => void;
}

const Layout: React.FC<Props> = ({ children, user, setforceRender }) => {

  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (typeof window !== "undefined") {
    ReactModal.setAppElement("body");
  }

  return (
    <>
      <Head>
        <title>Overtime Client App</title>
        <meta
          name="description"
          content="Record each additional hour you worked!"
        />
        <meta name="thumbnail" content="/images/social_branding.png"></meta>
        <meta name="author" content="Stoyan Manev"></meta>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0"
        ></meta>
        <meta name="theme-color" content="#30529D"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {user && (
          <Container className="header-conatiner">
            <Row className="header-row">
              <div className="left-side">
                <div className="branding-conatiner">
                  <Image
                    src="/images/layout/branding.png"
                    alt="Loading..."
                    width={173}
                    height={73}
                  />
                </div>
              </div>
              <div className="right-side">
                <span className="username" onClick={() => setIsOpen(true)}>{user.username}</span>
                <AuthLogout user={user} setforceRender={setforceRender} />
              </div>
            </Row>
          </Container>
        )}
      </header>
      <main>
        <Container>
          <Row className="justify-content-center">
            <Col>{children}</Col>
          </Row>
        </Container>
      </main>
      <footer></footer>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="profile-controler modal-window"
        >
         <Badge className="headline-badge">Profile Controller</Badge>
         <UserInformation user={user}/>
         <Button className="close-modal-btn" onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </Modal>
    </>
  );
};

export default Layout;
