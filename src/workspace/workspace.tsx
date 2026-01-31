import { useTabStore } from '@/store/useTabStore';
import './workspace.scss'
import Editor from '@/editor/editor';
import { TAB_COMPONENTS } from '@/types/tab';
const Workspace =()=> {
     const {activeTabId,tabs} = useTabStore();
    let activeTab =  tabs.find(tab => tab.id === activeTabId);
    const ActiveTabComponent = activeTab ? TAB_COMPONENTS[activeTab.type] : null;
    return (
        <div className="workspace">    
            {/* {ActiveTabComponent && <ActiveTabComponent />} */}
            <Editor />
        </div>
    )
}
export default Workspace;