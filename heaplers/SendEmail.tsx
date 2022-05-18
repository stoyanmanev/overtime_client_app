import emailjs from "@emailjs/browser";


const emailSending = async (user: string, email: string, password: string) => {
  const template: any = {
    user_name: user,
    user_email: email,
    password: password,
  };
  const isEmailSend = await emailjs
    .send(
      "service_8hc2buq",
      "template_883gvt8",
      template,
      "user_Cr6Qp54sK2BTfTjQGArlk"
    )
    .then(
      function () {
        return true;
      },
      function (err) {
        return false;
      }
    );

  return isEmailSend;
};

export default emailSending;

