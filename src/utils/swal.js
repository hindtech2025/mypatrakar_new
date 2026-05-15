import Swal from "sweetalert2";

const baseSwal = Swal.mixin({
  background: "#ffffff",
  color: "#1e293b",
  confirmButtonColor: "#e81303",
  confirmButtonText: "OK 👍",
  buttonsStyling: true,
  customClass: {
    popup: "rounded-2xl shadow-2xl",
    title: "text-xl font-bold",
    htmlContainer: "text-sm text-slate-600",
    confirmButton:
      "px-6 py-2 rounded-lg text-white font-semibold tracking-wide",
  },
});

export const showError = (title, text) => {
  baseSwal.fire({
    icon: "error",
    title,
    text,
    iconColor: "#ef4444",
  });
};

export const showSuccess = (title, text) => {
  baseSwal.fire({
    icon: "success",
    title,
    text,
    iconColor: "#22c55e",
  });
};

export const showWarning = (title, text) => {
  baseSwal.fire({
    icon: "warning",
    title,
    text,
    iconColor: "#f59e0b",
  });
};
