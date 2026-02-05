import React from "react";

interface ProductAttributesProps {
  attributes: {
    key: string;
    value: string;
  }[];
}

export default function ProductAttirubutes({
  attributes,
}: ProductAttributesProps) {
  if (!attributes || attributes.length === 0) {
    return null;
  }
  return (
    <div className="space-y-2">
      <h4 className="text-2xl font-bold text-gray-600 ">Attributes</h4>
      <ul className="flex flex-col gap-2">
        {attributes.map((attribute, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm list-disc list-inside"
          >
            <span className="font-medium text-gray-800">{attribute.key}:</span>
            <span className="text-gray-600">{attribute.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
