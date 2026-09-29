import React from 'react';
import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  PinterestShareButton, PinterestIcon,
  RedditShareButton, RedditIcon,
  TelegramShareButton, TelegramIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon
} from "react-share";

const ShareModal = ({ url, theme, setIsShare }) => {
  return (
    <div className="share_modal d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100" style={{ background: "rgba(0,0,0,0.4)", zIndex: 99999 }}>
      <div className="share_modal-container bg-white rounded-4 shadow border border-light-subtle p-4" style={{ width: "100%", maxWidth: "420px" }}>
        <div className="share_modal-header d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <span className="fw-bold text-dark fs-5">Share Content</span>
          <span 
            className="fs-4 text-secondary cursor-pointer" 
            onClick={() => setIsShare(false)}
            style={{ cursor: "pointer", lineHeight: "1" }}
          >
            &times;
          </span>
        </div>
        
        <div
          className="share_modal-body d-flex flex-wrap gap-3 justify-content-center py-2"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        >
          <FacebookShareButton url={url}>
            <FacebookIcon round={true} size={42} />
          </FacebookShareButton>

          <TwitterShareButton url={url}>
            <TwitterIcon round={true} size={42} />
          </TwitterShareButton>

          <EmailShareButton url={url}>
            <EmailIcon round={true} size={42} />
          </EmailShareButton>

          <TelegramShareButton url={url}>
            <TelegramIcon round={true} size={42} />
          </TelegramShareButton>

          <WhatsappShareButton url={url}>
            <WhatsappIcon round={true} size={42} />
          </WhatsappShareButton>

          <PinterestShareButton url={url}>
            <PinterestIcon round={true} size={42} />
          </PinterestShareButton>

          <RedditShareButton url={url}>
            <RedditIcon round={true} size={42} />
          </RedditShareButton>

          <LinkedinShareButton url={url}>
            <LinkedinIcon round={true} size={42} />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
