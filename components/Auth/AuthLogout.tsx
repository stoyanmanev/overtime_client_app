import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useLogoutMutation } from "../../generated/graphql";
import CurrentUser from "../../interfaces/CurrectUser";

interface Props {
  user: CurrentUser;
  refetch: any;
}

const AuthLogout: React.FC<Props> = ({ user, refetch }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mutate } = useLogoutMutation({
    onSuccess: (data) => {
      removeCookie("token");
      refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const logout = async () => {
    await mutate({});
  };
  return (
    <Button onClick={logout} className="logout-btn">
      <FontAwesomeIcon icon={faRightFromBracket} />
    </Button>
  );
};

export default AuthLogout;
