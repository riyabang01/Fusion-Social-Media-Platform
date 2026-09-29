
import Avatar from '../Avatar';
import { imageShow, videoShow } from '../../utils/mediaShow';

const MsgDisplay = ({ user, msg, theme, isOwnMessage }) => {
    return (
        <div className={`message_wrapper ${isOwnMessage ? 'own_message' : 'other_message'}`}>
            
            <div className="chat_title">
                <Avatar src={user.avatar} size="small-avatar" />
                <span>{user.username}</span>
            </div>

            {msg.text && (
                <div className="chat_text" style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
                    {msg.text}
                </div>
            )}

            {msg.media && msg.media.map((item, index) => (
                <div key={index} className="chat_media" style={{maxWidth: '380px', maxHeight: '380px'}}>
                    {item.url.match(/video/i) ? videoShow(item.url, theme) : imageShow(item.url, theme)}
                </div>
            ))}

            <div className="chat_time">
                {new Date(msg.createdAt).toLocaleString()}
            </div>
            
        </div>
    );
}

export default MsgDisplay;
