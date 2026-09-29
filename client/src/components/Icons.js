
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const Icons = ({ setContent, content, theme }) => {
  return (
    <div
      className="nav-item dropdown"
      style={{
        opacity: "1",
        zIndex: "1000",
        filter: theme ? "invert(1)" : "invert(0)",
      }}
    >
      <button
        className="btn btn-link p-1 text-decoration-none d-flex align-items-center justify-content-center transition-all hover-scale border-0"
        id="navbarDropdown"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ fontSize: "1.2rem", lineHeight: "1", outline: "none", boxShadow: "none" }}
      >
        <span>😀</span>
      </button>
      
      <div 
        className="dropdown-menu dropdown-menu-end p-0 border-0 shadow-lg rounded-4 overflow-hidden mt-2" 
        aria-labelledby="navbarDropdown"
        style={{ transform: "translate3d(0px, 4px, 0px)" }}
      >
        <Picker
          theme={theme ? "dark" : "light"}
          showSkinTones={true}
          showPreview={false}
          onSelect={(emoji) => setContent(content + emoji.native)}
          i18n={{
            search: "Search",
            clear: "Clear",
            notfound: "No Emoji Found",
            skintext: "Choose your default skin tone",
            categories: {
              search: "Search Results",
              recent: "Frequently Used",
              smileys: "Smileys & Emotion",
              people: "People & Body",
              nature: "Animals & Nature",
              foods: "Food & Drink",
              activity: "Activity",
              places: "Travel & Places",
              objects: "Objects",
              symbols: "Symbols",
              flags: "Flags",
              custom: "Custom",
            },
            categorieslabel: "Emoji categories",
            skintones: {
              1: "Default Skin Tone",
              2: "Light Skin Tone",
              3: "Medium-Light Skin Tone",
              4: "Medium Skin Tone",
              5: "Medium-Dark Skin Tone",
              6: "Dark Skin Tone",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Icons;
