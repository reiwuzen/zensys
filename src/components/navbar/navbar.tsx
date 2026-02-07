import "./navbar.scss";
import { useActiveTab } from "@/hooks/useActiveTab";
const Navbar = () => {
  const { setActiveTabType, activeTab, setActiveTabTypeAndView } = useActiveTab();
  return (
    <nav id="navbar" className="navbar">
      <ul>
        <li 
        className={activeTab?.type === "overview" ? "active" : ""}
        onClick={() => setActiveTabType("overview")}>
          <div>

          <svg xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 50 50" width="50" height="50"> <g fill="#00a9b4"> <rect x="5" y="5" width="18" height="20" rx="3" ry="3"/> <rect x="25" y="5" width="20" height="12" rx="3" ry="3"/> <rect x="5" y="27" width="18" height="12" rx="3" ry="3"/> <rect x="25" y="19" width="20" height="20" rx="3" ry="3"/> </g>
          </svg>
          </div>
          <h6>Overview</h6>
        </li>
        <li 
        className={activeTab?.type === "memory_space" ? "active" : ""}
        onClick={() => setActiveTabTypeAndView("memory_space",'list')}>
          <div>

          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Background --> */}
            <rect x="4" y="4" width="56" height="56" rx="16" fill="#E6FDFF" />

            {/* <!-- Space cards --> */}
            <rect x="14" y="16" width="16" height="16" rx="8" fill="#0FB9C6" />
            <rect x="34" y="16" width="16" height="16" rx="8" fill="#7EE6ED" />

            <rect x="14" y="36" width="16" height="16" rx="8" fill="#7EE6ED" />
            <rect x="34" y="36" width="16" height="16" rx="8" fill="#BFF6FA" />

            {/* <!-- Connection dots --> */}
            <circle cx="32" cy="32" r="2" fill="#0FB9C6" />
          </svg>
          </div>
          <h6>Memory Spaces</h6>
        </li>
        <li 
        className={activeTab?.type === "create" ? "active" : ""}
        onClick={() => setActiveTabType("create")}>
        <div>

          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Background --> */}
            <rect x="4" y="4" width="56" height="56" rx="16" fill="#ffffff" />

            {/* <!-- Plus vertical --> */}
            <rect x="30" y="18" width="4" height="28" rx="2" fill="#0FB9C6" />

            {/* <!-- Plus horizontal --> */}
            <rect x="18" y="30" width="28" height="4" rx="2" fill="#0FB9C6" />    
          </svg>
          </div>
          <h6>Create</h6>
        </li>
        <li
        className={activeTab?.type === "structure" ? "active" : ""}
         onClick={() => setActiveTabType("structure")}>
          <div>

          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Background --> */}
            <rect x="4" y="4" width="56" height="56" rx="16" fill="#E6FDFF" />

            {/* <!-- Top node --> */}
            <rect x="26" y="14" width="12" height="12" rx="6" fill="#0FB9C6" />

            {/* <!-- Connector --> */}
            <rect x="31" y="26" width="2" height="8" rx="1" fill="#7EE6ED" />

            {/* <!-- Bottom nodes --> */}
            <rect x="18" y="36" width="12" height="12" rx="6" fill="#7EE6ED" />
            <rect x="34" y="36" width="12" height="12" rx="6" fill="#BFF6FA" />
          </svg>
          </div>
          <h6>Structure</h6>
        </li>
        <li 
        className={activeTab?.type === "settings" ? "active" : ""}
         onClick={() => setActiveTabType("settings")}>
         <div>
        <svg xmlns="http://www.w3.org/2000/svg"
           height="24"
           width="24"
           viewBox="0 0 24 24"
           focusable="false"
           aria-hidden="true">
      <path fill="rgb(0, 169, 180)"
        d="M12.844 1h-1.687a2 2 0 00-1.962 1.616 3 3 0 01-3.92 2.263 2 2 0 00-2.38.891l-.842 1.46a2 2 0 00.417 2.507 3 3 0 010 4.525 2 2 0 00-.417 2.507l.843 1.46a2 2 0 002.38.892 3.001 3.001 0 013.918 2.263A2 2 0 0011.157 23h1.686a2 2 0 001.963-1.615 3.002 3.002 0 013.92-2.263 2 2 0 002.38-.892l.842-1.46a2 2 0 00-.418-2.507 3 3 0 010-4.526 2 2 0 00.418-2.508l-.843-1.46a2 2 0 00-2.38-.891 3 3 0 01-3.919-2.263A2 2 0 0012.844 1Zm-1.767 2.347a6 6 0 00.08-.347h1.687a4.98 4.98 0 002.407 3.37 4.98 4.98 0 004.122.4l.843 1.46A4.98 4.98 0 0018.5 12a4.98 4.98 0 001.716 3.77l-.843 1.46a4.98 4.98 0 00-4.123.4A4.979 4.979 0 0012.843 21h-1.686a4.98 4.98 0 00-2.408-3.371 4.999 4.999 0 00-4.12-.399l-.844-1.46A4.979 4.979 0 005.5 12a4.98 4.98 0 00-1.715-3.77l.842-1.459a4.98 4.98 0 004.123-.399 4.981 4.981 0 002.327-3.025ZM16 12a4 4 0 11-7.999 0 4 4 0 018 0Zm-4 2a2 2 0 100-4 2 2 0 000 4Z"/>
        </svg>
              </div>
          <h6>Settings</h6>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
