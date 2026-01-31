import { selectedMemoryType } from '@/memory/schema'
// import Editor from '@/components/editor/editor'
import './memory_space_item.scss'
import { useState } from 'react'

type MemorySpaceItemProps = {
    memory: selectedMemoryType
}

const MemorySpaceItem = ({ memory }: MemorySpaceItemProps) => {

const [editable, setEditable] = useState(false);
  const { active_node: activeNode,  } = memory;
  return (
    <article className="memory-node">

      <header className="memory-node__header">
        <h1 className="memory-node__title">
          {activeNode.title}
        </h1>

        <time className="memory-node__timestamp">
          {new Date(activeNode.created_at).toLocaleString()}
        </time>
      </header>

      <section className="memory-node__content" 
      onClick={()=>setEditable(true)}>
        {/* <Editor content={activeNode.content} editable={editable}></Editor> */}
        {activeNode.content}
      </section>

    </article>
  )
}

export default MemorySpaceItem
