import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { useDeleteHourMutation, useHoursQuery } from "../../generated/graphql";
import HourList from "./HourList";

interface Props {
  user: any;
}

const HourContainer: React.FC<Props> = ({ user }) => {
  const { isLoading, isError, data, error, refetch } = useHoursQuery({});

  const { mutate } = useDeleteHourMutation({
    onSuccess: (res) => {
      refetch();
      toast.success(`Successfully deleted record! Date: ${res?.deleteHour.date}`)
    },
    onError: (err: any) => {
        const errorMsg = String(err).split(":")[1];
        toast.error(`${errorMsg}`)
    }
  });

  function onDelete(_id: string) {
    mutate({ id: _id });
  }

  if (isLoading) {
    <div className="overlay-loading loading">
      <Image
        src="/images/layout/loader.svg"
        alt="Loading..."
        width={60}
        height={60}
      />
    </div>;
  }

  if (isError) {
    return <span>Error: Hours</span>;
  }
  return (
    <Container className="list-conatiner">
      {data && <HourList hours={data.hours} user={user} onDelete={onDelete}/>}
    </Container>
  );
};

export default HourContainer;
