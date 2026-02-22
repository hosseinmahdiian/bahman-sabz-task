import React, { useEffect } from "react";

type BgModalProps = {
  modal: boolean;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  FN?: () => void;
  z?: string;
  style?: string;
};

const BgModal: React.FC<BgModalProps> = ({
  modal,
  setModal = () => {},
  z = "z-30",
  FN = () => {},
  style = "",
}) => {
  useEffect(() => {
    setTimeout(() => {
      if (modal) document.documentElement.classList.add("!overflow-y-hidden");
    }, 100);
    return () => {
      document.documentElement.classList.remove("!overflow-y-hidden");
    };
  }, [modal]);

  return (
    modal && (
      <div
        onClick={() => {
          setModal(false);
          FN();
        }}
        className={`fixed -top-0 right-0 left-0 h-full w-full bg-black opacity-30 ${z} ${style} `}
      />
    )
  );
};
export default BgModal;
