import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import "../styles/index.css";

const SortableItem = SortableElement(({ image, index }) => (
  <div className="image-preview-container">
    <img src={image.preview} alt={`Uploaded ${index}`} className="image-preview" />
  </div>
));

const SortableList = SortableContainer(({ images }) => {
  return (
    <div className="flex-container">
      {images.map((image, index) => (
        <SortableItem key={index} index={index} image={image} />
      ))}
    </div>
  );
});

const ImageReorder = ({ images, setImages }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setImages(arrayMoveImmutable(images, oldIndex, newIndex));
  };

  return <SortableList images={images} onSortEnd={onSortEnd} axis="x" />;
};

export default ImageReorder;


