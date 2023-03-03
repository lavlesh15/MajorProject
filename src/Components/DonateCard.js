import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AttachmentIcon from "@mui/icons-material/Attachment";
import "../styles/donateCard.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
};

function DonateCard({
  id,
  name,
  phone,
  email,
  desc,
  posterUrl,
  documentUrl,
  cause,
  detail,
  isApproved,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let user = JSON.parse( sessionStorage.getItem('user'))


  const handleApprove = async () => {
    const res = await axios
      .put(`http://localhost:4000/api/donation/${id}`)
      .then((res) => {
        setOpen(false);
        toast.success(`${name} Application Approved.`);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    Navigate("/Donate");
  };

  const handleReject = () => {
    toast.success(`${name} Application Rejected`)
  }

  const handleDonate = () => {
    alert('Redirecting to Donation page');
  }

  return (
    <div className="donate-card-main">
      <div className="status">
        <small className={isApproved ? "approvedCard" : "rejectedCard"}>
          {isApproved ? "Approved" : "Not Verified"}
        </small>
      </div>

      <img src={posterUrl} alt="Poster" />
      <h2> {name}</h2>
      <p>{desc}</p>

      <Button onClick={handleOpen}>Read More</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-main">
            <div className="modal-upper">
              <div className="modal-upper-left">
                <img src={posterUrl} alt="" />
              </div>
              <div className="modal-upper-right">
                <h2>{name}</h2>
                <p className="desc">{desc}</p>
                <a href="mailto:"> {email}</a>
                <p className="phone">{phone}</p>
              </div>
            </div>

            <div className="modal-lower">
              <div className="lower-cause">
                <h2 className="div-title">Cause for Donation</h2>
                <ul>
                  <li>{cause}</li>
                </ul>
              </div>
              <div className="lower-desc">
                <h2 className="div-title">More Detail</h2>
                <ul>
                  <li>{detail}</li>
                </ul>
              </div>
              <div className="lower-document">
                <h2 className="div-title">Document</h2>
                <ul>
                  <li>
                    {" "}
                    <a
                      href={documentUrl}
                      target="_blank"
                      download="document.txt"
                    >
                      {" "}
                      <AttachmentIcon /> Document file{" "}
                    </a>
                  </li>

                  {/* npm install @mui/icons-material */}
                </ul>
              </div>
              <div className="lower-accept-btn">
                {user.role === "admin" && (
                  <>
                  
                    <div className="lower-btns">
                    <button onClick={handleApprove} className="approve">
                      Approve
                    </button>
                    <button onClick={handleReject} className="reject">Reject</button>
                   </div>
                  </>
                )}

                {user.role === "user" && (
                  <>
                    <div className="lower-btns">
                    <button onClick={handleDonate} className="approve">
                      Donate
                    </button>
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DonateCard;
