import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useCurrentUserQuery } from "../generated/graphql";
import DefaultLayout from "../components/Layout/DefaultLayout";
import AuthContainer from "../components/Auth/AuthContainer";
import HourContainer from "../components/Hour/HourContainer";
import HourForm from "../components/Hour/HourForm";
import HoutStatisticContainer from "../components/Hour/HourStatisticContainer";


const Home: NextPage = () => {
  const { isLoading, isError, data, error, refetch } = useCurrentUserQuery(
    {},
    { refetchOnWindowFocus: false }
  );
  
  const [user, setUser] = useState({});
  const [forceRender, setforceRender] = useState(false);

  console.log(forceRender)
  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="overlay-loading loading">
          <Image
            src="/images/layout/loader.svg"
            alt="Loading..."
            width={60}
            height={60}
          />
        </div>
      </DefaultLayout>
    );
  }

  if (isError) {
    return (
      <DefaultLayout>
        <AuthContainer setUser={setUser} />
      </DefaultLayout>
    );
  }
  if (data?.currentUser && Object.entries(user).length === 0) {
    setUser(data);
  }

  return (
    <div>
      <DefaultLayout user={data?.currentUser} setforceRender={setforceRender}>
        <Container className="main-mt">
          <Row>
            <Col lg={4}>
              <HourForm/>
              <HoutStatisticContainer user={data?.currentUser}/>
            </Col>
            <Col lg={8}>
              <HourContainer user={data?.currentUser} />
            </Col>
          </Row>
        </Container>
        <ToastContainer
          position="bottom-left"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </DefaultLayout>
    </div>
  );
};

export default Home;
