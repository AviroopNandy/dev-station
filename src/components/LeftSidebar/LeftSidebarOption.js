import React from "react";

import "./LeftSidebarOption.style.css";

function LeftSidebarOption({ title, Icon, active }) {
    return(
        <div className={ `leftSidebarOption ${ active && "leftSidebarOption--active"}` }>
            { Icon && <Icon /> }
            <h2>{ title }</h2>
        </div>
    );
}

export default LeftSidebarOption;