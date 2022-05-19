import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useLogoutMutation, User } from "../../generated/graphql";

interface Props {
  user: User;
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
