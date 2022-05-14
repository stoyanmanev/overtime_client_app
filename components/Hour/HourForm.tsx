import { faCalendarCheck, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useCreateHourMutation, useHoursQuery } from "../../generated/graphql";

const HourForm: React.FC = () => {
  const [date, setDate] = useState("");
  const [overtime, setOvertime] = useState("");
  const { refetch } = useHoursQuery({});
  const {mutate} = useCreateHourMutation({
      onSuccess: (res) => {
        toast.info(`Record for ${res.createHour.date} is created`)
        refetch();
      },
      onError:(err) => {
        const errorMsg = String(err).split(":")[1];
        toast.error(`${errorMsg}`)
      }
  })

  const setNowDate = () => {
    const dateNow = new Date(Date.now()).toJSON().slice(0, 10);
    setDate(dateNow);
  };

  const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setOvertime(e.target.value);
  }

const submitHourForm = (e: any) => {
    e.preventDefault();
    mutate({data:{date: date, value: parseInt(overtime)}})
}

  return (
    <Container className="form-container mb-4">
      <div className="headline">Create Overtime Record</div>
      <Form onSubmit={submitHourForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date: </Form.Label>
          <Form.Control
            className="mb-2"
            type="date"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter date"
          />
          <Button onClick={setNowDate} className="icon-button">
            set today
            <FontAwesomeIcon icon={faCalendarCheck} />
          </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Overtime: </Form.Label>
          <Form.Select onChange={(e) => changeSelect(e)} aria-label="Default select example">
            <option>-----</option>
            <option value="10">00:10</option>
            <option value="20">00:20</option>
            <option value="30">00:30</option>
            <option value="40">00:40</option>
            <option value="50">00:50</option>
            <option value="60">01:00</option>
            <option value="70">01:10</option>
            <option value="80">01:20</option>
            <option value="90">01:30</option>
            <option value="100">01:40</option>
            <option value="110">01:50</option>
            <option value="120">02:00</option>
            <option value="130">02:10</option>
            <option value="140">02:20</option>
            <option value="150">02:30</option>
            <option value="160">02:40</option>
            <option value="170">02:50</option>
            <option value="180">03:00</option>
            <option value="190">03:10</option>
            <option value="200">03:20</option>
            <option value="210">03:30</option>
            <option value="220">03:40</option>
            <option value="230">03:50</option>
            <option value="240">04:00</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Form>
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
    </Container>
  );
};

export default HourForm;
