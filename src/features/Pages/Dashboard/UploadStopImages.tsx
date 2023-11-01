"use client";

import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { OurFileRouter } from "../../../app/api/uploadthing/core";

import Modal, { ModalButton, ModalDisplay } from "../../UI/Modal";
import Button from "../../UI/Button";

type UploadStopImagesProps = {
  images: string[];
  setImages: (images: string[]) => void;
};

function UploadStopImages({ images, setImages }: UploadStopImagesProps) {
  function deleteImage(index: number) {
    const mutableArr = images;
    mutableArr.splice(index, 1);
    setImages(mutableArr);
  }
  return (
    <>
      {images.length === 0 ? (
        <>
          <UploadButton<OurFileRouter>
            className="stop_image"
            endpoint="uploadStopImages"
            onClientUploadComplete={(res) => {
              const images = res?.map((file) => file.url);
              setImages(images!);
              toast.success("Images uploaded!");
            }}
            onUploadError={() => {
              toast.error("Couldn't load files.");
            }}
          />
        </>
      ) : (
        <Modal>
          <ModalButton name="images">
            <div className="justify-self-center">
              <Button type="secondary" className="bg-slate-100">
                See images
              </Button>
            </div>
          </ModalButton>
          <ModalDisplay name="images">
            <div className="grid grid-cols-3 grid-flow-row items-center justify-center">
              {images.map((image, i) => (
                <div key={image} className="relative">
                  <div
                    onClick={() => deleteImage(i)}
                    className="absolute top-7 right-7 rounded-full bg-white p-1 hover:scale-110 cursor-pointer"
                  >
                    <AiFillDelete className="text-red-600" size={20} />
                  </div>
                  <Image
                    key={image}
                    src={image}
                    width={250}
                    height={200}
                    alt="image"
                    className="p-5"
                  />
                </div>
              ))}
            </div>
          </ModalDisplay>
        </Modal>
      )}
    </>
  );
}

export default UploadStopImages;
