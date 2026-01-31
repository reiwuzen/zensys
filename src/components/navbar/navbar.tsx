import "./navbar.scss";
import { useActiveTab } from "@/hooks/useActiveTab";
const Navbar = () => {
  const { switchActiveTab, activeTab } = useActiveTab();
  return (
    <nav id="navbar" className="navbar">
      <ul>
        <li 
        className={activeTab?.type === "overview" ? "active" : ""}
        onClick={() => switchActiveTab("overview")}>
          <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#00A9B0"/>
  
  <rect x="128" y="128" width="256" height="256" rx="65" ry="65" fill="#FFFFFF"/>
  
  <g stroke="#00A9B0" stroke-width="14" fill="none" stroke-linecap="square" stroke-linejoin="miter">
    <rect x="194" y="194" width="52" height="70" />
    
    <rect x="194" y="278" width="52" height="40" />
    
    <rect x="260" y="194" width="52" height="40" />
    
    <rect x="260" y="248" width="52" height="70" />
  </g>
</svg>
          <h6>Overview</h6>
        </li>
        <li 
        className={activeTab?.type === "memory_space" ? "active" : ""}
        onClick={() => switchActiveTab("memory_space")}>
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
          <h6>Memory Spaces</h6>
        </li>
        <li 
        className={activeTab?.type === "create" ? "active" : ""}
        onClick={() => switchActiveTab("create")}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Background --> */}
            <rect x="4" y="4" width="56" height="56" rx="16" fill="#E6FDFF" />

            {/* <!-- Plus vertical --> */}
            <rect x="30" y="18" width="4" height="28" rx="2" fill="#0FB9C6" />

            {/* <!-- Plus horizontal --> */}
            <rect x="18" y="30" width="28" height="4" rx="2" fill="#0FB9C6" />
          </svg>
          <h6>Create</h6>
        </li>
        <li
        className={activeTab?.type === "structure" ? "active" : ""}
         onClick={() => switchActiveTab("structure")}>
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
          <h6>Structure</h6>
        </li>
        <li 
        className={activeTab?.type === "settings" ? "active" : ""}
         onClick={() => switchActiveTab("settings")}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Background --> */}
            <rect x="4" y="4" width="56" height="56" rx="16" fill="#E6FDFF" />

            {/* <!-- Gear outer --> */}
            <circle cx="32" cy="32" r="14" fill="#0FB9C6" />

            {/* <!-- Gear center --> */}
            <circle cx="32" cy="32" r="6" fill="#E6FDFF" />

            {/* <!-- Gear teeth --> */}
            <rect x="30" y="10" width="4" height="8" rx="2" fill="#0FB9C6" />
            <rect x="30" y="46" width="4" height="8" rx="2" fill="#0FB9C6" />

            <rect x="10" y="30" width="8" height="4" rx="2" fill="#0FB9C6" />
            <rect x="46" y="30" width="8" height="4" rx="2" fill="#0FB9C6" />

            <rect
              x="30"
              y="10"
              width="4"
              height="8"
              rx="2"
              transform="rotate(45 32 32)"
              fill="#0FB9C6"
            />
            <rect
              x="30"
              y="46"
              width="4"
              height="8"
              rx="2"
              transform="rotate(45 32 32)"
              fill="#0FB9C6"
            />
          </svg>
          <h6>Settings</h6>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
