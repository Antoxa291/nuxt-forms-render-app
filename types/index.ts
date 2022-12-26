export interface Field {
  type: "divider" | "number" | "input" | "checkbox";
  id: string;
  name: string;
  default: any;
  required: boolean;
  value: any;
}

export type DragStartEvent = MouseEvent & {
  dataTransfer: DataTransfer;
  target: Element & {
    dataset: DOMStringMap;
  };
};


export type DropEvent = MouseEvent & {
  dataTransfer: DataTransfer;
  target: Element;
};
