import { useState } from "react";
import Image from "next/image";
import { Badge, Container } from "react-bootstrap";
import { useHoursQuery, User } from "../../generated/graphql";
import HourFormStatistic from "./HourFormStatictic";

interface Props {
  user: any;
}

const HoutStatisticContainer: React.FC<Props> = ({ user }) => {
  const [ collectionHours, setCollectionHours ] = useState('00:00');
  const { isLoading, isError, data, error, refetch } = useHoursQuery({});

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
    return <span>Monthly statistics</span>;
  }

  const userHoursList = data?.hours.filter(
    (hour) => hour.createdBy === user._id
  );

  return (
    <Container className="statistic-conatiner">
      <div className="headline">Monthly statistics</div>
      <div>
        <HourFormStatistic hours={userHoursList} setCollectionHours={setCollectionHours}/>
      </div>
      <div className="all-hours-month">
        <span>Extraordinary hours per month: </span>
        <Badge className="overtime-hours">{collectionHours}</Badge>
      </div>
    </Container>
  );
};

export default HoutStatisticContainer;
