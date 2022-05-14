
import Head from "next/head";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { User } from "../../generated/graphql";
import AuthLogout from "../Auth/AuthLogout";

interface Props {
  children?: React.ReactNode;
  user: User;
  setforceRender: (boolean: boolean) => void
}

const Layout: React.FC<Props> = ({ children, user, setforceRender }) => {
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
              <div className="branding-conatiner">
                <Image
                  src="/images/layout/branding.png"
                  alt="Loading..."
                  width={173}
                  height={73}
                />
              </div>
              <AuthLogout user={user} setforceRender={setforceRender}/>
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
    </>
  );
};

export default Layout;
