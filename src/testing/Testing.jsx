import React from "react";
import Swal from "sweetalert2";
const Testing = () => {
  const handleButton = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully",
    });
  };
  return <div>Testing
  <button onClick={handleButton}>kok</button>
  </div>;
};

export default Testing;
