import { Tag } from "@/types/tag";

type StructureDetailsProps = {
    tag: Tag;
}



const StructureDetails = ({tag}: StructureDetailsProps) => {
    return (
        <div className="structure_details">
        <h3>Structure Details</h3>
        <p>Tag Label: {tag.label}</p>
        <p>Tag Description: {tag.description}</p>
        <p>Tag Priority: {tag.priority}</p>
        </div>
    )
}
export default StructureDetails;