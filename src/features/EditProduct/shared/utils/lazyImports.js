import { lazy } from "react";

const Modal = lazy(() => import("../../../../shared/components/Modal/Modal"));
const ProgressBar = lazy(() =>
  import("../../../../shared/components/ProgressBar/ProgressBar")
);
const Spinner = lazy(() =>
  import("../../../../shared/components/Spinner/Spinner")
);
const Preview = lazy(() =>
  import("../../../../shared/components/Preview/Preview")
);

export { Modal, ProgressBar, Spinner, Preview };
