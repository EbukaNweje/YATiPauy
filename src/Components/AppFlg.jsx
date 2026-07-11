import React from "react";
import Img from "../assets/Screenshot 2023-12-30 024845.png";

const AppFlg = () => {
  return (
    <div className="ScameBody">
      <div className="ScameWrapper">
        <img src={Img} alt="" />
        {/* <img src="./Screenshot 2023-12-30 024845.png" alt="" width="80px"> */}
        {/* <RiAlertFill className='Al'/>  */}
        <span className="Top">The site ahead contains malware</span>
        <p className="Text">
          Attackers currenty on <b>yati</b> might attempt to install <br />
          dangerous programs on your computer that steal or delete your
          information (for example, fake payment method, passwords, photos,
          messages).
          <span className="Learn">
            <a
              href="https://support.google.com/chrome/answer/99020?visit_id=638395214883046500-4050229814&p=cpn_safe_browsing&hl=en&rd=1"
              style={{ color: "rgb(221, 221, 221)", textDecoration: "none" }}
            >
              Learn more
            </a>
          </span>
        </p>

        <div className="LastDiv">
          <a
            href="https://testsafebrowsing.appspot.com/s/phishing.html"
            style={{ textDecoration: "none" }}
          >
            <div className="Btn">Details</div>
          </a>

          <a href="https://www.google.com/" style={{ textDecoration: "none" }}>
            <div className="Btn2">Back to safety</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppFlg;
