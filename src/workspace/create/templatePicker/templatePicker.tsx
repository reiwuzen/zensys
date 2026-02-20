import "./templatePicker.scss";
import type { PageTemplate } from "@/types/template";
import { PAGES_TEMPLATES } from "@/constants/templates";

type TemplatePickerProps = {
  onSelectTemplate: (template: PageTemplate) => void;
};

const TemplatePicker = ({ onSelectTemplate }: TemplatePickerProps) => {
  return (
    <div className="templatePicker">
      <header className="templatePicker-header">
        <h1>Create a Page</h1>
        <p>
          Choose how you want to begin. Select a template to initialize a new
          data structure in the current branch.
        </p>
      </header>

      <div className="templatePicker-wrapper">
        {PAGES_TEMPLATES.map((template) => (
          <button
            key={template.id}
            className="template-card"
            onClick={() => onSelectTemplate(template)}
          >
            <h3>{template.label}</h3>
            <p>{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplatePicker;
