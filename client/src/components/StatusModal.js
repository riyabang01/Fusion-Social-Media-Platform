import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
import { imageShow, videoShow } from "../utils/mediaShow";

const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) {
        return (err = "File does not exist.");
      }
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Image size must be less than 5 mb.");
      }
      return newImages.push(file);
    });
    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    if (tracks) tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0 && !content.trim()) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add some text content or image(s)." },
      });
    }

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent("");
    setImages([]);
    if (tracks) {
      tracks.stop();
    }
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  return (
    <div className="status_modal" style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)" }}>
      <form onSubmit={handleSubmit} className="border-0 shadow-lg bg-white rounded-4 overflow-hidden">
        <div className="status_header d-flex justify-content-between align-items-center px-4 py-3 border-bottom border-light-subtle bg-white">
          <h5 className="m-0 fw-bold text-dark fs-5">{status.onEdit ? "Update Post" : "Create Post"}</h5>
          <span
            className="fs-4 text-secondary cursor-pointer close_modal_btn"
            style={{ cursor: "pointer", userSelect: "none", lineHeight: "1" }}
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>
        
        <div className="status_body p-4 bg-white">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name="content"
            placeholder={`${auth?.user?.username || 'Creator'}, what's on your mind today?`}
            className="form-control border-0 px-0 fs-6 text-dark"
            style={{
              filter: theme ? "invert(1)" : "invert(0)",
              color: theme ? "white" : "#1e293b",
              background: "transparent",
              resize: "none",
              minHeight: "140px",
              outline: "none",
              boxShadow: "none"
            }}
          />

          <div className="d-flex justify-content-between align-items-center mb-3">
            <small className="text-muted small fw-medium">{content.length} characters</small>
            <Icons setContent={setContent} content={content} theme={theme} />
          </div>

          <div className="show_images d-flex flex-wrap gap-2 my-2 overflow-x-auto py-1">
            {images.map((img, index) => (
              <div key={index} className="file_img position-relative border border-light-subtle rounded-3 overflow-hidden shadow-sm bg-light" style={{ width: "90px", height: "90px" }}>
                {img.camera ? (
                  imageShow(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShow(img.url)
                      : imageShow(img.url)}
                  </>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img, theme))
                      : imageShow(URL.createObjectURL(img, theme))}
                  </>
                )}
                <span 
                  onClick={() => deleteImages(index)}
                  className="position-absolute top-1 end-1 bg-dark bg-opacity-70 text-white rounded-circle d-flex align-items-center justify-content-center cursor-pointer shadow-sm fw-bold"
                  style={{ width: "18px", height: "18px", fontSize: "0.75rem", right: "4px", top: "4px", cursor: "pointer" }}
                >
                  &times;
                </span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative border border-light-subtle rounded-4 overflow-hidden mb-3 bg-dark ratio ratio-16x9">
              <video
                ref={videoRef}
                style={{ filter: theme ? "invert(1)" : "invert(0)", objectFit: "cover" }}
                autoPlay
                muted
                className="w-100 h-100"
              />
              <span 
                onClick={handleStopStream}
                className="position-absolute bg-danger text-white rounded-circle d-flex align-items-center justify-content-center cursor-pointer shadow-lg"
                style={{ width: "28px", height: "28px", right: "12px", top: "12px", cursor: "pointer", fontSize: "1.2rem", fontWeight: "300" }}
              >
                &times;
              </span>
              <canvas style={{ display: "none" }} ref={refCanvas} />
            </div>
          )}

          <div className="input_images border-top border-light-subtle pt-3 mt-2 d-flex justify-content-start gap-3">
            {stream ? (
              <button 
                type="button" 
                className="btn btn-sm btn-outline-dark d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-medium"
                onClick={handleCapture}
              >
                <i className="fas fa-camera text-primary" /> Capture Media
              </button>
            ) : (
              <>
                <button 
                  type="button" 
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-medium text-secondary"
                  onClick={handleStream}
                >
                  <i className="fas fa-video text-danger" /> Use Webcam
                </button>
                
                <div className="file_upload position-relative btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-medium text-secondary overflow-hidden">
                  <i className="fas fa-image text-success" /> Attach Media
                  <input
                    onChange={handleChangeImages}
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                    style={{ position: "absolute", left: 0, top: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="status_footer p-4 border-top border-light-subtle bg-light-subtle d-flex justify-content-end">
          <button type="submit" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm text-uppercase tracking-wider fs-7" style={{ minWidth: "120px" }}>
            {status.onEdit ? "Update content" : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
