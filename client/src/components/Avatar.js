
import { useSelector } from "react-redux";

const Avatar = ({src, size}) => {
    const theme = useSelector((state) => state.theme);

    return (
        <img
          src={src}
          alt="Avatar"
          className={`${size} rounded-circle img-fluid`}
          style={{ 
            filter: `${theme ? "invert(1)" : "invert(0)"}`,
            objectFit: "cover"
          }}
        />
    );
}

export default Avatar;
